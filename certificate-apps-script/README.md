# TASS Nigeria 2026 — Certificate portal

A standalone Google Apps Script web app that issues a participant's certificate
PDF from their registration number. It is opened in an iframe modal by the
floating **Generate Certificate** button on https://tasscemri.org.

This folder is source only — the live app runs inside its own Apps Script
project, deployed separately from the website. Vite does not build or deploy it.

| | |
| --- | --- |
| Live deployment | `https://script.google.com/macros/s/AKfycbxoXcBjjwYsNYdQpQopB6xbl63m2eTl_U84WCrxZPe62ucSbLt6KVegAhoMMgKQ8aoB/exec` |
| Embedded by | `app/src/components/conference/CertificateModal.jsx` (`?embed=true`) |
| Verify lookups | same URL with `?verify=<cert-no>`, used by certificate QR codes and `app/src/components/conference/VerifyCertificateModal.jsx` |

## Files

| File | Purpose |
| --- | --- |
| `Code.gs` | Server logic: roster lookup, certificate generation, issuance log, verification. |
| `Certificate.html` | Participant-facing page: registration number + surname + certificate type → download/print PDF. |
| `Verify.html` | Public verification page shown when a certificate QR code is scanned. |
| `appsscript.json` | Manifest: V8, `Africa/Lagos`, web app `USER_DEPLOYING` + `ANYONE_ANONYMOUS`. |

## How it works

1. Participant opens the modal and enters **Registration number**, **Surname**
   and **Certificate type** (Participation, or Participation and Paper
   Presentation). Authors with more than one paper pick which paper the
   certificate is for.
2. `findRosterEntries_` looks the pair up in the roster spreadsheet
   (`1AqypBH8gehtbv6MdtSunGsxKwX-b2T5gUXfLuxZnOdk`, tab `Consolidated`). The
   registration ID must match exactly (case/space-insensitive) **and** the
   surname must appear as a whole word inside the `Full Names` value, so knowing
   an ID alone is not enough.
3. On the **first** request for a certificate the app copies the Slides template,
   fills the placeholders, adds a QR code, exports a PDF to the certificates
   folder and records it in the **Issued Certificates** tab.
4. Every later request for the same registration number, certificate type and
   paper returns that **same PDF**. Each paper gets its own certificate.
5. The PDF is returned to the page as base64 and turned into a local blob, so
   the Drive file stays private and the download works without sharing links.

`Issued Certificates` columns:
`First Issued At · Last Access At · Access Date · Access Count · Registration ID ·
Full Names · Author (main/co) · Paper Title · Certificate Number · File ID ·
File Name · Certificate Type · Submission ID`

Certificate numbers are `TASS-2026-` + the last 5 digits of the registration
number. If two registrations end in the same 5 digits the later one gets a
`-B`, `-C` … suffix; an ID with no digits at all gets 5 random digits.

## Anti-duplication

| Measure | Where | What it stops |
| --- | --- | --- |
| Generate once, reuse forever | `issueOrReuse_` | Duplicate certificates by construction |
| `LockService` around the log writes | `claim_` → `withLock_` | Two simultaneous clicks creating two PDFs |
| `PENDING` marker + stale timeout | `issueOrReuse_` | A second request while the first PDF is still rendering |
| Issuance log tab | `Issued Certificates` | Audit trail; lets you revoke/renumber |
| 60 s cooldown per certificate | `CONFIG.COOLDOWN_SECONDS` | Rapid re-generation / hammering |
| 5 requests per day per certificate | `CONFIG.MAX_REQUESTS_PER_DAY` | Scripted abuse |
| 8 wrong guesses per hour per ID | `CONFIG.MAX_FAILED_PER_HOUR` (CacheService) | Walking through registration numbers |
| Surname must match the roster | `findRosterEntry_` | Claiming someone else's certificate |
| QR → verification page | `?verify=` → `buildVerificationData_` | Forged or edited PDFs |

A certificate is issued once per **registration number + certificate type**, and
for Paper Presentation once per **paper** (`Submission ID`). Re-requesting the
same combination returns the existing PDF. Participants with a paper cannot
request Participation — authors must choose Participation and Paper
Presentation. To reissue, delete that row from `Issued Certificates` **and** its
PDF from Drive.

## Setup

1. Create a new project at <https://script.google.com> (blank project).
2. Create `Code.gs`, `Certificate.html`, `Verify.html` with exactly these names
   and paste the contents of this folder. In **Project Settings**, tick
   *Show "appsscript.json" manifest file in editor* and paste `appsscript.json`.
3. In `Code.gs`, `CONFIG.TEMPLATE_SLIDES_ID` and `CONFIG.ROSTER_SPREADSHEET_ID`
   are already set (see the table below); change the template only if the deck
   is replaced.
4. Run `checkSetup()` once from the editor and approve the permissions. It logs
   a checklist (roster tab and detected column positions, `Author_Type` values,
   author rows with no paper title, certificate-number clashes, log tab, folder,
   Slides template type and placeholders, QR service). Fix anything marked `✘`
   before deploying — a missing template ID fails here first.
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Copy the `/exec` URL.
6. Paste that URL **with `?embed=true`** into
   `app/src/components/conference/CertificateModal.jsx` → `GAS_CERT_URL`.
   Until the real URL is in place the modal shows the *"Certificate portal is
   being set up"* panel instead of the iframe.

