import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import SectionHeading from "@/components/conference/SectionHeading";

const categories = ["All", "University of Abuja", "Abuja City"];

const photos = [
  // University of Abuja — uploaded images
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/0c7eb669f_WhatsAppImage2026-05-23at2012201.jpg", caption: "University of Abuja Campus Grounds", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/72cb8d68d_WhatsAppImage2026-05-23at2012208.jpg", caption: "University of Abuja Main Gate", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/dde67b78d_WhatsAppImage2026-05-23at201220.jpeg", caption: "Campus Gardens & Open Spaces", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/068abd991_WhatsAppImage2026-05-23at2012211.jpg", caption: "Academic Building — University of Abuja", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/4acdd2d10_WhatsAppImage2026-05-23at201221.jpg", caption: "University of Abuja — Second Gate", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/041ef567a_WhatsAppImage2026-05-23at2012202.jpg", caption: "Students on Campus Grounds", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/33a19b90b_WhatsAppImage2026-05-23at2012203.jpeg", caption: "University of Abuja Sign", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/b4eb53a9f_WhatsAppImage2026-05-23at2012204.jpg", caption: "Graduation Ceremony — UniAbuja", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/5e714cfb1_WhatsAppImage2026-05-23at2012205.jpg", caption: "Campus Avenue & Flame Trees", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/38450dd67_WhatsAppImage2026-05-23at2012206.jpg", caption: "University of Abuja Sports Stadium", category: "University of Abuja" },
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/71f0078aa_WhatsAppImage2026-05-23at2012207.jpg", caption: "Convocation Procession — UniAbuja", category: "University of Abuja" },
  // Abuja City
  { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/fee050250_WhatsAppImage2026-05-23at2012212.jpg", caption: "Zuma Rock — 700m Monolith, Abuja", category: "Abuja City" },
];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);

  return (
    <div className="pt-10">
      {/* Hero */}
      <section className="relative py-10 md:py-10 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/72cb8d68d_WhatsAppImage2026-05-23at2012208.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Photo Gallery"
            title="Beautiful Abuja & University of Abuja"
            description="Discover the stunning landscapes, iconic landmarks, and vibrant campus life that await delegates at TASS Nigeria 2026."
            light
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-10 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex gap-3 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  active === cat
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-muted-foreground border-border hover:border-green-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="relative group rounded-xl overflow-hidden cursor-pointer aspect-square"
                  onClick={() => setLightbox(photo)}
                >
                  <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div className="flex items-start gap-1">
                      <MapPin className="w-3 h-3 text-yellow-400 mt-0.5 shrink-0" />
                      <p className="text-white text-xs leading-snug">{photo.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.caption} className="w-full rounded-2xl max-h-[80vh] object-contain" />
              <div className="mt-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <p className="text-white text-sm">{lightbox.caption}</p>
                <span className="ml-auto text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">{lightbox.category}</span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-xl hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-800" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}