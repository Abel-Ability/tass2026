/**
 * TASS Nigeria 2026 – Certificate issuing web app
 * Deploy: Execute as ME, Who has access: ANYONE (anonymous) – required so the
 * iframe modal and the QR-code verification page work without a Google login.
 *
 * Files: Code.gs · Certificate.html · Verify.html · appsscript.json
 */

/* ───────────────────────────── CONFIG ───────────────────────────── */
const CONFIG = {
  ROSTER_SPREADSHEET_ID: '1AqypBH8gehtbv6MdtSunGsxKwX-b2T5gUXfLuxZnOdk',
  ROSTER_SHEET_NAME: '',                 // '' = first tab of the spreadsheet
  LOG_SHEET_NAME: 'Issued Certificates', // created automatically
  CERT_FOLDER_ID: '198VzaA4idKrOazZlf_ndGR3b94Marmzq',

  TEMPLATE_SLIDES_ID: '1CLqHNQz9as4Ugj3Nr49j-Gi-QYrPD_7ydydItEfCoXs',

  VERIFY_BASE_URL: '',                   // '' = this web app's own URL (ScriptApp.getService().getUrl())
  SUPPORT_CONTACT: 'Dr. Agnes Bassey on +234 805 281 0967', // shown when a paper title is missing
  CERT_NO_PREFIX: 'TASS-2026-',
  TIMEZONE: 'Africa/Lagos',

  COOLDOWN_SECONDS: 60,
  MAX_REQUESTS_PER_DAY: 5,
  MAX_FAILED_PER_HOUR: 8,                // wrong ID/surname attempts per registration ID
  PENDING_STALE_MS: 3 * 60 * 1000        // a half-finished issuance older than this may be redone
};

const CERT_TYPES = {
  participation: { label: 'Certificate of Participation',                          needsPaper: false },
  presentation:  { label: 'Certificate of Participation and Paper Presentation',   needsPaper: true  }
};

const LOG_HEADERS = ['First Issued At', 'Last Access At', 'Access Date', 'Access Count',
  'Registration ID', 'Full Names', 'Author (main/co)', 'Paper Title',
  'Certificate Number', 'File ID', 'File Name', 'Certificate Type'];
const COL = { FIRST: 0, LAST: 1, DATE: 2, COUNT: 3, REG: 4, NAME: 5, AUTHOR: 6, PAPER: 7,
  CERTNO: 8, FILEID: 9, FILENAME: 10, TYPE: 11 };

const TITLES = ['mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'professor', 'engr', 'engineer', 'chief',
  'hon', 'sir', 'rev', 'pastor', 'alhaji', 'alhaja', 'hajia', 'barr', 'arc', 'pharm', 'dame', 'elder', 'mallam',
  'assoc', 'asst', 'senator', 'sen', 'amb', 'ambassador', 'justice', 'capt', 'col', 'gen', 'rtd'];

/* ───────────────────────────── ROUTING ───────────────────────────── */
function doGet(e) {
  const p = (e && e.parameter) || {};
  let out;
  if (p.verify) {
    const t = HtmlService.createTemplateFromFile('Verify');
    t.data = buildVerificationData_(p.verify);
    out = t.evaluate();
  } else {
    out = HtmlService.createHtmlOutputFromFile('Certificate');
  }
  return out
    .setTitle('TASS Nigeria 2026 – Certificate')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // lets the modal iframe embed it
}

/* ───────────────────── PUBLIC (called from the page) ───────────────────── */
function claimCertificate(regId, surname, typeKey) {
  try {
    return claim_(regId, surname, typeKey);
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return fail_('Something went wrong on our side. Please try again in a minute or contact the organisers.');
  }
}

