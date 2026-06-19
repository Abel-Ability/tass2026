import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Themes", href: "/themes" },
  { label: "Programme", href: "/programme" },
  { label: "Hackathon", href: "/hackathon" },
  { label: "Exhibition", href: "/exhibition" },
  { label: "Sponsorship", href: "/sponsorship" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/14974f33a_logo_200x64.jpeg"
              alt="TASS Nigeria 2026"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === l.href ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-full hover:bg-green-700 transition-all"
            >
              Register Now <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
                    className="block py-3 text-3xl font-display font-bold text-foreground hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <Link
              to="/register"
              className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full w-fit"
            >
              Register Now <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}