import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const speakers = [
  {
    name: "Senator (Dr.) George Akume, CON",
    role: "Special Guest of Honour",
    image: "/Photo_Senator_Geroge_Akume.jpg",
    description: "Secretary to the Government of the Federation, Federal Republic of Nigeria",
  },
  {
    name: "Prof. Feryel Ouerghi Sebai",
    role: "Keynote Speaker I",
    image: "/Photo_Feryel.jpg",
    description: "Former Minister of Economy & Planning, Tunisia",
  },
  {
    name: "Emeritus Prof. Steven Timipa Odi-Owei",
    role: "Keynote Speaker II",
    image: "/Photo_Odi.jpeg",
    description: "FNSE, FAAS, FNAEng",
  },
];

export default function KeynoteSpeakersPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % speakers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + speakers.length) % speakers.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % speakers.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-navy via-navy/95 to-navy-light overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">
            Meet Our Speakers
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Keynote <span className="text-gold">Speakers</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Previous speaker"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Next speaker"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Speaker Card */}
          <div className="relative h-[400px] md:h-[450px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute w-full"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                  {/* Speaker Photo */}
                  <motion.div
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-gold/30">
                      <img
                        src={speakers[currentIndex].image}
                        alt={speakers[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-3 rounded-2xl border-2 border-gold/20 animate-pulse" />
                  </motion.div>

                  {/* Speaker Info */}
                  <div className="text-center md:text-left">
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold/80 mb-2"
                    >
                      {speakers[currentIndex].role}
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl text-white mb-3"
                    >
                      {speakers[currentIndex].name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-white/60 text-base md:text-lg"
                    >
                      {speakers[currentIndex].description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {speakers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gold w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to speaker ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