Redeploying: **Deploy → Manage deployments → edit (pencil) → Version: New
version**. The `/exec` URL stays the same, so the website needs no change.

`Code.gs` must return `HtmlOutput` with
`setXFrameOptionsMode(ALLOWALL)`; without it the iframe modal stays blank. Do not
remove that call.

## Slides template

Put these in **text boxes** on the first slide. Any extra slides are deleted
automatically. Text can be styled however you like — only the placeholder text
matters. Tag casing matters too (`{{FULL_NAME}}`, not `{{Full_Name}}`).

| Placeholder | Filled with |
| --- | --- |
| `{{CERT_TYPE}}` | `Certificate of Participation` or `Certificate of Participation and Paper Presentation` |
| `{{FULL_NAME}}` | Full name from the roster |
| `{{ROLE}}` | `the Main Author`, `a Co-Author`, `an Author` (presentation) or `a Delegate` (participation) |
| `{{PAPER_TITLE}}` | `Title of Paper: “…”`, or empty for a Participation certificate |
| `{{CERT_NO}}` | e.g. `TASS-2026-48291` |
| `{{DATE}}` | Issue date, e.g. `12 November 2026` |

`{{ROLE}}` reads as the object of a sentence, so word the line as
`This is to certify that {{FULL_NAME}} is {{ROLE}} …`.

The deck currently deployed uses:

```
TASS NIGERIA 2026 — THEME: Advancing Global Innovation and Sustainable Development
{{CERT_TYPE}}
This is to certify that
{{FULL_NAME}}
participated as {{ROLE}} at the International Conference on Technology, Arts,
Science, and Society (TASS Nigeria 2026) — Hackathon, Innovation …
{{PAPER_TITLE}}
{{QR_CODE}}
Certificate No: {{CERT_NO}}
```

So `{{ROLE}}` renders as *“participated as a Delegate”* / *“participated as the
Main Author”*. The deck has **no `{{DATE}}` tag**, so certificates carry no issue
date; add the tag (and a text box for it) if you want one printed.

The `{{QR_CODE}}` text box is about 125 × 106 pt, and the image is resized to the
box, so the QR comes out slightly non-square. Make that box square (e.g.
106 × 106 pt) for a perfectly square code.

`{{NAME}}` is still replaced (legacy) and `{{QR_CODE}}` / `{{QR}}` are accepted
for the QR code, but `checkSetup()` expects `{{CERT_TYPE}}`, `{{FULL_NAME}}`,
`{{ROLE}}`, `{{PAPER_TITLE}}`, `{{CERT_NO}}` and `{{QR_CODE}}`.

For the QR code, either:

- put `{{QR_CODE}}` alone in its own text box — the box is replaced by the QR
  image at the box's position and size, or
- insert **any** image and set its **alt text / description / title** to
  `{{QR_CODE}}` — it is replaced in place.

If neither is found, a 90 pt QR is added at the bottom-right corner. Don't put
the tag inside a table cell or a group; those are not scanned. `checkSetup()` only
sees text in shapes, so an alt-text-only QR tag is reported as missing even
though it works.

## Configuration

All in `CONFIG` (+ `CERT_TYPES`) at the top of `Code.gs`:

| Key | Default | Notes |
| --- | --- | --- |
| `ROSTER_SPREADSHEET_ID` | `1AqypBH8gehtbv6MdtSunGsxKwX-b2T5gUXfLuxZnOdk` | Read-only. |
| `ROSTER_SHEET_NAME` | `Consolidated` | Roster tab in the spreadsheet. `''` auto-detects the first tab. |
| `LOG_SHEET_NAME` | `Issued Certificates` | Created automatically in the roster spreadsheet. |
| `CERT_FOLDER_ID` | certificates folder | Finished PDFs are stored here; it is never shared publicly. |
| `TEMPLATE_SLIDES_ID` | `1CLqHNQz9as4Ugj3Nr49j-Gi-QYrPD_7ydydItEfCoXs` | Must be a native Google Slides file, not an uploaded `.pptx`. |
| `VERIFY_BASE_URL` | `''` | `''` uses `ScriptApp.getService().getUrl()`. Set the `/exec` URL if QR links ever come out wrong. |
| `SUPPORT_CONTACT` | `Dr. Agnes Bassey on +234 805 281 0967` | Shown when a presentation certificate is requested but the roster has no paper title. |
| `CERT_NO_PREFIX` | `TASS-2026-` | Certificate numbers are `PREFIX` + 5 digits. |
| `TIMEZONE` | `Africa/Lagos` | Used for dates, the daily cap and log timestamps. |
| `COOLDOWN_SECONDS` | `60` | Seconds between two requests for the same ID. |
| `MAX_REQUESTS_PER_DAY` | `5` | Per registration, reset at midnight (script timezone). |
| `MAX_FAILED_PER_HOUR` | `8` | Wrong ID/surname attempts per registration ID. |
| `PENDING_STALE_MS` | `180000` | A half-finished issuance older than this may be retried. |

