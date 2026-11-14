// One Google Apps Script deployment serves both certificate pages:
//   ?embed=true          -> issuance form (CertificateModal)
//   ?verify=<cert-no>    -> verification page (VerifyCertificateModal and QR codes)
// Keep this URL free of query strings; the helpers below append their own.
// After redeploying the Apps Script project, the /exec URL stays the same.
export const GAS_PORTAL_BASE_URL =
  "https://script.google.com/macros/s/AKfycbxoXcBjjwYsNYdQpQopB6xbl63m2eTl_U84WCrxZPe62ucSbLt6KVegAhoMMgKQ8aoB/exec";

const PLACEHOLDER_DEPLOYMENT_ID = "PASTE_DEPLOYMENT_ID";

// False while the placeholder is still in the URL; the modals then show a setup notice.
export const PORTAL_READY = !GAS_PORTAL_BASE_URL.includes(PLACEHOLDER_DEPLOYMENT_ID);

export function certificateIssueUrl() {
  return GAS_PORTAL_BASE_URL + "?embed=true";
}

// Mirrors the server rule in buildVerificationData_: uppercase, no spaces.
export function normalizeCertNo(value) {
  return String(value || "").replace(/\s+/g, "").toUpperCase();
}

export function certificateVerifyUrl(certNo) {
  const url = new URL(GAS_PORTAL_BASE_URL);
  url.searchParams.set("verify", normalizeCertNo(certNo));
  url.searchParams.set("embed", "true");
  return url.toString();
}