function claim_(regId, surname, typeKey) {
  regId = String(regId || '').trim();
  surname = String(surname || '').trim();
  const regKey = normReg_(regId);
  if (!regKey || regKey.length > 40 || surname.length < 2 || surname.length > 80 || !CERT_TYPES[typeKey]) {
    return fail_('Please complete all three fields correctly.');
  }

  // 1. Throttle wrong guesses (stops walking through registration IDs)
  const cache = CacheService.getScriptCache();
  const failKey = 'fail_' + regKey;
  const fails = Number(cache.get(failKey) || 0);
  if (fails >= CONFIG.MAX_FAILED_PER_HOUR) {
    return fail_('Too many unsuccessful attempts for this registration number. Please try again in an hour or contact the organisers.');
  }

  // 2. Roster lookup – registration ID AND surname must match (same message for either failure)
  const entry = findRosterEntry_(regKey, surname);
  if (!entry) {
    cache.put(failKey, String(fails + 1), 3600);
    return fail_('We could not match that registration number and surname. Please check both and try again.');
  }
  cache.remove(failKey);

  const type = CERT_TYPES[typeKey];
  if (type.needsPaper && !entry.paperTitle) {
    return fail_('Our records show no paper title under this registration number, so the ' + type.label +
      ' cannot be issued yet. If you presented a paper, please contact ' + CONFIG.SUPPORT_CONTACT +
      ' so your record can be updated. Otherwise, choose Participation.');
  }

  // 3. Decide inside the lock: reuse the existing PDF, or claim the right to create one
  let plan;
  withLock_(function () { plan = issueOrReuse_(entry, typeKey); });
  if (plan.status === 'blocked') return fail_(plan.message);

  if (plan.status === 'reuse') {
    return success_(DriveApp.getFileById(plan.fileId), plan, entry, true);
  }

  // 4. Generate outside the lock (slow part), then record the result
  let file;
  try {
    file = generateCertificate_(entry, plan.typeKey, plan.certNo);
  } catch (err) {
    withLock_(function () { abandonClaim_(plan); });
    throw err;
  }
  withLock_(function () { finalizeClaim_(plan, file); });
  return success_(file, plan, entry, false);
}

/* ───────────────────── ISSUANCE: generate once, reuse forever ───────────────────── */
// Runs inside the script lock. Returns {status:'blocked'|'reuse'|'generate', ...}
function issueOrReuse_(entry, typeKey) {
  const now = new Date();
  const today = Utilities.formatDate(now, CONFIG.TIMEZONE, 'yyyy-MM-dd');
  const requestedLabel = CERT_TYPES[typeKey].label;
  const sh = getLogSheet_();
  const lastRow = sh.getLastRow();
  const data = lastRow > 1 ? sh.getRange(2, 1, lastRow - 1, LOG_HEADERS.length).getValues() : [];

  const used = {};
  let idx = -1;
  data.forEach(function (r, i) {
    used[String(r[COL.CERTNO])] = true;
    if (idx < 0 && normReg_(r[COL.REG]) === entry.regKey) idx = i;
  });

  // ── First request ever for this registration: claim a certificate number
  if (idx < 0) {
    const certNo = newCertNo_(used, entry.regId);
    const r = sh.getLastRow() + 1;
    sh.getRange(r, COL.REG + 1).setNumberFormat('@');
    sh.getRange(r, COL.DATE + 1).setNumberFormat('@');
    sh.getRange(r, 1, 1, LOG_HEADERS.length).setValues([[
      now, now, today, 1, entry.regId, entry.name, entry.authorRaw, entry.paperTitle,
      certNo, 'PENDING', '', requestedLabel]]);
    return { status: 'generate', certNo: certNo, created: true, typeKey: typeKey, typeLabel: requestedLabel };
  }

  const row = data[idx];
  const sheetRow = idx + 2;
  const certNo = String(row[COL.CERTNO]);
  const lastAccess = row[COL.LAST] instanceof Date ? row[COL.LAST] : new Date(row[COL.LAST]);
  const msSince = now - lastAccess;
  const fileId = String(row[COL.FILEID] || '').trim();

  // ── Another request is mid-issuance (or a previous one crashed)
  if (fileId === 'PENDING' || fileId === '') {
    if (msSince < CONFIG.PENDING_STALE_MS) {
      return { status: 'blocked', message: 'Your certificate is still being prepared. Please wait a moment and try again.' };
    }
    sh.getRange(sheetRow, 2, 1, 1).setValue(now);
    sh.getRange(sheetRow, COL.TYPE + 1).setValue(requestedLabel);
    return { status: 'generate', certNo: certNo, created: false, typeKey: typeKey, typeLabel: requestedLabel };
  }

  // ── Already issued: cooldown + daily limit, then return the SAME PDF
  const secondsSince = msSince / 1000;
  if (secondsSince < CONFIG.COOLDOWN_SECONDS) {
    return { status: 'blocked', message: 'Please wait ' + Math.ceil(CONFIG.COOLDOWN_SECONDS - secondsSince) +
      ' seconds before requesting your certificate again.' };
  }
  const count = toDateStr_(row[COL.DATE]) === today ? (Number(row[COL.COUNT]) || 0) : 0;
  if (count >= CONFIG.MAX_REQUESTS_PER_DAY) {
    return { status: 'blocked', message: 'You have reached the daily limit for this registration number. Please try again tomorrow.' };
  }
  sh.getRange(sheetRow, 2, 1, 3).setValues([[now, today, count + 1]]);

  const issuedLabel = String(row[COL.TYPE] || requestedLabel);
  let file = null;
  try { file = DriveApp.getFileById(fileId); if (file.isTrashed()) file = null; } catch (e) { file = null; }

  if (!file) { // PDF was deleted from Drive: rebuild it under the SAME certificate number
    return { status: 'generate', certNo: certNo, created: false,
      typeKey: typeKeyFromLabel_(issuedLabel) || typeKey, typeLabel: issuedLabel };
  }
  return {
    status: 'reuse', fileId: fileId, certNo: certNo, typeLabel: issuedLabel,
    notice: issuedLabel !== requestedLabel
      ? 'A ' + issuedLabel + ' was already issued for this registration number, so that is the certificate shown here.'
      : ''
  };
}

