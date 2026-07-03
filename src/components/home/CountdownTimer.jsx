import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2026-11-09T00:00:00+01:00");

function calc() {
  const now = new Date();
  const diff = Math.max(0, TARGET.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

const boxes = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export default function CountdownTimer() {
  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mb-10"
    >
      <p className="text-gold font-heading font-semibold text-sm uppercase tracking-[0.15em] mb-3">
        Counting Down to TASS Nigeria 2026
      </p>
      <p className="text-white/50 text-xs mb-4">09–12 November 2026</p>
      <div className="flex gap-3 md:gap-4">
        {boxes.map(({ key, label }) => (
          <div key={key} className="flex flex-col items-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 md:px-5 md:py-4 min-w-[65px] md:min-w-[80px] text-center">
              <motion.span
                key={time[key]}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="font-display font-extrabold text-2xl md:text-3xl text-gold"
              >
                {String(time[key]).padStart(2, "0")}
              </motion.span>
            </div>
            <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider mt-1.5 font-medium">
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
