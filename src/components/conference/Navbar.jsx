import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/lib/ThemeProvider";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Themes", href: "/themes" },
  { label: "Programme", href: "/programme" },
  { label: "Hackathon", href: "/hackathon" },
  { label: "Exhibition", href: "/exhibition" },
  { label: "Sponsorship", href: "/sponsorship" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <div className="fixed top-3 right-3 md:right-6 z-[60]">
        <img src={import.meta.env.BASE_URL + "logo-CEMRI.jpg"} alt="CEMRI" className="h-10 md:h-12 w-auto object-contain drop-shadow-lg" loading="lazy" />
      </div>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`} role="navigation" aria-label="Main navigation">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 pr-14 md:pr-20">
          <div className="hidden lg:flex flex-col h-16 justify-center">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Home">
                <img src={import.meta.env.BASE_URL + "logo-uniabuja.png"} alt="University of Abuja" className="h-10 md:h-12 w-auto object-contain" loading="lazy" />
                <span className="hidden xl:block font-heading font-bold text-base text-foreground">TASS Nigeria 2026</span>
              </Link>
              <div className="flex items-center gap-5">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={`text-sm font-medium transition-colors hover:text-accent whitespace-nowrap focus-visible:outline-none focus-visible:text-accent ${
                      location.pathname === l.href ? "text-accent" : "text-muted-foreground"
                    }`}
                    aria-current={location.pathname === l.href ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={toggle}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-foreground"
                  aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex lg:hidden items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2" aria-label="Home">
              <img src={import.meta.env.BASE_URL + "logo-uniabuja.png"} alt="University of Abuja" className="h-10 w-auto object-contain" loading="lazy" />
              <span className="font-heading font-bold text-foreground text-sm">TASS Nigeria 2026</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={toggle}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-foreground"
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center px-10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={l.href}
                    className={`block py-3 text-3xl font-display font-bold transition-colors focus-visible:outline-none focus-visible:text-accent ${
                      location.pathname === l.href ? "text-accent" : "text-foreground hover:text-accent"
                    }`}
                    aria-current={location.pathname === l.href ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
