import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import CountdownTimer from "@/components/home/CountdownTimer";

const HERO_IMG = "/hero-bg.jpg";

export default function HeroSection() {
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const offset = window.scrollY * 0.4;
        bgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.1)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0" ref={bgRef} style={{ transform: "scale(1.1)" }}>
        <img src={HERO_IMG} alt="University of Abuja campus" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
      </div>

      <div className="absolute top-0 left-[8%] w-px h-full bg-white/5" />
      <div className="absolute top-0 left-[25%] w-px h-full bg-white/5" />
      <div className="absolute top-0 right-[15%] w-px h-full bg-white/5" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-10 md:pb-10 pt-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-[1cm]"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-8 h-px bg-gold" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  <span className="text-green-400">TASS NIG</span><span className="text-red-400">ERIA 2026</span>
                </span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[0.95] tracking-tight mb-6">
                <span className="text-green-400">Technology.</span>
                <br />
                <span className="text-gold">Arts.</span> Science.
                <br />
                <span className="text-orange-400">Society.</span> <span className="text-black/80">(TASS)</span>
              </h1>

              <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-8">
                A four-day international conference bringing together researchers, policymakers, industry leaders, and students across 18 thematic tracks.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-10">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> 09–12 November 2026
                </span>
                <span className="w-px h-4 bg-white/20" />
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> University of Abuja, Nigeria
                </span>
              </div>

              <CountdownTimer />

              <div className="mb-8 space-y-1.5">
                {[
                  { name: "Engr. (Dr) Duabari Silas Aziaka", role: "IOC Chairman", phone: "+447442568824" },
                  { name: "Prof. Patricia Awa Taiwo", role: "LOC Chairperson", phone: "+2348034820646" },
                  { name: "Dr. Lekpa Kingdom David", role: "CEMRI President", phone: "+2348035607640" },
                  { name: "Dr. Joy Kafomdi Okwuogor", role: "LOC Secretary", phone: "+2347063891945" },
                ].map((c) => (
                  <div key={c.phone} className="flex items-center gap-2 text-[14.4px] text-white/60">
                    <Phone className="w-3 h-3 shrink-0" />
                    <a href={`tel:${c.phone}`} className="hover:text-gold transition-colors">{c.phone}</a>
                    <span className="text-white/30">·</span>
                    <span>{c.name}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/40">{c.role}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/themes"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-navy font-semibold rounded-full hover:bg-gold/90 transition-all text-[21px]"
                  aria-label="Submit Abstract"
                >
                  Submit Abstract
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="lg:col-span-4"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10" role="complementary" aria-label="Key Highlights">
              <h3 className="text-white font-heading font-semibold text-sm mb-4">Key Highlights</h3>
              <div className="space-y-3">
                {[
                  { val: "18", label: "Thematic Tracks" },
                  { val: "₦10M", label: "Hackathon Prize Pool" },
                  { val: "48hr", label: "Student Hackathon" },
                  { val: "5", label: "Sponsorship Tiers" },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline gap-3">
                    <span className="text-gold font-display font-extrabold text-2xl">{item.val}</span>
                    <span className="text-white/50 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
