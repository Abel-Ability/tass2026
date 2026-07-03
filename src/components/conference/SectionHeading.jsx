import React from "react";
import { motion } from "framer-motion";

export default function SectionHeading({ label, title, description, align = "left", light = false, titleClass = "", className = "", descClass = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-10 ${align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-xl"} ${className}`}
    >
      {label && (
        <span className={`inline-block text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${
          light ? "text-accent/80" : "text-accent"
        }`}>
          {label}
        </span>
      )}
      <h2 className={`font-display font-extrabold leading-tight text-balance ${titleClass || "text-3xl md:text-4xl lg:text-5xl"} ${
        light ? "text-primary-foreground" : "text-foreground"
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${
          light ? "text-primary-foreground/60" : "text-muted-foreground"
        } ${descClass}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}