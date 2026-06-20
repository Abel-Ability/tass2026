import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import SectionHeading from "@/components/conference/SectionHeading";

const categories = ["All", "University of Abuja", "Abuja City"];

const photos = [
  // UniAbuja
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", caption: "University of Abuja Main Campus", category: "University of Abuja" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", caption: "Campus Library & Academic Block", category: "University of Abuja" },
  { src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80", caption: "Research & Innovation Hub", category: "University of Abuja" },
  { src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80", caption: "Lecture Hall — Engineering Faculty", category: "University of Abuja" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", caption: "Student Centre", category: "University of Abuja" },
  { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80", caption: "Campus Green & Gardens", category: "University of Abuja" },
  // Abuja City
  { src: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&q=80", caption: "Aso Rock — Abuja's Iconic Landmark", category: "Abuja City" },
  { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80", caption: "Nigerian National Mosque, Abuja", category: "Abuja City" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", caption: "Millennium Tower & Cultural Centre", category: "Abuja City" },
  { src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80", caption: "Abuja Central Business District", category: "Abuja City" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", caption: "Zuma Rock — 700m Monolith", category: "Abuja City" },
  { src: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80", caption: "Sunset over FCT", category: "Abuja City" },
  { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80", caption: "Wuse Market — Cultural Hub", category: "Abuja City" },
  { src: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80", caption: "Abuja City Park & Recreation", category: "Abuja City" },
];

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1600&q=80" alt="" className="w-full h-full object-cover" />
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
      <section className="py-12 md:py-16">
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