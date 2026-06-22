import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Atom, Users, BookOpen, Briefcase, FlaskConical, Cpu, Leaf, Heart, Scale, Landmark, PenTool, Globe, TrendingUp, GraduationCap, Handshake, Building, Lightbulb } from "lucide-react";

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
  return (
    <div className="pt-20">
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Call for Papers"
            title="4 Themes & Sub-themes"
            description="Each theme hosts keynotes, peer-reviewed paper presentations, and structured roundtables spanning natural sciences, engineering, social sciences, humanities, and policy studies."
            align="center"
          />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 space-y-16">
          {categories.map((cat, ci) => (
            <div key={cat.name}>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-px bg-accent" />
                <h3 className="font-heading font-bold text-xl">{cat.name}</h3>
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
      </section>

      {/* Submission Info */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Submissions"
            title="Abstract Submission Guidelines"
            description="Submit your abstract through our online portal. All submissions undergo double-blind peer review."
            light
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { step: "01", title: "Select Your Theme", desc: "Choose one of the 17 thematic tracks that best fits your research." },
              { step: "02", title: "Upload Abstract", desc: "Submit your abstract (max 300 words) through the Microsoft CMT online portal." },
              { step: "03", title: "Confirmation", desc: "Receive peer-review feedback and acceptance notification." },
            ].map((s) => (
              <div key={s.step} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6">
                <span className="font-display font-extrabold text-3xl text-accent">{s.step}</span>
                <h4 className="font-heading font-bold text-lg mt-3 mb-2 text-primary-foreground">{s.title}</h4>
                <p className="text-sm text-primary-foreground/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acknowledgement */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-accent" />
              <h3 className="font-heading font-bold text-lg">Acknowledgement</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed border-l-4 border-accent/30 pl-5">
              The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}