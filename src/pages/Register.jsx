import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Calendar, Check, Info } from "lucide-react";

const registrationFees = [
  { category: "Nigerian Academic / Researcher", earlyBird: "₦75,000", standard: "₦100,000" },
  { category: "International Academic / Researcher", earlyBird: "$200", standard: "$300" },
  { category: "Postgraduate Student (Nigerian)", earlyBird: "₦30,000", standard: "₦50,000" },
  { category: "Postgraduate Student (International)", earlyBird: "$100", standard: "$150" },
  { category: "Industry / Corporate Delegate", earlyBird: "₦150,000", standard: "₦200,000" },
  { category: "Virtual Attendance", earlyBird: "₦20,000 / $50", standard: "₦30,000 / $75" },
];

export default function Register() {
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
    </div>
  );
}