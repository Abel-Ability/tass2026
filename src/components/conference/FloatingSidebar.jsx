import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClipboardCheck, FileText, Handshake } from "lucide-react";

const actions = [
  { label: "Register Now", mobileLabel: "Register", href: "/register#register-cta", color: "bg-green-600 text-white hover:bg-green-700", icon: ClipboardCheck },
  { label: "Submit Abstract", mobileLabel: "Abstract", href: "/themes#submit-abstract", color: "bg-gold text-navy hover:bg-gold/90", icon: FileText },
  { label: "Become a Sponsor", mobileLabel: "Sponsor", href: "/sponsorship", color: "bg-blue-800 text-white hover:bg-blue-900", icon: Handshake },
];

export default function FloatingSidebar() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.9], [0, 120]);

  return (
    <motion.div
      style={{ y }}
      className="fixed right-1.5 sm:right-3 md:right-4 top-[35%] md:top-1/2 -translate-y-1/2 z-50 flex-col gap-1 md:gap-2 flex"
    >
      {actions.map((a) => (
        <Link
          key={a.label}
          to={a.href}
          className={`${a.color} inline-flex items-center justify-center font-semibold rounded-full shadow-lg hover:shadow-xl opacity-75 hover:opacity-100 transition-all whitespace-nowrap
            text-[10px] px-2 py-1.5 sm:text-xs sm:px-2.5 sm:py-2 md:text-sm lg:text-lg xl:text-xl md:px-4 md:py-2.5 lg:px-5 lg:py-3`}
        >
          <a.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:hidden" />
          <span className="hidden md:inline">{a.label}</span>
          <span className="md:hidden">{a.mobileLabel}</span>
        </Link>
      ))}
    </motion.div>
  );
}
