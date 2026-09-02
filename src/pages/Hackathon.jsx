import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Trophy, Clock, Users, Zap, Code, Shield, Leaf, Heart, GraduationCap, X, Award, Calendar, Lightbulb, TrendingUp, Target, Presentation, Cloud, Wifi, Handshake } from "lucide-react";

const HACKATHON_IMG = "/hackathon.jpg";
const GAS_URL = "https://script.google.com/macros/s/AKfycbzBGsDjJMDfdyhubNBXk0EE5U2HY_FJg55mcPUTkGmkYuy3UGgkDQv6Em7Pr2q2gUU3/exec";

const hackathonTracks = [
  { icon: Zap, title: "EdTech & Digital Learning", desc: "Solutions for accessible, quality education across Africa.", bg: "bg-yellow-50 border-yellow-200", iconColor: "text-yellow-700" },
  { icon: Heart, title: "HealthTech & Telemedicine", desc: "Digital health innovations for underserved communities.", bg: "bg-red-50 border-red-200", iconColor: "text-red-600" },
  { icon: Leaf, title: "AgriTech & Food Security", desc: "Technology for sustainable agriculture and nutrition.", bg: "bg-green-50 border-green-200", iconColor: "text-green-700" },
  { icon: Shield, title: "GovTech & Civic Innovation", desc: "Platforms for transparency, governance, and citizen engagement.", bg: "bg-blue-50 border-blue-200", iconColor: "text-blue-700" },
  { icon: Code, title: "FinTech & Financial Inclusion", desc: "Solutions bridging the financial services gap.", bg: "bg-purple-50 border-purple-200", iconColor: "text-purple-700" },
  { icon: GraduationCap, title: "Open Innovation", desc: "Any technology solution addressing SDGs in Africa.", bg: "bg-orange-50 border-orange-200", iconColor: "text-orange-700" },
];

const prizes = [
  { place: "1st Place", amount: "₦5,000,000", desc: "Grand Prize + Incubation Support" },
  { place: "2nd Place", amount: "₦3,000,000", desc: "Runner-up Prize + Mentorship" },
  { place: "3rd Place", amount: "₦2,000,000", desc: "Bronze Prize + Recognition" },
];

const stats = [
  { icon: Trophy, value: "₦10M", label: "Prize Pool" },
  { icon: Clock, value: "16", label: "Hours of Building" },
  { icon: Zap, value: String(hackathonTracks.length), label: "Focused Tracks" },
  { icon: Award, value: "3", label: "Prize Categories" },
];

const timeline = [
  {
    day: "Day 1",
    title: "Build",
    items: [
      { time: "10:00", title: "Check-in & Registration", desc: "Arrive, collect your badge, and settle into your space." },
      { time: "10:30", title: "Opening Ceremony", desc: "Welcome address, rules of engagement, and sponsor highlights." },
      { time: "11:00", title: "Challenges Revealed", desc: "Problem statements for every track are unveiled." },
      { time: "11:30", title: "Kickoff & Team Forming", desc: "Finalise your team and start building." },
      { time: "15:00", title: "Mentor Progress Reviews", desc: "Show your progress to mentors and refine your approach." },
      { time: "18:00", title: "Day 1 Close", desc: "Activities wind up for the day." },
    ],
  },
  {
    day: "Day 2",
    title: "Submit & Celebrate",
    items: [
      { time: "10:00", title: "Doors Open & Final Sprint", desc: "Pick up where you left off and finish your build." },
      { time: "12:00", title: "Submissions Close", desc: "Demos, repositories, and pitch decks are due." },
      { time: "13:00", title: "Demo Pitches", desc: "Present your solution to the judging panel." },
      { time: "15:00", title: "Judging Deliberation", desc: "Scores are consolidated and finalists ranked." },
      { time: "16:00", title: "Networking & Exhibition", desc: "Showcase your work and connect with attendees." },
      { time: "18:00", title: "Awards Ceremony & Close", desc: "Winners announced, prizes awarded, hackathon ends." },
    ],
  },
];

const criteria = [
  { icon: Lightbulb, title: "Innovation & Originality", weight: "25%", desc: "Fresh thinking and a creative approach to the problem." },
  { icon: TrendingUp, title: "Impact & Feasibility", weight: "25%", desc: "Real-world value and how deliverable the solution is." },
  { icon: Code, title: "Technical Quality", weight: "20%", desc: "Architecture, code quality, and how well the demo works." },
  { icon: Target, title: "Design & Usability", weight: "15%", desc: "Intuitive experience and clear solution design." },
  { icon: Presentation, title: "Pitch & Presentation", weight: "15%", desc: "Clarity and persuasiveness of the final demo." },
];

const resources = [
  { icon: Users, title: "Mentor Support", desc: "Guidance from industry, academia, and civil society throughout the build." },
  { icon: Cloud, title: "Datasets & APIs", desc: "Curated tools, open datasets, and resources to build with." },
  { icon: Wifi, title: "Workspace & Connectivity", desc: "A dedicated hacking space with power and reliable Wi-Fi." },
  { icon: Handshake, title: "Team Matching", desc: "Solo hackers are matched into teams based on skills before kickoff." },
];

