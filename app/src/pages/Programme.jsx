import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Calendar, Clock, Mic, Users, Coffee } from "lucide-react";

const days = [
  {
    day: "Day 1",
    date: "Monday, 09 November 2026",
    events: [
      { time: "08:00 – 09:00", title: "Registration & Welcome", icon: Users, type: "general" },
      { time: "09:00 – 10:30", title: "Opening Ceremony & Keynote Address", icon: Mic, type: "plenary" },
      { time: "10:30 – 11:00", title: "Networking Break & Exhibition Opening", icon: Coffee, type: "break" },
      { time: "11:00 – 13:00", title: "Parallel Track Sessions (STEM & Social Sciences)", icon: Users, type: "session" },
      { time: "13:00 – 14:00", title: "Lunch Break", icon: Coffee, type: "break" },
      { time: "14:00 – 16:00", title: "Hackathon Kick-off & Team Formation", icon: Users, type: "hackathon" },
      { time: "16:00 – 17:30", title: "Policy Dialogue Forum: Opening Panel", icon: Mic, type: "plenary" },
    ]
  },
  {
    day: "Day 2",
    date: "Tuesday, 10 November 2026",
    events: [
      { time: "09:00 – 10:30", title: "Plenary Session: Africa's Innovation Ecosystem", icon: Mic, type: "plenary" },
      { time: "10:30 – 11:00", title: "Tea Break & Exhibition", icon: Coffee, type: "break" },
      { time: "11:00 – 13:00", title: "Parallel Track Sessions (Humanities & Management)", icon: Users, type: "session" },
      { time: "13:00 – 14:00", title: "Lunch Break", icon: Coffee, type: "break" },
      { time: "14:00 – 16:00", title: "Paper Presentations & Roundtables", icon: Users, type: "session" },
      { time: "16:00 – 17:00", title: "Hackathon Progress Reviews", icon: Users, type: "hackathon" },
      { time: "19:00 – 21:00", title: "Gala Dinner & Networking Event", icon: Users, type: "general" },
    ]
  },
  {
    day: "Day 3",
    date: "Wednesday, 11 November 2026",
    events: [
      { time: "09:00 – 10:30", title: "Keynote: Sustainable Development & Technology", icon: Mic, type: "plenary" },
      { time: "10:30 – 11:00", title: "Networking Break", icon: Coffee, type: "break" },
      { time: "11:00 – 13:00", title: "Cross-Disciplinary Panel Discussions", icon: Users, type: "session" },
      { time: "13:00 – 14:00", title: "Lunch Break", icon: Coffee, type: "break" },
      { time: "14:00 – 16:00", title: "Hackathon Demo Day & Public Presentations", icon: Users, type: "hackathon" },
      { time: "16:00 – 17:30", title: "Awards Ceremony: Hackathon & Best Papers", icon: Mic, type: "plenary" },
    ]
  },
  {
    day: "Day 4",
    date: "Thursday, 12 November 2026",
    events: [
      { time: "09:00 – 10:30", title: "Plenary: Future Directions & Policy Recommendations", icon: Mic, type: "plenary" },
      { time: "10:30 – 11:00", title: "Tea Break", icon: Coffee, type: "break" },
      { time: "11:00 – 13:00", title: "Final Track Sessions & Workshops", icon: Users, type: "session" },
      { time: "13:00 – 14:00", title: "Lunch Break", icon: Coffee, type: "break" },
      { time: "14:00 – 15:30", title: "Closing Ceremony & Communiqué", icon: Mic, type: "plenary" },
      { time: "15:30 – 16:30", title: "Exhibition Closing & Farewell Networking", icon: Users, type: "general" },
    ]
  }
];

const typeColors = {
  plenary: "border-accent text-accent bg-accent/5",
  session: "border-secondary text-secondary bg-secondary/5",
  hackathon: "border-chart-4 text-foreground bg-chart-4/10",
  break: "border-border text-muted-foreground bg-muted/30",
  general: "border-border text-foreground bg-card",
};

export default function Programme() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="pt-10">
      <section className="py-10 md:py-10 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Four-Day Programme"
            title="Conference Schedule"
            description="All times in West Africa Time (WAT, UTC+1). Plenary sessions are live-streamed."
            align="center"
          />
        </div>
      </section>

      <section className="py-10 md:py-10">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10">
          {/* Day Tabs */}
          <div className="flex gap-2 mb-12 overflow-x-auto scrollbar-hide pb-2">
            {days.map((d, i) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(i)}
                className={`px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  activeDay === i
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {d.day}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-5 h-5 text-accent" />
                <h3 className="font-heading font-bold text-xl">{days[activeDay].date}</h3>
              </div>

              <div className="space-y-3">
                {days[activeDay].events.map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-start gap-4 p-4 rounded-xl border-l-4 ${typeColors[event.type]}`}
                  >
                    <div className="flex items-center gap-2 text-xs font-mono shrink-0 w-28 pt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </div>
                    <div className="flex items-start gap-3">
                      <event.icon className="w-4 h-4 mt-0.5 shrink-0" />
                      <span className="font-heading font-semibold text-sm">{event.title}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}