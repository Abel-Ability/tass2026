import React from 'react';
import SectionHeading from '@/components/conference/SectionHeading';
import { Shield, Copyright, AlertTriangle, Ban } from 'lucide-react';

export default function Terms() {
  return (
    <div className="pt-10">
      {/* Hero */}
      <section className="relative py-10 md:py-10 bg-primary text-primary-foreground overflow-hidden">
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Legal"
            title="Terms of Service"
            description="Legal terms governing the use of this website and its content."
            light
          />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 space-y-8">
            {/* Copyright Notice */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Copyright className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-heading font-semibold">Copyright Notice</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                © 2026 CEMRI, University of Abuja. All rights reserved. This website and its original content, 
                including but not limited to text, graphics, logos, images, maps, software, and design elements, 
                are protected by international copyright laws.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-heading font-semibold">Intellectual Property</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                All intellectual property rights in this website and its content are owned by the 
                Centre for Multidisciplinary Research and Innovation (CEMRI), University of Abuja. 
                This includes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Conference materials and presentations</li>
                <li>Research abstracts and publications</li>
                <li>Website design, layout, and visual elements</li>
                <li>Photographs, images, and multimedia content</li>
                <li>Logos and branding materials</li>
              </ul>
            </section>

            {/* Prohibited Activities */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Ban className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-heading font-semibold">Prohibited Activities</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Without prior written consent from CEMRI, University of Abuja, you may NOT:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Copy, reproduce, or duplicate any content from this website</li>
                <li>Scrape, extract, or systematically download website content</li>
                <li>Use automated tools (bots, crawlers) to access or copy content</li>
                <li>Modify, adapt, or create derivative works from any content</li>
                <li>Redistribute, publish, or publicly display any content</li>
                <li>Remove or alter any copyright notices or watermarks</li>
                <li>Frame or embed this website's content on other sites</li>
                <li>Use this website's content for commercial purposes without authorization</li>
              </ul>
            </section>

            {/* Authorized Use */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-heading font-semibold">Authorized Use</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                You may view and interact with this website for personal, non-commercial purposes. 
                Academic citation of published works is permitted provided proper attribution is given 
                and a link to the original source is included. For any other use, please contact 
                CEMRI, University of Abuja for permission.
              </p>
            </section>

            {/* Enforcement */}
            <section>
              <h2 className="text-lg font-heading font-semibold mb-4">Enforcement</h2>
              <p className="text-muted-foreground leading-relaxed">
                Unauthorized use of this website's content may constitute copyright infringement and will be 
                pursued through legal action, including but not limited to DMCA takedown notices, 
                cease and desist letters, and litigation. We actively monitor for unauthorized copying 
                and reproduction of our content.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-lg font-heading font-semibold mb-4">Request Permission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To request permission to use any content from this website, please contact:<br />
                <strong>Centre for Multidisciplinary Research and Innovation (CEMRI)</strong><br />
                University of Abuja, FCT, Nigeria<br />
                Email: <a href="mailto:tass2026@uniabuja.edu.ng" className="text-green-600 hover:underline">tass2026@uniabuja.edu.ng</a>
              </p>
            </section>

            <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