function finalizeClaim_(plan, file) {
  const sh = getLogSheet_();
  const r = findRowByCertNo_(sh, plan.certNo);
  if (r < 0) throw new Error('Log row for ' + plan.certNo + ' not found');
  sh.getRange(r, COL.FILEID + 1, 1, 2).setValues([[file.getId(), file.getName()]]);
}

function abandonClaim_(plan) {
  if (!plan.created) return;
  const sh = getLogSheet_();
  const r = findRowByCertNo_(sh, plan.certNo);
  if (r > 0 && String(sh.getRange(r, COL.FILEID + 1).getValue()) === 'PENDING') sh.deleteRow(r);
}

/* ───────────────────────────── PDF GENERATION ───────────────────────────── */
function generateCertificate_(entry, typeKey, certNo) {
  const type = CERT_TYPES[typeKey];
  const now = new Date();
  const folder = DriveApp.getFolderById(CONFIG.CERT_FOLDER_ID);
  const baseName = 'TASS2026_' + safe_(entry.regId) + '_' + safe_(entry.name);
  const tmp = DriveApp.getFileById(CONFIG.TEMPLATE_SLIDES_ID).makeCopy('tmp_' + baseName, folder);

  try {
    const pres = SlidesApp.openById(tmp.getId());
    let slides = pres.getSlides();
    for (let i = slides.length - 1; i > 0; i--) slides[i].remove(); // keep first slide only
    const slide = pres.getSlides()[0];

    // Text placeholders (legacy {{NAME}} / {{DATE}} supported as well)
    const tags = {
      CERT_TYPE: type.label,
      FULL_NAME: entry.name,
      NAME: entry.name,
      ROLE: roleFor_(entry, typeKey),
      PAPER_TITLE: typeKey === 'presentation' ? 'Title of Paper: \u201C' + entry.paperTitle + '\u201D' : '',
      CERT_NO: certNo,
      DATE: Utilities.formatDate(now, CONFIG.TIMEZONE, 'd MMMM yyyy')
    };
    Object.keys(tags).forEach(function (k) { slide.replaceAllText('{{' + k + '}}', tags[k]); });

    // Image placeholders
    const qr = fetchQr_(verifyUrl_(certNo));
    if (fillImagePlaceholders_(slide, ['{{QR_CODE}}', '{{QR}}'], qr) === 0) {
      const size = 90; // fallback: bottom-right corner
      slide.insertImage(qr, pres.getPageWidth() - size - 24, pres.getPageHeight() - size - 24, size, size);
    }

    pres.saveAndClose();

    const pdf = tmp.getAs(MimeType.PDF).setName(baseName + '_' + certNo + '.pdf');
    const file = folder.createFile(pdf);
    file.setDescription(certNo + ' · ' + type.label);
    return file;
  } finally {
    tmp.setTrashed(true);
  }
}