export default function Hackathon() {
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
      {/* Hero */}
      <section className="relative py-10 md:py-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HACKATHON_IMG} alt="Student hackathon" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Two-Day Competitive Sprint"
            title="Student Hackathon"
            description="Open to undergraduate and postgraduate students at Nigerian universities. Teams work with mentors from industry, academia, and civil society."
            light
          />
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: Trophy, text: "₦10M Prize Pool" },
              { icon: Clock, text: "10am - 6pm Daily" },
              { icon: Users, text: "Mentors from Industry & Academia" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/70 text-sm">
                <item.icon className="w-4 h-4 text-accent" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-12" style={{ backgroundColor: "#0a5c36" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <s.icon className="w-8 h-8 mx-auto mb-3" style={{ color: "#f4c430" }} />
              <p className="font-display font-extrabold text-3xl md:text-4xl text-white">{s.value}</p>
              <p className="text-sm text-white/70 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="py-10 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading label="Hackathon Tracks" title="Build Solutions That Matter" align="center" className="mb-4 md:mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {hackathonTracks.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl p-3 md:p-4 border hover:shadow-md transition-all duration-300 ${t.bg}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <t.icon className={`w-7 h-7 shrink-0 ${t.iconColor}`} />
                  <h3 className="font-heading font-bold text-xl dark:text-black">{t.title}</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes */}
      <section className="py-10 md:py-10 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading label="Prize Structure" title="₦10 Million Prize Pool" align="center" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {prizes.map((p, i) => (
              <motion.div
                key={p.place}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`text-center rounded-2xl p-8 border shadow-xl ${
                  i === 0 ? "bg-amber-500 text-white border-amber-500 scale-105" :
                  i === 1 ? "bg-sky-500 text-white border-sky-500" :
                  "bg-emerald-500 text-white border-emerald-500"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-white/70">
                  {p.place}
                </p>
                <p className="font-display font-extrabold text-3xl mb-1">{p.amount}</p>
                <p className="text-sm text-white/70">{p.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Teams must include at least one female member to be eligible for awards.
          </p>
        </div>
      </section>

      {/* Event Timeline */}
      <section className="py-10 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Event Timeline"
            title="The Two-Day Journey"
            description="From kickoff to awards — here's how the weekend unfolds."
            align="center"
            className="mb-4 md:mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {timeline.map((col, i) => (
              <motion.div
                key={col.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border shadow-sm overflow-hidden bg-card"
              >
                <div className="flex items-center gap-2 px-5 py-3 border-b border-border" style={{ backgroundColor: "#0a5c36" }}>
                  <Calendar className="w-4 h-4" style={{ color: "#f4c430" }} />
                  <h3 className="font-heading font-bold text-lg" style={{ color: "#f4c430" }}>
                    {col.day} — {col.title}
                  </h3>
                </div>
                <ul className="p-5 space-y-4">
                  {col.items.map((item) => (
                    <li key={item.time} className="flex gap-3">
                      <span className="shrink-0 w-16 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-1 py-1 text-center h-fit">
                        {item.time}
                      </span>
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="py-10 md:py-10 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Judging Criteria"
            title="How Projects Are Evaluated"
            description="Submissions are scored by an independent panel of judges across five weighted criteria."
            align="center"
            className="mb-4 md:mb-6"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {criteria.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-4 text-center shadow-sm"
              >
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "#0a5c36" }}>
                  <c.icon className="w-6 h-6" style={{ color: "#f4c430" }} />
                </div>
                <p className="font-display font-extrabold text-2xl" style={{ color: "#0a5c36" }}>{c.weight}</p>
                <h3 className="font-heading font-bold text-base mt-1 mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-10 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="What You Get"
            title="Everything You Need to Build"
            description="Resources, support, and tools so you can focus on your solution."
            align="center"
            className="mb-4 md:mb-6"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {resources.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border p-4 bg-card shadow-sm"
              >
                <r.icon className="w-8 h-8 mb-3" style={{ color: "#0a5c36" }} />
                <h3 className="font-heading font-bold text-lg mb-1">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Top teams advance to incubation support and mentorship with our partners after the conference.
          </p>
        </div>
      </section>

      {/* Register for the Hackathon CTA */}
      <section id="register" className="py-10 md:py-10" style={{ backgroundColor: "#0a5c36" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <h2
            className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4"
            style={{ color: "#f4c430" }}
          >
            Register for the Hackathon
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Ready to build solutions that matter at TASS Nigeria 2026? Register your team or organisation below.
          </p>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-full shadow-lg transition-all hover:scale-105 text-xl md:text-2xl"
            style={{ backgroundColor: "#f4c430", color: "#0a5c36" }}
          >
            Click to Register for the Hackathon
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
                TASS Nigeria 2026 — Hackathon Registration
              </h3>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <iframe
              ref={iframeRef}
              src={GAS_URL}
              className="flex-1 w-full border-0"
              title="Hackathon Registration Form"
            />
          </div>
        </div>
      )}
    </div>
  );
}