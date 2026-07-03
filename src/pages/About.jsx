import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Globe, Award, Lightbulb, Users, BookOpen, Handshake, Mic2, Building2, FlaskConical, Landmark, ChevronDown } from "lucide-react";

const SCHOLARS_IMG = "/scholars.jpg";

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
      { src: "", name: "21st Century Open University" },
    ]
  },
  {
    icon: Building2, label: "Partnership Industry", bg: "bg-teal-50", iconBg: "bg-teal-100", iconColor: "text-teal-700",
    logos: [
      { src: "", name: "ResTV — Research Television" },
      { src: "", name: "CEFPACS Consulting Limited" },
      { src: "", name: "TripWinga" },
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
                        {logo.src ? (
                          <img src={logo.src} alt={logo.name} className="h-16 w-full object-contain rounded-md" />
                        ) : (
                          <div className="h-16 w-full rounded-md bg-muted flex items-center justify-center text-muted-foreground text-xs font-medium px-2 text-center leading-snug">
                            {logo.name}
                          </div>
                        )}
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

function LOCSection() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("/LOC.csv")
      .then((r) => r.text())
      .then((text) => {
        const lines = text.trim().split("\n");
        const parsed = lines.map((line) => {
          const [name, position] = line.split(",").map((s) => s.trim());
          return { name, position };
        });
        setMembers(parsed);
      })
      .catch(() => {});
  }, []);

  if (members.length === 0) return null;

  return (
    <section className="py-10 md:py-10 bg-muted/50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionHeading
          label="Committee"
          title="Local Organising Committee (LOC)"
          description="The dedicated team organising TASS Nigeria 2026."
          align="center"
          className="mb-4 md:mb-6"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="bg-card border border-border rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-2 mb-1">
                <div className="w-9 h-9 shrink-0 rounded-full bg-gold/20 flex items-center justify-center">
                  <Users className="w-[18px] h-[18px] text-gold" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-foreground leading-snug">{m.name}</h4>
                  <p className="text-sm text-muted-foreground">{m.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <div className="pt-10">
      {/* Hero Banner */}
      <section className="relative py-10 md:py-10 overflow-hidden bg-muted/50">
        <div className="absolute top-0 left-[10%] w-px h-full bg-border/50" />
        <div className="absolute top-0 right-[20%] w-px h-full bg-border/50" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
            <div>
              <SectionHeading
                label={<><span className="text-green-600">TASS NIG</span><span className="text-red-600">ERIA 2026</span></>}
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
      <section className="py-10 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Why TASS 2026"
            title="What Makes This Conference Unique"
            align="center"
            className="mb-4 md:mb-6"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={`border border-border rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-300 ${f.bg}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${f.iconBg}`}>
                    <f.icon className={`w-[18px] h-[18px] ${f.iconColor}`} />
                  </div>
                  <h3 className="font-heading font-bold text-base">{f.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Keynote Speakers & Special Guest */}
      <section className="py-10 md:py-10 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Featured Speakers"
            title="Keynote Speakers & Special Guest of Honour"
            description="TASS Nigeria 2026 will feature distinguished academics, policymakers, and industry leaders as keynote speakers. Further details will be announced soon."
            align="center"
            className="mb-4 md:mb-6"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {[
              { role: "Special Guest of Honour", name: "To Be Announced", note: "A distinguished personality of national significance.", icon: Award, bg: "bg-yellow-50", iconBg: "bg-yellow-100", iconColor: "text-yellow-700" },
              { role: "Keynote Speaker I", name: "Prof. Feryel Ouerghi Sebai", note: "Former Minister of Economy & Planning | Senior Economist | Expert in African Development & Economic Strategy Leader, Tunis, Tunisia.", icon: Mic2, bg: "bg-green-50", iconBg: "bg-green-100", iconColor: "text-green-700" },
              { role: "Keynote Speaker II", name: "Prof. Steven Timipa Odi-Owei", note: "Emeritus Professor of Mechanical Engineering & Former Vice-Chancellor, Rivers State University | Pro-Chancellor/Chairman of Council, Niger Delta University, Amasoma, Bayelsa State, Nigeria.", icon: Mic2, bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-700" },
            ].map((speaker, i) => (
              <motion.div
                key={speaker.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`rounded-xl border border-border p-3 md:p-4 hover:shadow-md transition-all duration-300 ${speaker.bg}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center ${speaker.iconBg}`}>
                    <speaker.icon className={`w-[18px] h-[18px] ${speaker.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{speaker.role}</p>
                    <h3 className="font-heading font-bold text-xl">{speaker.name}</h3>
                  </div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">{speaker.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Keynote Speaker Citation */}
      <section className="py-10 md:py-10 bg-gradient-to-br from-navy to-navy-light text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Keynote Speaker Citation"
            title="Emeritus Prof. Steven Timipa Odi-Owei"
            description="A renowned scholar and academic leader with over five decades of contributions to engineering and education."
            light
            align="center"
          />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-10 items-start mt-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img src="/Photo_Odi.jpeg" alt="Emeritus Prof. Steven Timipa Odi-Owei" className="w-full aspect-[3/4] object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <h3 className="text-gold font-heading font-bold text-2xl md:text-3xl mb-2">
                Engr. Emeritus Prof. Steven Timipa Odi-Owei
              </h3>
              <p className="text-white/60 text-sm mb-6">FNSE, FAAS, FNAEng</p>
              <div className="space-y-4 text-white/80 text-sm leading-relaxed">
                <p>
                  Emeritus Professor Steven Timipa Odi-Owei is a renowned scholar, engineer, and academic leader with a distinguished career spanning over five decades. Born on June 21, 1945, in Accra, Ghana, he has made significant contributions to engineering education, research, and professional development in Nigeria and beyond.
                </p>
                <p>
                  He earned his B.Sc. (Hons) in Mechanical Engineering from Ahmadu Bello University, Zaria in 1970, followed by a Master&rsquo;s degree in Automotive Studies from Cranfield Institute of Technology, UK (1972), and a Ph.D. in Tribology from the University of Wales, Swansea (1976). A pioneer in the field of tribology in Nigeria, he established the country&rsquo;s first Tribology Laboratory at the Rivers State University of Science and Technology, where he was appointed Professor of Mechanical Engineering in 1990.
                </p>
                <p>
                  Prof. Odi-Owei is a Fellow of the Nigerian Society of Engineers, the Nigerian Academy of Engineering, the African Academy of Sciences, and the Institution of Diagnostic Engineers, UK. He is also a Life Member of the Nigerian Institution of Mechanical Engineers, the Foundation President of the Tribology Society of Nigeria, and a member of the Guild of Tribologists, International Tribology Congress, Poland.
                </p>
                <p>
                  He served with distinction as Head of Department, Dean of the Faculty of Engineering, Deputy Vice-Chancellor (1995&ndash;1996), and Vice-Chancellor (1996&ndash;2000) at RSUST. He has held visiting positions at the University of Wales, Swansea; Delft Technical University, The Netherlands; the University of Essex, UK; the University of Port Harcourt; and Niger Delta University.
                </p>
                <p>
                  In recognition of his outstanding service and academic legacy, Rivers State University conferred on him the title of Emeritus Professor of Mechanical Engineering in 2015. He has served as Pro-Chancellor and Chairman of Governing Council of Anchor University, Lagos, and is currently the Pro-Chancellor and Chairman of Governing Council of Niger Delta University, Bayelsa State.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Local Organising Committee */}
      <LOCSection />

      {/* Partners */}
      <section className="py-10 md:py-10">
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
      <section className="py-10 md:py-10 bg-primary text-primary-foreground">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Organisers"
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
