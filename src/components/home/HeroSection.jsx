import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const HERO_IMG = "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/b3bb7586e_generated_03931515.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="University of Abuja campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-[8%] w-px h-full bg-white/5" />
      <div className="absolute top-0 left-[25%] w-px h-full bg-white/5" />
      <div className="absolute top-0 right-[15%] w-px h-full bg-white/5" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block w-8 h-px bg-yellow-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  <span className="text-green-400">TASS NIG</span><span className="text-red-400">ERIA 2026</span>
                </span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight mb-6">
                <span className="text-green-400">Technology.</span>
                <br />
                <span className="text-yellow-400">Arts.</span> Science.
                <br />
                <span className="text-orange-400">Society.</span>
              </h1>

              <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-8">
                A four-day international conference bringing together researchers, policymakers, industry leaders, and students across 17 thematic tracks.
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

              {/* Key Contacts */}
              <div className="mb-8 space-y-1.5">
                {[
                  { name: "Dr. Duabari Silas Aziaka", role: "IOC Chairman", phone: "+447856261406" },
                  { name: "Prof. Patricia Taiwo", role: "LOC Chairperson", phone: "+2348034820646" },
                  { name: "Dr. Lekpa Kingdom David", role: "CEMRI President", phone: "+2348035607640" },
                ].map((c) => (
                  <div key={c.phone} className="flex items-center gap-2 text-xs text-white/60">
                    <Phone className="w-3 h-3 shrink-0" />
                    <a href={`tel:${c.phone}`} className="hover:text-accent transition-colors">{c.phone}</a>
                    <span className="text-white/30">·</span>
                    <span>{c.name}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/40">{c.role}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all text-sm"
                >
                  Register Now <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/themes"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all text-sm"
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
            className="lg:col-span-4 hidden lg:block"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-heading font-semibold text-sm mb-4">Key Highlights</h3>
              <div className="space-y-3">
                {[
                  { val: "17", label: "Thematic Tracks" },
                  { val: "₦10M", label: "Hackathon Prize Pool" },
                  { val: "48hr", label: "Student Hackathon" },
                  { val: "5", label: "Sponsorship Tiers" },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline gap-3">
                    <span className="text-accent font-display font-extrabold text-2xl">{item.val}</span>
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