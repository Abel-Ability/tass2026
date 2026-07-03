import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const HACKATHON_IMG = "/hackathon.jpg";

export default function HackathonPreview() {
  return (
    <section className="py-10 md:py-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden">
              <img src={HACKATHON_IMG} alt="Student hackathon" className="w-full h-full object-cover aspect-[16/10]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Student Innovation
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight text-foreground mb-6">
              48-Hour
              <br />
              <span className="text-accent">Hackathon</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              A competitive sprint beginning Day 1 and culminating in public demos on Day 3. Open to undergraduate and postgraduate students at Nigerian universities. Teams work with mentors from industry, academia, and civil society.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Trophy, label: "₦10M Prize Pool" },
                { icon: Clock, label: "48 Hours" },
                { icon: Users, label: "Teams of 4–6" },
              ].map((item) => (
                <div key={item.label} className="bg-muted/60 rounded-xl p-4 text-center">
                  <item.icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <span className="text-xs font-semibold text-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            <Link
              to="/hackathon"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all text-sm"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}