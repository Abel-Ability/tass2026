import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Globe, Award, Lightbulb, Users, BookOpen, Handshake, Mic2, Building2, FlaskConical, Landmark, ChevronDown } from "lucide-react";

const SCHOLARS_IMG = "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/c5692d51c_generated_0a16fbea.png";

const features = [
  { icon: Globe, title: "International Platform", desc: "Bringing together leading researchers, innovators, and policymakers from across Africa and around the world.", bg: "bg-green-50", iconBg: "bg-green-100", iconColor: "text-green-700" },
  { icon: Award, title: "Peer-Reviewed Research", desc: "Rigorous academic paper presentations across 17 thematic tracks with structured roundtables.", bg: "bg-yellow-50", iconBg: "bg-yellow-100", iconColor: "text-yellow-700" },
  { icon: Lightbulb, title: "Innovation Exhibition", desc: "A curated technology and innovation exhibition showcasing cutting-edge solutions.", bg: "bg-orange-50", iconBg: "bg-orange-100", iconColor: "text-orange-700" },
  { icon: Users, title: "Policy Dialogue Forum", desc: "A dedicated forum where scientific advancements are examined within broader societal and policy contexts.", bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-700" },
  { icon: BookOpen, title: "Cross-Disciplinary", desc: "Sessions structured to foster interaction between technical research, social inquiry, and ethical reflection.", bg: "bg-purple-50", iconBg: "bg-purple-100", iconColor: "text-purple-700" },
  { icon: Handshake, title: "Industry Partnerships", desc: "Creating a dynamic environment for knowledge exchange between academia and industry.", bg: "bg-teal-50", iconBg: "bg-teal-100", iconColor: "text-teal-700" },
];

const partners = [
  {
    icon: FlaskConical, label: "Partnership Institutions", bg: "bg-purple-50", iconBg: "bg-purple-100", iconColor: "text-purple-700",
    logos: [
      { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/e325559fb_1000509502.png", name: "21st Century Open University" },
    ]
  },
  {
    icon: Building2, label: "Partnership Industry", bg: "bg-teal-50", iconBg: "bg-teal-100", iconColor: "text-teal-700",
    logos: [
      { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/ef8dff6b3_WhatsAppImage2026-06-22at134547.jpg", name: "ResTV — Research Television" },
      { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/910c524b8_WhatsAppImage2026-06-22at1345471.jpeg", name: "CEFPACS Consulting Limited" },
      { src: "https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/bf76fdfe6_WhatsAppImage2026-06-22at1345472.jpeg", name: "TripWinga" },
    ]
  },
  {
    icon: Landmark, label: "Partnership Government Body", bg: "bg-orange-50", iconBg: "bg-orange-100", iconColor: "text-orange-700",
    logos: []
  },
];

function PartnerAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="mt-6 space-y-4 max-w-3xl mx-auto">
      {partners.map((partner, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={partner.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`rounded-2xl border border-border overflow-hidden ${partner.bg}`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${partner.iconBg}`}>
                  <partner.icon className={`w-5 h-5 ${partner.iconColor}`} />
                </div>
                <span className="font-heading font-bold text-base">{partner.label}</span>
                <span className="text-xs text-muted-foreground">({partner.logos.length} partner{partner.logos.length !== 1 ? "s" : ""})</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="px-6 pb-6">
                {partner.logos.length > 0 ? (
                  <div className="flex flex-wrap gap-6">
                    {partner.logos.map((logo) => (
                      <div key={logo.name} className="flex flex-col items-center gap-2 w-28">
                        <img src={logo.src} alt={logo.name} className="h-16 w-full object-contain rounded-md" />
                        <p className="text-xs text-center text-muted-foreground font-medium leading-snug">{logo.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">To Be Announced</p>
                )}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-muted/50">
        <div className="absolute top-0 left-[10%] w-px h-full bg-border/50" />
        <div className="absolute top-0 right-[20%] w-px h-full bg-border/50" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="About TASS Nigeria 2026"
                title="Technology. Arts. Science. Society."
                description="TASS — Technology, Arts, Science, and Society — is an international multidisciplinary platform established to promote excellence in research, innovation, entrepreneurship, knowledge exchange, and sustainable development."
              />
              <p className="text-muted-foreground leading-relaxed">
                The conference programme integrates rigorous peer-reviewed academic research with practical industry applications. In addition to scholarly paper presentations, the event features a competitive student hackathon, a dedicated policy dialogue forum, and a curated innovation and technology exhibition.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img src={SCHOLARS_IMG} alt="Scholars in discussion" className="rounded-2xl w-full aspect-[4/3] object-cover shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Why TASS 2026"
            title="What Makes This Conference Unique"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg transition-all duration-300 ${f.bg}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${f.iconBg}`}>
                  <f.icon className={`w-5 h-5 ${f.iconColor}`} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Keynote Speakers & Special Guest */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Featured Speakers"
            title="Keynote Speakers & Special Guest of Honour"
            description="TASS Nigeria 2026 will feature distinguished academics, policymakers, and industry leaders as keynote speakers. Further details will be announced soon."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {[
              { role: "Special Guest of Honour", name: "To Be Announced", note: "A distinguished personality of national significance.", icon: Award, bg: "bg-yellow-50", iconBg: "bg-yellow-100", iconColor: "text-yellow-700" },
              { role: "Keynote Speaker I", name: "To Be Announced", note: "International academic leader in science & technology.", icon: Mic2, bg: "bg-green-50", iconBg: "bg-green-100", iconColor: "text-green-700" },
              { role: "Keynote Speaker II", name: "To Be Announced", note: "Renowned voice in social sciences & policy.", icon: Mic2, bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-700" },
            ].map((speaker, i) => (
              <motion.div
                key={speaker.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`rounded-2xl border border-border p-6 md:p-8 hover:shadow-lg transition-all duration-300 ${speaker.bg}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${speaker.iconBg}`}>
                  <speaker.icon className={`w-5 h-5 ${speaker.iconColor}`} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{speaker.role}</p>
                <h3 className="font-heading font-bold text-lg mb-2">{speaker.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{speaker.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Partners"
            title="Our Partners"
            description="TASS Nigeria 2026 is strengthened by partnerships across academia, industry, and government."
            align="center"
          />
          <PartnerAccordion />
        </div>
      </section>

      {/* CEMRI & UniAbuja */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Organizers"
            title="Centre for Multidisciplinary Research and Innovation"
            description="CEMRI, University of Abuja, is the host institution for TASS Nigeria 2026. The Centre brings together cross-disciplinary expertise to examine migration, integration, and sustainable development across Africa."
            light
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
            { val: "17", label: "Thematic Tracks", color: "text-yellow-400" },
            { val: "₦10M+", label: "Total Prize Pool", color: "text-green-400" },
            { val: "4 Days", label: "Of Programming", color: "text-orange-400" },
            ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`font-display font-extrabold text-5xl mb-2 ${stat.color}`}>{stat.val}</p>
                <p className="text-primary-foreground/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}