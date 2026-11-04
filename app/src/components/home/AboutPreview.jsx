import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../conference/SectionHeading";

const SCHOLARS_IMG = "/scholars.jpg";

export default function AboutPreview() {
  return (
    <section className="py-10 md:py-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          <div>
            <SectionHeading
              label="About the Conference"
              title="Where Africa's Brightest Minds Converge"
            />
            <p className="text-muted-foreground leading-relaxed mb-4">
              TASS Nigeria 2026 serves as a premier international convening platform where Africa's diverse intellectual, academic, and professional communities come together to address the continent's most pressing challenges through collaborative, evidence-based solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              The conference integrates rigorous peer-reviewed academic research with practical industry applications, creating a dynamic environment for knowledge exchange and innovation.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all"
            >
              Learn more about TASS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={SCHOLARS_IMG} alt="Scholars in academic discussion" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-green-600 text-white rounded-xl p-5 shadow-xl hidden md:block">
              <p className="font-display font-extrabold text-3xl">4</p>
              <p className="text-sm font-medium opacity-80">Days of<br/>Innovation</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}