// Replace every shape (or image with matching alt text) that carries one of the tags with the blob
function fillImagePlaceholders_(slide, tagList, blob) {
  let n = 0;
  slide.getShapes().forEach(function (sh) {
    let t = '';
    try { t = sh.getText().asString().trim(); } catch (e) { /* shape without text */ }
    if (tagList.indexOf(t) > -1) { sh.replaceWithImage(blob); n++; }
  });
  slide.getImages().forEach(function (img) { // image whose alt text/title is the tag
    const d = (img.getDescription() || '').trim(), ti = (img.getTitle() || '').trim();
    if (tagList.indexOf(d) > -1 || tagList.indexOf(ti) > -1) { img.replace(blob); n++; }
  });
  return n;
}

function fetchQr_(text) {
  const url = 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&ecc=M&format=png&data=' + encodeURIComponent(text);
  let lastErr;
  for (let i = 0; i < 2; i++) {
    try {
      const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
      if (res.getResponseCode() === 200) return res.getBlob().setName('qr.png');
      lastErr = 'HTTP ' + res.getResponseCode();
    } catch (e) { lastErr = e; }
    Utilities.sleep(800);
  }
  throw new Error('QR generation failed: ' + lastErr);
}

function verifyUrl_(certNo) {
  const base = CONFIG.VERIFY_BASE_URL || ScriptApp.getService().getUrl();
  return base + (base.indexOf('?') > -1 ? '&' : '?') + 'verify=' + encodeURIComponent(certNo);
}

function roleFor_(entry, typeKey) {
  if (typeKey === 'presentation') {
    return entry.author === 'main' ? 'the Main Author' : entry.author === 'co' ? 'a Co-Author' : 'an Author';
  }
  return 'a Delegate';
}

/* ───────────────────────────── ROSTER ───────────────────────────── */
function getRosterSheet_() {
  const ss = SpreadsheetApp.openById(CONFIG.ROSTER_SPREADSHEET_ID);
  if (CONFIG.ROSTER_SHEET_NAME) {
    const named = ss.getSheetByName(CONFIG.ROSTER_SHEET_NAME);
    if (!named) throw new Error('Roster tab "' + CONFIG.ROSTER_SHEET_NAME + '" not found');
    return named;
  }
  const cache = CacheService.getScriptCache();
  const cached = cache.get('roster_tab');
  if (cached) { const c = ss.getSheetByName(cached); if (c) return c; }
  const seen = [];
  const sheets = ss.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    const sh = sheets[i];
    if (sh.getName() === CONFIG.LOG_SHEET_NAME || sh.getLastRow() < 1) continue;
    const top = sh.getRange(1, 1, Math.min(5, sh.getLastRow()), sh.getLastColumn()).getValues();
    if (locateColumns_(top)) { cache.put('roster_tab', sh.getName(), 600); return sh; }
    seen.push('"' + sh.getName() + '": ' + top[0].join(' | '));
  }
  throw new Error('No roster tab with "Registration ID" and "Full Names" headers. Tabs seen: ' + seen.join(' ; '));
}

// Finds the header row (within the first 5 rows) and the column positions.
function locateColumns_(rows) {
  for (let r = 0; r < Math.min(5, rows.length); r++) {
    const h = rows[r].map(headerKey_);
    const iReg = h.findIndex(function (k) { return ['registrationid', 'registrationnumber', 'registrationno', 'regid', 'regno'].indexOf(k) > -1; });
    const iName = h.findIndex(function (k) { return ['fullnames', 'fullname', 'names', 'name'].indexOf(k) > -1; });
    if (iReg < 0 || iName < 0) continue;
    // Author column: "Author_Type" > "Author (main/co)" > any header containing "author"
    let iAuth = h.indexOf('authortype');
    if (iAuth < 0) iAuth = h.indexOf('authormainco');
    if (iAuth < 0) iAuth = h.findIndex(function (k) { return k.indexOf('author') > -1; });
    // Paper column: "Title" > "Paper Title" > any "…paper…" > "Title (title case)"-style
    let iPaper = h.indexOf('title');
    if (iPaper < 0) iPaper = h.indexOf('papertitle');
    if (iPaper < 0) iPaper = h.findIndex(function (k) { return k.indexOf('paper') > -1; });
    if (iPaper < 0) iPaper = h.findIndex(function (k) { return k.indexOf('title') > -1; });
    return { row: r, iReg: iReg, iName: iName, iAuth: iAuth, iPaper: iPaper };
  }
  return null;
}

