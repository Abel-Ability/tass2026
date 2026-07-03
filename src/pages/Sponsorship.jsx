import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const tiers = [
  {
    name: "Bronze",
    price: "₦2,000,000",
    features: [
      "Logo on conference materials",
      "2 complimentary delegate passes",
      "Standard exhibition booth",
      "Social media mentions",
      "Certificate of sponsorship",
    ]
  },
  {
    name: "Silver",
    price: "₦5,000,000",
    features: [
      "Everything in Bronze",
      "Premium logo placement",
      "5 complimentary delegate passes",
      "Premium exhibition booth",
      "Programme insert",
      "Speaking opportunity (panel)",
    ]
  },
  {
    name: "Gold",
    price: "₦10,000,000",
    featured: true,
    features: [
      "Everything in Silver",
      "Top-tier logo placement",
      "10 complimentary delegate passes",
      "Island exhibition booth",
      "Keynote speaking slot",
      "Branded networking session",
      "VIP dinner invitation",
    ]
  },
  {
    name: "Platinum",
    price: "₦20,000,000",
    features: [
      "Everything in Gold",
      "Title sponsor recognition",
      "15 complimentary delegate passes",
      "Exclusive branding rights",
      "Co-branded conference materials",
      "Dedicated product launch session",
      "VIP lounge naming rights",
    ]
  },
  {
    name: "Diamond",
    price: "₦50,000,000",
    features: [
      "Everything in Platinum",
      "Conference naming rights",
      "Unlimited delegate passes",
      "Exclusive main stage branding",
      "Keynote address slot",
      "Full media coverage package",
      "Year-round brand partnership",
      "Post-conference report branding",
    ]
  },
];

const specialOpps = [
  "Hackathon Title Sponsor",
  "Gala Dinner Sponsor",
  "Delegate Bag Sponsor",
  "Wi-Fi & Digital Infrastructure Sponsor",
  "Transport & Logistics Sponsor",
  "Award Ceremony Sponsor",
];

export default function Sponsorship() {
  return (
    <div className="pt-10">
      <section className="py-10 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Partnership Opportunities"
            title="Sponsorship Tiers"
            description="Access Nigeria's most concentrated gathering of researchers, policymakers, industry leaders, and innovators. All prices are exclusive of VAT."
            align="center"
            className="mb-4 md:mb-6"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl p-3 md:p-4 border flex flex-col shadow-xl text-white ${
                  tier.name === "Bronze" ? "bg-amber-600 border-amber-600" :
                  tier.name === "Silver" ? "bg-slate-500 border-slate-500" :
                  tier.name === "Gold" ? "bg-amber-400 text-amber-900 border-amber-400 ring-2 ring-amber-300/40" :
                  tier.name === "Platinum" ? "bg-sky-600 border-sky-600" :
                  "bg-emerald-600 border-emerald-600"
                }`}
              >
                <h3 className="font-heading font-bold text-xl mb-1">{tier.name}</h3>
                <p className="font-display font-extrabold text-3xl mb-3">{tier.price}</p>
                <ul className="space-y-1 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm flex items-start gap-2 text-white/80">
                      <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-white/60" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 font-semibold rounded-full text-sm transition-all bg-white/20 text-white hover:bg-white/30"
                >
                  Enquire
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Opportunities */}
      <section className="py-10 md:py-10 bg-primary text-primary-foreground">
        <div className="max-w-[800px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Bespoke Packages"
            title="Special Sponsorship Opportunities"
            description="Tailor-made packages for maximum brand visibility and engagement."
            light
            align="center"
            className="mb-4 md:mb-6"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {specialOpps.map((opp, i) => (
              <motion.div
                key={opp}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-3 text-base font-medium text-primary-foreground/80"
              >
                {opp}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all text-xl"
            >
              Discuss Sponsorship <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}