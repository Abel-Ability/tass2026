import React from "react";
import { Link } from "react-router-dom";

const actions = [
  { label: "Register Now", href: "/register", color: "bg-green-600 text-white hover:bg-green-700" },
  { label: "Submit Abstract", href: "/themes", color: "bg-gold text-navy hover:bg-gold/90" },
  { label: "Become a Sponsor", href: "/sponsorship", color: "bg-blue-800 text-white hover:bg-blue-900" },
];

export default function FloatingSidebar() {
  return (
    <div className="fixed right-1 md:right-4 top-1/2 -translate-y-1/2 z-50 flex-col gap-0.5 md:gap-2 flex">
      {actions.map((a) => (
        <Link
          key={a.label}
          to={a.href}
          className={`${a.color} inline-flex items-center justify-center font-semibold text-[11px] sm:text-xs md:text-base lg:text-xl xl:text-2xl px-2 py-1.5 sm:px-2.5 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 rounded-full shadow-lg hover:shadow-xl opacity-70 hover:opacity-100 transition-all whitespace-nowrap`}
        >
          {a.label}
        </Link>
      ))}
    </div>
  );
}