function findRosterEntry_(regKey, surname) {
  const values = getRosterSheet_().getDataRange().getValues();
  const loc = locateColumns_(values);
  if (!loc) throw new Error('Roster headers not found');
  const iReg = loc.iReg, iName = loc.iName, iAuth = loc.iAuth, iPaper = loc.iPaper;

  const wanted = surnameTokens_(surname);
  if (!wanted) return null;
  const hits = [];
  for (let i = loc.row + 1; i < values.length; i++) {
    const r = values[i];
    if (normReg_(r[iReg]) !== regKey) continue;
    const name = String(r[iName] || '').trim();
    if ((' ' + nameTokens_(name).join(' ') + ' ').indexOf(' ' + wanted + ' ') < 0) continue;
    const authorRaw = iAuth > -1 ? String(r[iAuth] || '').trim() : '';
    const author = classifyAuthor_(authorRaw);
    const paperTitle = iPaper > -1 ? String(r[iPaper] || '').trim() : '';
    const rank = (author === 'main' ? 0 : 2) + (paperTitle ? 0 : 1); // main+paper wins
    hits.push({ rank: rank, regKey: regKey, regId: String(r[iReg]).trim(), name: name,
      author: author, authorRaw: authorRaw, paperTitle: paperTitle });
  }
  if (!hits.length) return null;
  hits.sort(function (x, y) { return x.rank - y.rank; }); // stable in V8 → earliest row wins ties
  return hits[0];
}

// 'main' | 'co' | '' (blank). Anything that is not clearly "main" counts as co-author.
function classifyAuthor_(raw) {
  const a = norm_(raw);
  if (!a) return '';
  return /\b(main|first|lead|corresponding|presenting)\b/.test(a) ? 'main' : 'co';
}

function nameTokens_(name) {
  return norm_(name).replace(/[-']/g, ' ').split(' ').filter(function (t) {
    return t.length > 1 && TITLES.indexOf(t) < 0;
  });
}
function surnameTokens_(s) {
  const t = nameTokens_(s);
  return t.length ? t.join(' ') : '';
}

/* ───────────────────────────── VERIFICATION ───────────────────────────── */
function buildVerificationData_(certNo) {
  const key = String(certNo || '').trim().toUpperCase();
  if (!/^[A-Z0-9-]{6,30}$/.test(key)) return { valid: false, certNo: key.slice(0, 30) };
  const sh = getLogSheet_();
  const r = findRowByCertNo_(sh, key);
  if (r < 0) return { valid: false, certNo: key };
  const row = sh.getRange(r, 1, 1, LOG_HEADERS.length).getValues()[0];
  const fileId = String(row[COL.FILEID] || '');
  if (!fileId || fileId === 'PENDING') return { valid: false, certNo: key };
  const label = String(row[COL.TYPE] || '');
  return {
    valid: true,
    certNo: key,
    name: String(row[COL.NAME]),
    type: label,
    paperTitle: typeKeyFromLabel_(label) === 'presentation' ? String(row[COL.PAPER] || '') : '',
    issuedOn: Utilities.formatDate(new Date(row[COL.FIRST]), CONFIG.TIMEZONE, 'd MMMM yyyy'),
    event: 'TASS Nigeria 2026 (9th\u201312th November 2026)'
  };
}

/* ───────────────────────────── HELPERS ───────────────────────────── */
function success_(file, plan, entry, reused) {
  return {
    ok: true, reused: reused, certNo: plan.certNo, typeLabel: plan.typeLabel, name: entry.name,
    fileName: file.getName(), notice: plan.notice || '',
    pdfBase64: Utilities.base64Encode(file.getBlob().getBytes())
  };
}
function fail_(message) { return { ok: false, message: message }; }

