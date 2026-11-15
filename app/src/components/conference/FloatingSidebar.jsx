import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Award, ClipboardCheck, ShieldCheck } from "lucide-react";
import CertificateModal from "./CertificateModal";
import VerifyCertificateModal from "./VerifyCertificateModal";

const actions = [
  { label: "Register Now", mobileLabel: "Register", href: "/register#register-cta", color: "bg-green-600 text-white hover:bg-green-700", icon: ClipboardCheck },
];

const CERTIFICATE_HINT_KEY = "tass-certificate-hint-v2";

const ACTION_BASE_CLASS =
  "inline-flex items-center justify-center font-semibold rounded-full shadow-lg hover:shadow-xl opacity-75 hover:opacity-100 transition-all whitespace-nowrap " +
  "text-[10px] px-2 py-1.5 sm:text-xs sm:px-2.5 sm:py-2 md:text-sm lg:text-lg xl:text-xl md:px-4 md:py-2.5 lg:px-5 lg:py-3";

export default function FloatingSidebar() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.9], [0, 120]);
  const reduceMotion = useReducedMotion();
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [showCertificateHint, setShowCertificateHint] = useState(() => {
    try {
      return window.localStorage.getItem(CERTIFICATE_HINT_KEY) !== "dismissed";
    } catch {
      return true;
    }
  });

  const openCertificatePortal = () => {
    setCertificateOpen(true);
    setShowCertificateHint(false);
    try {
      window.localStorage.setItem(CERTIFICATE_HINT_KEY, "dismissed");
    } catch {
      // storage blocked (private mode): the hint simply shows again next visit
    }
  };

  return (
    <>
      <motion.div
        style={{ y }}
        className="fixed right-1.5 sm:right-3 md:right-4 top-[35%] md:top-1/2 -translate-y-1/2 z-50 flex-col gap-1 md:gap-2 flex"
      >
        <div className="relative">
          <button
            type="button"
            onClick={openCertificatePortal}
            className={`relative w-full bg-amber-500 text-white hover:bg-amber-600 ${ACTION_BASE_CLASS}`}
            aria-label="Generate Certificate"
          >
            <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:hidden" />
            <span className="hidden md:inline">Generate Certificate</span>
            <span className="md:hidden">Certificate</span>
          </button>

          {/* pulsing outline keeps attention on the certificate button */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 rounded-full border-2 border-amber-400/80 animate-certificate-hint"
          />

          {/* thick solid arrow pointing at the certificate button */}
          {showCertificateHint && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-full top-1/2 z-10 mr-1.5 -translate-y-1/2 sm:mr-2.5"
            >
              <motion.svg
                viewBox="0 0 48 24"
                className="h-4 w-8 fill-amber-500 drop-shadow sm:h-5 sm:w-10 md:h-6 md:w-12 dark:fill-amber-400"
                animate={reduceMotion ? { x: 0 } : { x: [-5, 5, -5] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M0 6h26V0l22 12-22 12v-6H0z" />
              </motion.svg>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setVerifyOpen(true)}
          className={`bg-red-600 text-white hover:bg-red-700 ${ACTION_BASE_CLASS}`}
          aria-label="Verify Certificate"
        >
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:hidden" />
          <span className="hidden md:inline">Verify Certificate</span>
          <span className="md:hidden">Verify</span>
        </button>

        {actions.map((a) => (
          <Link key={a.label} to={a.href} className={`${a.color} ${ACTION_BASE_CLASS}`}>
            <a.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:hidden" />
            <span className="hidden md:inline">{a.label}</span>
            <span className="md:hidden">{a.mobileLabel}</span>
          </Link>
        ))}
      </motion.div>

      <CertificateModal open={certificateOpen} onClose={() => setCertificateOpen(false)} />
      <VerifyCertificateModal open={verifyOpen} onClose={() => setVerifyOpen(false)} />
    </>
  );
}
