import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";

const stats = [
  { val: 1500, suffix: "+", label: "Delegates" },
  { val: 30, suffix: "+", label: "Countries" },
  { val: 50, suffix: "+", label: "Speakers" },
  { val: 18, suffix: "", label: "Technical Sessions" },
  { val: 6, suffix: "", label: "Workshops" },
];

function AnimatedNumber({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display font-extrabold text-[1.8rem] md:text-[2.4rem] text-gold">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="pt-0 pb-10 md:pt-0 md:pb-10 bg-muted/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionHeading
          label="By the Numbers"
          title="TASS Nigeria 2026 in Numbers"
          description="A truly global gathering of researchers, innovators, and policymakers."
          align="center"
          titleClass="text-[1.3125rem] md:text-[1.575rem] lg:text-[2.1rem]"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mt-1">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center"
            >
              <AnimatedNumber target={s.val} suffix={s.suffix} />
              <p className="text-sm text-muted-foreground mt-2 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
