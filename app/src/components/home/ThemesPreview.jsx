import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Atom, Users, BookOpen, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../conference/SectionHeading";

const tracks = [
  { icon: Atom, title: "STEM & Applied Science", desc: "Natural Sciences, Engineering, Technology, and Applied Research Frontiers.", color: "bg-green-50 border-green-200 hover:border-green-400", iconBg: "bg-green-100", iconColor: "text-green-700" },
  { icon: Users, title: "Social Sciences", desc: "Sociology, Economics, Political Science, and Public Policy Research.", color: "bg-blue-50 border-blue-200 hover:border-blue-400", iconBg: "bg-blue-100", iconColor: "text-blue-700" },
  { icon: BookOpen, title: "Humanities", desc: "Arts, Culture, Languages, Philosophy, and Historical Research.", color: "bg-yellow-50 border-yellow-200 hover:border-yellow-400", iconBg: "bg-yellow-100", iconColor: "text-yellow-700" },
  { icon: Briefcase, title: "Management Sciences", desc: "Business, Entrepreneurship, Innovation Management, and Organizational Studies.", color: "bg-orange-50 border-orange-200 hover:border-orange-400", iconBg: "bg-orange-100", iconColor: "text-orange-700" },
];

export default function ThemesPreview() {
  return (
    <section className="py-10 md:py-10 bg-muted/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-10">
          <SectionHeading
            label="18 Thematic Tracks"
            title="Conference Sub-Themes"
            description="Spanning natural sciences, engineering, social sciences, humanities, and policy studies."
          />
          <Link
            to="/themes"
            className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all shrink-0"
          >
            View all tracks <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track, i) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to="/themes"
                className={`group block rounded-2xl pl-4 pr-6 pt-4 pb-4 md:pl-6 md:pr-8 md:pt-5 md:pb-5 border transition-all duration-300 h-full hover:shadow-lg ${track.color}`}
              >
                <div className="flex items-start gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${track.iconBg}`}>
                    <track.icon className={`w-4 h-4 ${track.iconColor}`} />
                  </div>
                  <div>
                    <h3 className={`font-heading font-bold text-lg leading-tight text-foreground dark:text-gold mb-2`}>
                      {track.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {track.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}