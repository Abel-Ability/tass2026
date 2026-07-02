import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/conference/SectionHeading";
import { Mail, Phone, MapPin, Send, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Contact() {
  const [submitted, setSubmitted] = React.useState(false);
  const formRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      const res = await fetch(e.target.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) setSubmitted(true);
    } catch {}
  };

  return (
    <div className="pt-20">
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Get in Touch"
            title="Contact Us"
            description="Have questions about TASS Nigeria 2026? Reach out to the conference secretariat."
            align="center"
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-heading font-bold text-lg mb-4">Conference Secretariat</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  TASS Nigeria 2026<br />
                  Centre for Multidisciplinary Research and Innovation (CEMRI)<br />
                  University of Abuja
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "University of Abuja, FCT, Nigeria" },
                  { icon: Mail, label: "uniabujacemriinquiries@cemri.org", href: "mailto:uniabujacemriinquiries@cemri.org" },
                  { icon: Mail, label: "uniabujacemrisponsorship@cemri.org", href: "mailto:uniabujacemrisponsorship@cemri.org" },
                  { icon: Mail, label: "uniabujacemrihackathon@cemri.org", href: "mailto:uniabujacemrihackathon@cemri.org" },
                  { icon: Mail, label: "uniabujacemriabstract@cemri.org", href: "mailto:uniabujacemriabstract@cemri.org" },
                  { icon: Globe, label: "tass2026.uniabuja.edu.ng", href: "https://tass2026.uniabuja.edu.ng" },
                  { icon: Globe, label: "cemri.org (CEMRI Website)", href: "https://www.cemri.org" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-muted-foreground mt-2 hover:text-accent transition-colors">{item.label}</a>
                    ) : (
                      <span className="text-sm text-muted-foreground mt-2">{item.label}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Contacts */}
              <div>
                <h3 className="font-heading font-bold text-lg mb-4">Key Contacts</h3>
                <div className="space-y-4">
                  {[
                    { name: "Engr. (Dr) Duabari Silas Aziaka", role: "IOC Chairman", phone: "+44 7442 568824" },
                    { name: "Prof. Patricia Awa Taiwo", role: "LOC Chairperson", phone: "+234 803 482 0646" },
                    { name: "Dr. Lekpa Kingdom David", role: "CEMRI President", phone: "+234 803 560 7640" },
                    { name: "Dr. Joy Kafomdi Okwuogori", role: "LOC Secretary", phone: "+2347063891945" },
                  ].map((contact) => (
                    <div key={contact.name} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.role}</p>
                        <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">{contact.phone}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent/10 border border-accent/20 rounded-2xl p-10 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-sm text-muted-foreground">Thank you for your interest. The conference secretariat will respond within 48 hours.</p>
                </motion.div>
              ) : (
                <form ref={formRef} action="https://formspree.io/f/mwvdrgwl" method="POST" onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5">
                  <input type="hidden" name="_to" value="tass2026@uniabuja.edu.ng" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                      <Input name="name" placeholder="Your full name" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email</label>
                      <Input name="_replyto" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Institution / Organisation</label>
                      <Input name="institution" placeholder="Your institution" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Enquiry Type</label>
                      <Select name="enquiry_type">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="registration">Registration</SelectItem>
                          <SelectItem value="submission">Paper Submission</SelectItem>
                          <SelectItem value="sponsorship">Sponsorship</SelectItem>
                          <SelectItem value="exhibition">Exhibition</SelectItem>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                          <SelectItem value="other">General Enquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Message</label>
                    <Textarea name="message" placeholder="Tell us how we can help..." rows={5} required />
                  </div>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full h-12 font-semibold">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}