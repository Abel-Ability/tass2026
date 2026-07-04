import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, ArrowUp, Twitter, Facebook, Linkedin, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const footerLinks = [
  { title: "Conference", links: [
    { label: "About TASS", href: "/about" },
    { label: "Sub-Themes", href: "/themes" },
    { label: "Programme", href: "/programme" },
    { label: "Registration", href: "/register" },
  ]},
  { title: "Engage", links: [
    { label: "Hackathon", href: "/hackathon" },
    { label: "Exhibition", href: "/exhibition" },
    { label: "Sponsorship", href: "/sponsorship" },
    { label: "Contact", href: "/contact" },
  ]},
  { title: "Resources", links: [
    { label: "Call for Papers", href: "/themes" },
    { label: "Submission Guidelines", href: "/themes" },
    { label: "Venue Information", href: "/about" },
  ]},
];

const contacts = [
  { name: "Engr. (Dr) Duabari Silas Aziaka", role: "IOC Chairman", phone: "+447442568824" },
  { name: "Prof. Patricia Awa Taiwo", role: "LOC Chairperson", phone: "+2348034820646" },
  { name: "Dr. Lekpa Kingdom David", role: "CEMRI President", phone: "+2348035607640" },
  { name: "Dr. Joy Kafomdi Okwuogori", role: "LOC Secretary", phone: "+2347063891945" },
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy text-white relative">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gold text-navy flex items-center justify-center shadow-lg hover:bg-gold/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-2xl mb-4">TASS Nigeria 2026</h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
              Technology. Arts. Science. Society. Solutions.
              <br />
              International Conference on Multidisciplinary Research, Innovation & Sustainable Development.
            </p>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>University of Abuja, FCT, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <a href="mailto:tass2026@uniabuja.edu.ng" className="hover:text-gold transition-colors">tass2026@uniabuja.edu.ng</a>
              </div>
              <div className="space-y-2">
                {contacts.map((c) => (
                  <div key={c.phone} className="flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <a href={`tel:${c.phone}`} className="hover:text-gold transition-colors">{c.phone}</a>
                      <span className="text-white/50 text-xs ml-1">· {c.name} ({c.role})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-colors" aria-label="Twitter"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-colors" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/20 transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-5 text-white/50">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-sm text-white/70 hover:text-gold transition-colors inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:text-gold"
                    >
                      {l.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">CMT Acknowledgment</h4>
          <p className="text-xs text-white/50 leading-relaxed max-w-3xl">
            The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            &trade; TASS NIGERIA 2026. All Rights Reserved.
          </p>
          <p className="text-xs text-white/50">
            09–12 November 2026, Abuja, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
