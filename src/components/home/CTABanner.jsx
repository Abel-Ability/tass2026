import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ABUJA_IMG = "/abuja-skyline.jpg";

export default function CTABanner() {
  return (
    <section className="relative py-10 md:py-10 overflow-hidden">
      <div className="absolute inset-0">
        <img src={ABUJA_IMG} alt="Abuja skyline" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/70" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
            Join Us in Abuja
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white leading-tight mb-6 max-w-3xl mx-auto text-balance">
            Be Part of Africa's Most Impactful Academic Gathering
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
            Early bird registration closes 30 September 2026. Secure your place at TASS Nigeria 2026 today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all text-[17.6px]"
            >
              Register Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/sponsorship"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-800 text-white font-semibold rounded-full hover:bg-blue-900 transition-all text-[17.6px]"
            >
              Become a Sponsor
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}