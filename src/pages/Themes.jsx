import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Atom, Users, BookOpen, Briefcase, FlaskConical, Cpu, Leaf, Heart, Scale, Landmark, PenTool, Globe, TrendingUp, GraduationCap, Handshake, Building, Lightbulb, X } from "lucide-react";

const GAS_URL = "https://script.google.com/macros/s/AKfycbxozlkqEgBEJ0ZObCFOrqSwxFxcbYDXeFGLBmkud1AihZ-e9N2RVofzSJizjr5_G2yD0A/exec?embed=true";

const categories = [
  {
    name: "STEM & Applied Science",
    color: "bg-secondary/10 text-secondary border-secondary/20",
    tracks: [
      { icon: Atom, title: "Physics, Chemistry & Materials Science" },
      { icon: FlaskConical, title: "Biological & Environmental Sciences" },
      { icon: Cpu, title: "Computer Science, AI & Data Analytics" },
      { icon: Leaf, title: "Agriculture, Food Security & Nutrition" },
      { icon: Heart, title: "Health Sciences & Public Health" },
      { icon: Lightbulb, title: "Oil and Gas Innovation" },
    ]
  },
  {
    name: "Social Sciences",
    color: "bg-accent/10 text-accent border-accent/20",
    tracks: [
      { icon: Scale, title: "Law, Governance & Human Rights" },
      { icon: TrendingUp, title: "Economics, Finance & Development" },
      { icon: Users, title: "Sociology, Migration & Urbanisation" },
      { icon: Landmark, title: "Political Science & International Relations" },
      { icon: GraduationCap, title: "Education, Pedagogy & Curriculum Development" },
    ]
  },
  {
    name: "Humanities",
    color: "bg-chart-4/20 text-foreground border-chart-4/30",
    tracks: [
      { icon: PenTool, title: "Literature, Languages & Linguistics" },
      { icon: Globe, title: "History, Philosophy & Cultural Studies" },
      { icon: BookOpen, title: "Media, Communication & Journalism" },
    ]
  },
  {
    name: "Management Sciences",
    color: "bg-primary/5 text-foreground border-primary/10",
    tracks: [
      { icon: Briefcase, title: "Business Administration & Strategic Management" },
      { icon: Handshake, title: "Entrepreneurship & Innovation Management" },
      { icon: Building, title: "Public Administration & Policy Analysis" },
      { icon: Lightbulb, title: "Project Management & Operations Research" },
    ]
  }
];

export default function Themes() {
  const [modalOpen, setModalOpen] = useState(false);
  const iframeRef = useRef(null);

  function openModal() {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setModalOpen(false);
    document.body.style.overflow = "";
    if (iframeRef.current) {
      iframeRef.current.src = GAS_URL;
    }
  }

  return (
    <div className="pt-10">
      <section className="py-10 md:py-10 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Call for Papers"
            title="Advancing Global Innovation and Sustainable Development"
            description="Each theme hosts keynotes, peer-reviewed paper presentations, and structured roundtables spanning natural sciences, engineering, social sciences, humanities, and policy studies."
            align="center"
          />
        </div>
      </section>

      <section className="py-10 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Main Theme Banner */}
          <div className="mb-14 text-center bg-primary/5 border border-primary/10 rounded-2xl py-8 px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">Main Theme</p>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-foreground">
              Advancing Global Innovation and Sustainable Development
            </h2>
          </div>

          <div className="space-y-10">
            {categories.map((cat, ci) => (
              <div key={cat.name}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-px bg-accent" />
                  <h3 className="font-heading font-bold text-xl">Theme: {cat.name}</h3>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 ml-11">Sub-themes</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.tracks.map((track, ti) => (
                    <motion.div
                      key={track.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ti * 0.06, duration: 0.4 }}
                      className={`rounded-xl border p-5 ${cat.color} hover:shadow-md transition-all duration-300`}
                    >
                      <div className="flex items-start gap-3">
                        <track.icon className="w-5 h-5 mt-0.5 shrink-0" />
                        <span className="font-heading font-semibold text-sm">{track.title}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Info */}
      <section className="py-10 md:py-10 bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Submissions"
            title="Abstract Submission Guidelines"
            description="Submit your abstract through our online portal. All submissions undergo double-blind peer review."
            light
            align="center"
            className="mb-4 md:mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { step: "01", title: "Select Your Theme", desc: "Choose one of the 18 thematic tracks that best fits your research." },
              { step: "02", title: "Upload Abstract", desc: "Submit your abstract (max 300 words) through the Microsoft CMT online portal." },
              { step: "03", title: "Confirmation", desc: "Receive peer-review feedback and acceptance notification." },
            ].map((s) => (
              <div key={s.step} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-3 md:p-4">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-4xl text-accent shrink-0">{s.step}</span>
                  <h4 className="font-heading font-bold text-xl text-primary-foreground">{s.title}</h4>
                </div>
                <p className="text-base text-primary-foreground/50 leading-relaxed mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Your Abstract CTA */}
      <section id="submit-abstract" className="py-10 md:py-10" style={{ backgroundColor: "#0a5c36" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <h2
            className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4"
            style={{ color: "#f4c430" }}
          >
            Submit Your Abstract
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Ready to present your research at TASS Nigeria 2026? Click the button below to submit your abstract.
          </p>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-full shadow-lg transition-all hover:scale-105 text-xl md:text-2xl"
            style={{ backgroundColor: "#f4c430", color: "#0a5c36" }}
          >
            Click to Submit Your Abstract
          </button>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
          <div className="relative bg-card w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[85vh] max-md:h-[95vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border" style={{ backgroundColor: "#0a5c36" }}>
              <h3 className="font-heading font-bold text-base md:text-lg" style={{ color: "#f4c430" }}>
                TASS Nigeria 2026 — Abstract Submission
              </h3>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <iframe
              ref={iframeRef}
              src={GAS_URL}
              className="flex-1 w-full border-0"
              title="Abstract Submission Form"
            />
          </div>
        </div>
      )}
    </div>
  );
}
