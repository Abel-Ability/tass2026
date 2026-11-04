import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Star, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EXHIBIT_IMG = "/exhibition-bg.jpg";

const boothTiers = [
  { name: "Standard Booth", size: "3m × 3m", price: "₦500,000", features: ["Table & 2 chairs", "Power outlet", "Basic signage", "Exhibitor passes (2)"] },
  { name: "Premium Booth", size: "3m × 6m", price: "₦1,000,000", features: ["Branded backdrop", "Power & WiFi", "Premium signage", "Exhibitor passes (4)", "Programme listing"] },
  { name: "Island Booth", size: "6m × 6m", price: "₦2,500,000", features: ["360° branding", "Dedicated power & WiFi", "Custom signage", "Exhibitor passes (8)", "Prime location", "Programme feature"] },
];

const addOns = [
  "Additional exhibitor passes",
  "LED screen rental",
  "Product launch session (30 min)",
  "Sponsored delegate bags insert",
  "Wi-Fi sponsorship branding",
];

export default function Exhibition() {
  return (
    <div className="pt-10">
      {/* Hero */}
      <section className="relative py-10 md:py-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src={EXHIBIT_IMG} alt="Exhibition hall" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Innovation Exhibition"
            title="TASS Exhibition Hall"
            description="The Exhibition Hall runs across all four days with peak footfall on Days 2 and 3. Showcase your innovations to Nigeria's most concentrated gathering of researchers and industry leaders."
            light
          />
        </div>
      </section>

      {/* Booth Tiers */}
      <section className="py-10 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading label="Exhibition Spaces" title="Choose Your Booth" align="center" className="mb-4 md:mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {boothTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl p-3 md:p-4 border shadow-xl ${
                  i === 0 ? "bg-amber-500 text-white border-amber-500" :
                  i === 1 ? "bg-sky-500 text-white border-sky-500 ring-2 ring-sky-300/40" :
                  "bg-emerald-500 text-white border-emerald-500"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {i === 1 && <Star className="w-4 h-4" />}
                  <h3 className="font-heading font-bold text-xl">{tier.name}</h3>
                </div>
                <p className="text-base mb-2 text-white/70">{tier.size}</p>
                <p className="font-display font-extrabold text-4xl mb-3">{tier.price}</p>
                <ul className="space-y-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-base flex items-center gap-2 text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-white/50" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            All prices are exclusive of VAT. Booth allocation is based on availability at the University of Abuja.
          </p>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-10 md:py-10 bg-muted/50">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <SectionHeading label="Extras" title="Exhibition Add-Ons" description="Available for all booth tiers." align="center" className="mb-4 md:mb-6" />
          <div className="space-y-2">
            {addOns.map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-3"
              >
                <Zap className="w-5 h-5 text-accent shrink-0" />
                <span className="text-base font-medium">{a}</span>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all text-sm"
            >
              Enquire About Exhibition <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}