Roster headers are detected within the first 5 rows; the log tab is skipped.
Registration column: `Registration ID` / `Registration Number` / `Reg ID` / …
Name column: `Full Names` / `Full Name` / `Names` / `Name`.
Author column: `Author_Type` > `Author (main/co)` > any header containing
"author". Paper column: `Title` > `Paper Title` > any header with "paper" > any
with "title". If a person has several rows, the main-author row with a paper
title wins; ties go to the earliest row.

## Verification page

Every certificate carries `{{CERT_NO}}` and a QR pointing at
`<web-app-url>?verify=<cert-no>`. Opening the URL shows `Verify.html`:

- **Valid certificate** — name, certificate type, paper title (presentation
  only), event, issue date, certificate number.
- **Certificate not found** — the number is not in `Issued Certificates`, or its
  row has no finished PDF yet.

The verification page is read-only. Scanning a QR on a printout opens the page in
the phone's browser; it does not need a Google login.

Every lookup — QR scan, the site's **Verify Certificate** modal, or a typed
`?verify=` URL — appends one row to the **Verification Log** tab
(`Checked At · Certificate Number · Result`). Logging is best effort: if the tab
or spreadsheet is unavailable the page still renders. `checkSetup()` creates and
reports the tab.

## Roster notes

The current roster's header row is:

`S/N · Registration ID · Full Names · Title · Phone · Email · Author_Type · Submission ID`

- `Title` is the **paper title** column; `locateColumns_` prefers a header named
  exactly `Title`, then `Paper Title`. `Author_Type` holds `Main Author` /
  `Co-author`.
- Only a row that carries a Registration ID can be claimed: 123 of 369 rows have
  one. The other 246 rows are co-authors with a blank ID, so they cannot retrieve
  a certificate with the three-field form. Give them an ID (or issue those
  manually) if they should have certificates.
- 54 of the 123 ID rows have no paper title, so a *Participation and Paper
  Presentation* request for them is refused with the "contact the organisers"
  message. Fill the `Title` column for anyone who actually presented.
- **Keep the spreadsheet private (Restricted).** It is currently viewable by
  anyone with the link, and the CSV export is open too — that exposes every name,
  phone, email and registration ID, which would defeat the surname check
  entirely. The web app runs as the deploying account and needs no public
  sharing, and the certificates folder must stay private for the same reason.

## Testing

There is one entry point, run from the Apps Script editor:

| Function | What it does |
| --- | --- |
| `checkSetup()` | Prints the whole setup checklist, including the template's missing tags. Exercises every scope, so run it first. |

`checkSetup()` is the fastest way to confirm a fresh deployment: it checks the
roster, the log tab, the folder, the Slides template and the QR service in one
pass.

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Modal shows "Certificate portal is being set up" | `GAS_CERT_URL` in `CertificateModal.jsx` still contains `PASTE_DEPLOYMENT_ID`. |
| Modal is blank | Deployment is not "Anyone" access, or the `setXFrameOptionsMode(ALLOWALL)` line was removed. |
| "Something went wrong on our side…" | `TEMPLATE_SLIDES_ID` / `CERT_FOLDER_ID` is wrong or not shared with the deploying account; run `checkSetup()`. |
| "We could not match that registration number and surname." | Both must match the roster; the surname must be a whole word in `Full Names`. Titles like Dr/Prof are ignored. |
| "Our records show no paper title under this registration number…" | That row is blank in the paper column; update the roster, or the participant should pick Participation. |
| "You have reached the daily limit…" | `MAX_REQUESTS_PER_DAY` (5) already used today for that ID. |
| "Your certificate is still being prepared…" | A previous request died mid-render; it clears after `PENDING_STALE_MS` (3 min). |
| "QR generation failed" | `api.qrserver.com` was unreachable or rate-limited. Retry; if it persists, replace `fetchQr_` with another QR source. |
| Template text not replaced | Placeholder must be in a text box and match exactly, including braces and case. |
| "…is not a native Google Slides file" from `checkSetup()` | Open the upload in Slides and use *File → Save as Google Slides*, then copy the new file's ID. |
| Download does nothing inside the modal | The Apps Script sandbox iframe allows downloads in current browsers; if a rare mobile browser blocks it, use **Open & print**. |

## Notes

- Scopes used: Sheets, Slides, Drive, external requests (`UrlFetchApp` for the
  QR image). No mail is sent.
- Deleting a row from `Issued Certificates` does **not** delete the PDF in Drive.
  The next request then creates a new certificate (new number only if the old row
  is gone). Delete the PDF too for a genuinely fresh certificate.
- If a PDF is deleted from Drive but its log row survives, the next request
  rebuilds it under the **same** certificate number, so printed QR codes keep
  working.
- The certificate folder is never published. The PDF reaches the participant only
  as a blob rendered in their own browser.
- `appsscript.json` pins `executeAs: USER_DEPLOYING` and
  `access: ANYONE_ANONYMOUS`; changing either breaks the modal and the QR
  verification page.