function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000); // throws if it cannot get the lock → caught by claimCertificate
  try { fn(); } finally { lock.releaseLock(); }
}

function getLogSheet_() {
  const ss = SpreadsheetApp.openById(CONFIG.ROSTER_SPREADSHEET_ID);
  let sh = ss.getSheetByName(CONFIG.LOG_SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.LOG_SHEET_NAME);
    sh.getRange(1, 1, 1, LOG_HEADERS.length).setValues([LOG_HEADERS]).setFontWeight('bold').setBackground('#e8f3ea');
    sh.setFrozenRows(1);
    sh.getRange(1, COL.REG + 1, sh.getMaxRows(), 1).setNumberFormat('@');
    sh.getRange(1, COL.DATE + 1, sh.getMaxRows(), 1).setNumberFormat('@');
    sh.getRange(2, 1, sh.getMaxRows() - 1, 2).setNumberFormat('yyyy-mm-dd hh:mm:ss');
  }
  return sh;
}

function findRowByCertNo_(sh, certNo) {
  const last = sh.getLastRow();
  if (last < 2) return -1;
  const vals = sh.getRange(2, COL.CERTNO + 1, last - 1, 1).getValues();
  for (let i = 0; i < vals.length; i++) if (String(vals[i][0]).trim().toUpperCase() === certNo) return i + 2;
  return -1;
}

// TASS-2026-<last 5 digits of the registration number>. If two different registrations share the same
// last 5 digits, the later one gets a letter suffix (-B, -C …) so every number stays unique.
function certNoFor_(regId) {
  const digits = String(regId || '').replace(/\D/g, '');
  return digits ? ('00000' + digits).slice(-5) : '';
}
function newCertNo_(used, regId) {
  const five = certNoFor_(regId) || String(Math.floor(10000 + Math.random() * 90000)); // ID with no digits at all
  const base = CONFIG.CERT_NO_PREFIX + five;
  if (!used[base]) return base;
  const letters = 'BCDEFGHJKLMNPQRSTUVWXYZ';
  for (let i = 0; i < letters.length; i++) if (!used[base + '-' + letters[i]]) return base + '-' + letters[i];
  throw new Error('No free certificate number for ' + base);
}

function typeKeyFromLabel_(label) {
  const keys = Object.keys(CERT_TYPES);
  for (let i = 0; i < keys.length; i++) if (CERT_TYPES[keys[i]].label === label) return keys[i];
  return '';
}

function toDateStr_(v) {
  return v instanceof Date ? Utilities.formatDate(v, CONFIG.TIMEZONE, 'yyyy-MM-dd') : String(v || '').trim();
}
function normReg_(v) { return String(v == null ? '' : v).trim().toUpperCase().replace(/\s+/g, ''); }
function headerKey_(v) { return String(v || '').toLowerCase().replace(/[^a-z0-9]/g, ''); }
function norm_(s) {
  return String(s == null ? '' : s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').replace(/\s+/g, ' ').trim();
}
function safe_(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40);
}

