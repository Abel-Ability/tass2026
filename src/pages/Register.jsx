import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Calendar, Check, Info, X } from "lucide-react";

const GAS_REG_URL = "https://script.google.com/macros/s/AKfycbwKUyKHAIUs1kW74C6BsTngAHOaQ71_TL46jEjIatAkhD8p6O3vdyx2f_aC-cd8ykz6MQ/exec?embed=true";

const registrationFees = [
  { category: "Nigerian Academic / Researcher", earlyBird: "₦75,000", standard: "₦100,000" },
  { category: "International Academic / Researcher", earlyBird: "$200", standard: "$300" },
  { category: "Postgraduate Student (Nigerian)", earlyBird: "₦30,000", standard: "₦50,000" },
  { category: "Postgraduate Student (International)", earlyBird: "$100", standard: "$150" },
  { category: "Industry / Corporate Delegate", earlyBird: "₦150,000", standard: "₦200,000" },
  { category: "Virtual Attendance", earlyBird: "₦20,000 / $50", standard: "₦30,000 / $75" },
];

export default function Register() {
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
      iframeRef.current.src = GAS_REG_URL;
    }
  }

  return (
    <div className="pt-10">
      <section className="py-10 md:py-10 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Registration"
            title="Delegate Registration Fees"
            description="Early bird rates close 30 September 2026. Group discount: 15% off standard rates for 5 or more delegates from one institution."
            align="center"
          />
        </div>
      </section>

      <section className="py-10 md:py-10">
        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          {/* Fees Table */}
          <div className="rounded-2xl border border-border overflow-hidden mb-10">
            <div className="grid grid-cols-3 bg-primary text-primary-foreground">
              <div className="p-4 font-heading font-semibold text-sm">Category</div>
              <div className="p-4 font-heading font-semibold text-sm text-center">
                <span className="flex items-center justify-center gap-1">
                  Early Bird
                </span>
              </div>
              <div className="p-4 font-heading font-semibold text-sm text-center">Standard</div>
            </div>
            {registrationFees.map((fee, i) => (
              <motion.div
                key={fee.category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-3 border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
              >
                <div className="p-4 text-sm font-medium text-foreground">{fee.category}</div>
                <div className="p-4 text-sm text-center font-semibold text-accent">{fee.earlyBird}</div>
                <div className="p-4 text-sm text-center text-muted-foreground">{fee.standard}</div>
              </motion.div>
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 flex items-start gap-3 mb-10">
            <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground mb-1">Important Dates</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  Early bird registration closes: <strong>30 September 2026</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  Conference dates: <strong>09–12 November 2026</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="font-heading font-bold text-lg mb-4">Registration Includes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Access to all plenary sessions",
                "Track session participation",
                "Conference materials & badge",
                "Exhibition hall access",
                "Networking breaks & lunch",
                "Certificate of attendance",
                "Digital proceedings access",
                "Live-stream access (virtual)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Register Now CTA */}
      <section id="register-cta" className="py-10 md:py-10" style={{ backgroundColor: "#0a5c36" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <h2
            className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl mb-4"
            style={{ color: "#f4c430" }}
          >
            Register Now For The Conference
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Secure your spot at TASS Nigeria 2026. Early bird rates close 30 September 2026.
          </p>
          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-full shadow-lg transition-all hover:scale-105 text-xl md:text-2xl"
            style={{ backgroundColor: "#f4c430", color: "#0a5c36" }}
          >
            Click Here To Register Now
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
                TASS Nigeria 2026 — Registration
              </h3>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <iframe
              ref={iframeRef}
              src={GAS_REG_URL}
              className="flex-1 w-full border-0"
              title="Registration Form"
            />
          </div>
        </div>
      )}
    </div>
  );
}