import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, Award, Loader2, X } from "lucide-react";
import { PORTAL_READY, certificateIssueUrl } from "@/lib/certificatePortal";

// ---------------------------------------------------------------------------
// Certificate portal (Google Apps Script web app)
//
// Deploy certificate-apps-script/ as a web app:
//   Deploy > New deployment > Web app
//   Execute as: Me
//   Who has access: Anyone
//
// The deployment /exec URL lives in src/lib/certificatePortal.js and is shared
// with VerifyCertificateModal (same deployment, ?verify=<cert-no>).
// The deployment must use "Execute as: Me" + "Who has access: Anyone";
// Certificate pages are served with X-Frame-Options ALLOWALL so this iframe works.
// ---------------------------------------------------------------------------
const GAS_CERT_URL = certificateIssueUrl();

export default function CertificateModal({ open, onClose }) {
  const iframeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) setLoaded(false);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-card w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[85vh] max-md:h-[92vh]">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-primary">
          <div className="flex items-center gap-2 min-w-0">
            <Award className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <h3
                id="certificate-modal-title"
                className="font-heading font-bold text-sm md:text-base text-primary-foreground truncate"
              >
                Generate Your Certificate
              </h3>
              <p className="hidden sm:block text-[11px] text-primary-foreground/70 truncate">
                Enter your registration number and surname to download your TASS Nigeria 2026 certificate.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
            aria-label="Close certificate portal"
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        <div className="relative flex-1 bg-white">
          {PORTAL_READY ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white px-6 text-center">
                  <Loader2 className="w-7 h-7 text-secondary animate-spin" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">Loading the certificate portal…</p>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={GAS_CERT_URL}
                title="TASS Nigeria 2026 certificate portal"
                className="h-full w-full border-0"
                onLoad={() => setLoaded(true)}
              />
            </>
          ) : (
            <div className="grid h-full place-items-center px-6 text-center">
              <div className="max-w-sm space-y-2">
                <AlertCircle className="w-8 h-8 text-accent mx-auto" aria-hidden="true" />
                <p className="font-semibold text-foreground">Certificate portal is being set up</p>
                <p className="text-sm text-muted-foreground">
                  The certificate service has not been connected yet. Please check back shortly or email{" "}
                  <a
                    href="mailto:tass2026@uniabuja.edu.ng"
                    className="text-secondary underline underline-offset-2"
                  >
                    tass2026@uniabuja.edu.ng
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