/* ───────────── Run once from the editor: authorises scopes + checks setup ───────────── */
function checkSetup() {
  const out = [];
  const tryIt = function (label, fn) { try { out.push('✔ ' + label + ': ' + fn()); } catch (e) { out.push('✘ ' + label + ': ' + e.message); } };
  tryIt('Roster sheet', function () {
    const sh = getRosterSheet_();
    const values = sh.getDataRange().getValues();
    const loc = locateColumns_(values);
    const hdr = values[loc.row];
    const col = function (i) { return i > -1 ? '"' + hdr[i] + '"' : 'NOT FOUND'; };
    return 'tab "' + sh.getName() + '", header row ' + (loc.row + 1) + ', ' + (values.length - loc.row - 1) + ' rows | ID: ' +
      col(loc.iReg) + ' | Name: ' + col(loc.iName) + ' | Author: ' + col(loc.iAuth) + ' | Paper: ' + col(loc.iPaper);
  });
  tryIt('Author_Type values', function () {
    const values = getRosterSheet_().getDataRange().getValues();
    const loc = locateColumns_(values);
    if (loc.iAuth < 0) throw new Error('no author column found');
    const counts = {};
    for (let i = loc.row + 1; i < values.length; i++) {
      if (!normReg_(values[i][loc.iReg])) continue;
      const raw = String(values[i][loc.iAuth] || '').trim();
      const k = raw || '(blank)';
      counts[k] = (counts[k] || 0) + 1;
    }
    return Object.keys(counts).map(function (k) {
      const kind = k === '(blank)' ? 'delegate' : (classifyAuthor_(k) === 'main' ? 'MAIN author' : 'CO-author');
      return '"' + k + '" x' + counts[k] + ' = ' + kind;
    }).join(' | ');
  });
  tryIt('Authors with a blank Title', function () {
    const values = getRosterSheet_().getDataRange().getValues();
    const loc = locateColumns_(values);
    const bad = [];
    let withTitle = 0;
    for (let i = loc.row + 1; i < values.length; i++) {
      const reg = normReg_(values[i][loc.iReg]);
      if (!reg) continue;
      const hasTitle = String(values[i][loc.iPaper] || '').trim() !== '';
      const isAuthor = loc.iAuth > -1 && String(values[i][loc.iAuth] || '').trim() !== '';
      if (hasTitle) withTitle++;
      if (isAuthor && !hasTitle) bad.push(reg);
    }
    return withTitle + ' rows have a paper title; ' + bad.length + ' author row(s) have none' +
      (bad.length ? ': ' + bad.slice(0, 15).join(', ') + (bad.length > 15 ? ' …' : '') : '');
  });
  tryIt('Certificate number clashes', function () {
    const values = getRosterSheet_().getDataRange().getValues();
    const loc = locateColumns_(values);
    const map = {}, noDigits = [];
    for (let i = loc.row + 1; i < values.length; i++) {
      const reg = normReg_(values[i][loc.iReg]);
      if (!reg) continue;
      const five = certNoFor_(reg);
      if (!five) { noDigits.push(reg); continue; }
      (map[five] = map[five] || {})[reg] = true;
    }
    const clashes = Object.keys(map).filter(function (k) { return Object.keys(map[k]).length > 1; })
      .map(function (k) { return k + ' ← ' + Object.keys(map[k]).join(', '); });
    return (clashes.length ? clashes.length + ' shared last-5-digit group(s): ' + clashes.slice(0, 10).join(' ; ') +
      ' (later person gets a -B suffix)' : 'none, all numbers unique') +
      (noDigits.length ? ' | IDs with no digits: ' + noDigits.slice(0, 5).join(', ') : '');
  });
  tryIt('Log sheet', function () { return getLogSheet_().getName(); });
  tryIt('Certificates folder', function () { return DriveApp.getFolderById(CONFIG.CERT_FOLDER_ID).getName(); });
  tryIt('Slides template', function () {
    const f = DriveApp.getFileById(CONFIG.TEMPLATE_SLIDES_ID);
    if (f.getMimeType() !== MimeType.GOOGLE_SLIDES) {
      throw new Error('"' + f.getName() + '" is a ' + f.getMimeType() + ' file, not a native Google Slides file. ' +
        'Open it in Google Slides, choose File > Save as Google Slides, and put the NEW file\'s ID in CONFIG.TEMPLATE_SLIDES_ID.');
    }
    const p = SlidesApp.openById(CONFIG.TEMPLATE_SLIDES_ID);
    const txt = p.getSlides()[0].getShapes().map(function (s) { try { return s.getText().asString(); } catch (e) { return ''; } }).join(' ');
    const need = ['{{CERT_TYPE}}', '{{FULL_NAME}}', '{{ROLE}}', '{{PAPER_TITLE}}', '{{CERT_NO}}', '{{QR_CODE}}'];
    const miss = need.filter(function (t) { return txt.indexOf(t) < 0; });
    return p.getName() + (miss.length ? ' – tags not found on slide 1: ' + miss.join(', ') : ' – all tags found');
  });
  tryIt('QR service', function () { return fetchQr_('test').getBytes().length + ' bytes'; });
  console.log(out.join('\n'));
}