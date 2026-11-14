import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, Loader2, RotateCcw, Search, ShieldCheck, X } from "lucide-react";
import {
  PORTAL_READY,
  certificateVerifyUrl,
  normalizeCertNo,
} from "@/lib/certificatePortal";

// Same shape as the server-side check in buildVerificationData_.
const CERT_NO_PATTERN = /^[A-Z0-9-]{6,30}$/;

export default function VerifyCertificateModal({ open, onClose }) {
  const onCloseRef = useRef(onClose);
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [checkedNo, setCheckedNo] = useState("");
  const [attempt, setAttempt] = useState(0);
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
    if (!open) return undefined;

    setValue("");
    setError("");
    setCheckedNo("");
    setLoaded(false);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const certNo = normalizeCertNo(value);
    if (!CERT_NO_PATTERN.test(certNo)) {
      setError("Enter the certificate number exactly as printed, e.g. TASS-2026-48291.");
      return;
    }
    setError("");
    setLoaded(false);
    setCheckedNo(certNo);
    setAttempt((n) => n + 1);
  };

  const checkAnother = () => {
    setCheckedNo("");
    setLoaded(false);
    setError("");
    setValue("");
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="verify-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative bg-card w-full max-w-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[85vh] max-md:h-[92vh]">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border bg-primary">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <h3
                id="verify-modal-title"
                className="font-heading font-bold text-sm md:text-base text-primary-foreground truncate"
              >
                Verify a Certificate
              </h3>
              <p className="hidden sm:block text-[11px] text-primary-foreground/70 truncate">
                Check a TASS Nigeria 2026 certificate number against the official register.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close certificate verification"
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {!PORTAL_READY ? (
          <div className="grid flex-1 place-items-center px-6 text-center">
            <div className="max-w-sm space-y-2">
              <AlertCircle className="w-8 h-8 text-accent mx-auto" aria-hidden="true" />
              <p className="font-semibold text-foreground">Certificate verification is being set up</p>
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
        ) : checkedNo ? (
          <div className="relative flex-1 bg-white">
            {!loaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white px-6 text-center">
                <Loader2 className="w-7 h-7 text-secondary animate-spin" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">Checking certificate {checkedNo}…</p>
              </div>
            )}
            <iframe
              key={`${checkedNo}-${attempt}`}
              src={certificateVerifyUrl(checkedNo)}
              title={`Certificate verification result for ${checkedNo}`}
              className="h-full w-full border-0"
              onLoad={() => setLoaded(true)}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-muted/30 px-5 py-8 sm:px-8">
            <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="certificate-number"
                  className="block text-sm font-semibold text-foreground"
                >
                  Certificate number
                </label>
                <input
                  ref={inputRef}
                  id="certificate-number"
                  name="certificate-number"
                  type="text"
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder="TASS-2026-48291"
                  autoComplete="off"
                  spellCheck="false"
                  maxLength={40}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-mono tracking-wide text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  aria-describedby="certificate-number-hint"
                  aria-invalid={error ? "true" : "false"}
                />
                <p id="certificate-number-hint" className="text-xs text-muted-foreground">
                  Printed on the certificate as <span className="font-mono">Certificate No:</span>{" "}
                  (also encoded in its QR code).
                </p>
                {error && (
                  <p className="flex items-start gap-1.5 text-xs text-destructive" role="alert">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{error}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Verify certificate
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Only certificates issued through this portal are listed. No personal account or login is required.
              </p>
            </form>
          </div>
        )}

        {checkedNo && (
          <div className="border-t border-border bg-card px-4 py-3">
            <button
              type="button"
              onClick={checkAnother}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Check another certificate
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
