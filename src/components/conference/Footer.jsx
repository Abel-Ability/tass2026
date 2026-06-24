import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = [
  { title: "Conference", links: [
    { label: "About TASS", href: "/about" },
    { label: "Sub-Themes", href: "/themes" },
    { label: "Programme", href: "/programme" },
    { label: "Registration", href: "/register" },
  ]},
  { title: "Engage", links: [
    { label: "Hackathon", href: "/hackathon" },
    { label: "Exhibition", href: "/exhibition" },
    { label: "Sponsorship", href: "/sponsorship" },
    { label: "Contact", href: "/contact" },
  ]},
  { title: "Resources", links: [
    { label: "Call for Papers", href: "/themes" },
    { label: "Submission Guidelines", href: "/themes" },
    { label: "Venue Information", href: "/about" },
    { label: "FAQs", href: "/contact" },
  ]},
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <img
              src="https://media.base44.com/images/public/6a359631188c7bfda4ca24b0/14974f33a_logo_200x64.jpeg"
              alt="TASS Nigeria 2026"
              className="h-14 w-auto object-contain mb-4 rounded-lg bg-white p-2"
            />
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-sm mb-6">
              Technology. Arts. Science. Society. Solutions.
              <br />
              International Conference on Multidisciplinary Research, Innovation & Sustainable Development.
            </p>
            <div className="space-y-3 text-sm text-primary-foreground/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>University of Abuja, FCT, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:tass2026@uniabuja.edu.ng" className="hover:text-accent transition-colors">tass2026@uniabuja.edu.ng</a>
              </div>
              <div className="space-y-2">
                {[
                  { name: "Dr. Duabari Silas Aziaka", role: "IOC Chairman", phone: "+447856261406" },
                  { name: "Prof. Patricia Taiwo", role: "LOC Chairperson", phone: "+2348034820646" },
                  { name: "Dr. Lekpa Kingdom David", role: "CEMRI President", phone: "+2348035607640" },
                ].map((c) => (
                  <div key={c.phone} className="flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <a href={`tel:${c.phone}`} className="hover:text-accent transition-colors">{c.phone}</a>
                      <span className="text-primary-foreground/40 text-xs ml-1">· {c.name} ({c.role})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading font-semibold text-sm uppercase tracking-wider mb-5 text-primary-foreground/40">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-sm text-primary-foreground/60 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                    >
                      {l.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CMT Acknowledgement */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40 mb-2">CMT Acknowledgment</h4>
          <p className="text-xs text-primary-foreground/40 leading-relaxed max-w-3xl">
            The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/40">
            &trade; TASS NIGERIA 2026. All Rights Reserved.
          </p>
          <p className="text-xs text-primary-foreground/40">
            09–12 November 2026, Abuja, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}