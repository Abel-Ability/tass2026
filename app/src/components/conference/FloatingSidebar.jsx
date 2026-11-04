import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClipboardCheck, FileEdit, FileText, Handshake, Trophy } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const CMT_SUBMISSION_URL = "https://cmt3.research.microsoft.com/Conference/Recent";

const actions = [
  { label: "Full Paper Submission", mobileLabel: "Full Paper", external: CMT_SUBMISSION_URL, color: "bg-red-700 text-white hover:bg-red-800", icon: FileEdit },
  { label: "Register Now", mobileLabel: "Register", href: "/register#register-cta", color: "bg-green-600 text-white hover:bg-green-700", icon: ClipboardCheck },
  { label: "Submit Abstract", mobileLabel: "Abstract", href: "/themes#submit-abstract", color: "bg-gold text-navy hover:bg-gold/90", icon: FileText },
  { label: "Join the Hackathon", mobileLabel: "Hackathon", href: "/hackathon#register", color: "bg-purple-700 text-white hover:bg-purple-800", icon: Trophy },
  { label: "Become a Sponsor", mobileLabel: "Sponsor", href: "/sponsorship", color: "bg-blue-800 text-white hover:bg-blue-900", icon: Handshake },
];

const ACTION_BASE_CLASS =
  "inline-flex items-center justify-center font-semibold rounded-full shadow-lg hover:shadow-xl opacity-75 hover:opacity-100 transition-all whitespace-nowrap " +
  "text-[10px] px-2 py-1.5 sm:text-xs sm:px-2.5 sm:py-2 md:text-sm lg:text-lg xl:text-xl md:px-4 md:py-2.5 lg:px-5 lg:py-3";

export default function FloatingSidebar() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.9], [0, 120]);

  return (
    <motion.div
      style={{ y }}
      className="fixed right-1.5 sm:right-3 md:right-4 top-[35%] md:top-1/2 -translate-y-1/2 z-50 flex-col gap-1 md:gap-2 flex"
    >
      {actions.map((a) => (
        a.external ? (
          <AlertDialog key={a.label}>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className={`${a.color} ${ACTION_BASE_CLASS}`}
                aria-label={a.label}
              >
                <a.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:hidden" />
                <span className="hidden md:inline">{a.label}</span>
                <span className="md:hidden">{a.mobileLabel}</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Complete Your Full Paper Submission</AlertDialogTitle>
                <AlertDialogDescription>
                  Full papers are submitted through the Microsoft CMT platform. Before you can submit, you
                  must first <strong>register as an author</strong> on CMT and sign in. If you already have a
                  CMT account, please sign in on the next page before submitting your full paper.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <a href={CMT_SUBMISSION_URL} target="_blank" rel="noopener noreferrer">
                    Continue to CMT
                  </a>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Link
            key={a.label}
            to={a.href}
            className={`${a.color} ${ACTION_BASE_CLASS}`}
          >
            <a.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:hidden" />
            <span className="hidden md:inline">{a.label}</span>
            <span className="md:hidden">{a.mobileLabel}</span>
          </Link>
        )
      ))}
    </motion.div>
  );
}