"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, ExternalLink, Sparkles, BookOpen, Scale, Award } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <footer className="border-t border-forest-800 bg-forest-950 text-surface py-12 mt-auto relative overflow-hidden print:hidden">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto space-y-9 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Identity & National Civic-Tech Mission */}
          <div className="space-y-4 md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-forest-900 border border-brass-500/50 flex items-center justify-center text-brass-400">
                <ShieldCheck className="h-6 w-6 text-brass-400" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white tracking-tight block leading-none">
                  IP-SAKTI <span className="text-brass-400">Sahayak</span>
                </span>
                <span className="text-[11px] font-mono text-brass-300 uppercase tracking-wider block mt-1 font-bold">
                  National Ayush Jurisprudence AI Co-Pilot
                </span>
              </div>
            </div>

            <p className="text-xs text-white/90 leading-relaxed font-sans font-normal">
              Sovereign civic-institutional jurisprudence engine engineered for the Ministry of Ayush & CGPDTM. Unifying classical Ayurvedic pharmacopeias with high-precision patent jurisprudence and statutory BDA 2024 compliance.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900 border border-forest-700 text-[10px] font-mono font-semibold text-brass-300">
                <Award className="h-3 w-3 text-brass-400" /> National Ayush Legal-Tech Portal
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-900/80 border border-moss-600/40 text-[10px] font-mono font-semibold text-emerald-300">
                <Sparkles className="h-3 w-3 text-emerald-400" /> Civic Innovation
              </div>
            </div>
          </div>

          {/* Col 2: Core Specialized Journeys */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brass-400 flex items-center gap-1.5 font-mono">
              <Sparkles className="h-3 w-3" /> Core Journeys
            </h4>
            <ul className="space-y-2 text-xs text-ink-inverse/80 font-sans">
              <li>
                <Link href="/diagnostic" className="hover:text-brass-300 transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brass-400" />
                  Section 3(p) Patentability Checker
                </Link>
              </li>
              <li>
                <Link href="/synergism" className="hover:text-brass-300 transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brass-400" />
                  Section 3(e) Herbal Booster (1+1=3)
                </Link>
              </li>
              <li>
                <Link href="/bda-abs" className="hover:text-brass-300 transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brass-400" />
                  BDA 2024 Forest & Royalty Mapper
                </Link>
              </li>
              <li>
                <Link href="/inspector" className="hover:text-brass-300 transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brass-400" />
                  Side-by-Side Statute & Gazette RAG
                </Link>
              </li>
              <li>
                <Link href="/dual-jurisdiction" className="hover:text-brass-300 transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brass-400" />
                  Strict Dual-Jurisdiction (PCT/US)
                </Link>
              </li>
              <li>
                <Link href="/pivot-engine" className="hover:text-brass-300 transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brass-400" />
                  Alternative IP & Trade Secret Hub
                </Link>
              </li>
              <li>
                <Link href="/dossier" className="hover:text-brass-300 transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brass-400" />
                  Ready-to-File Dossier Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory Grounding */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brass-400 flex items-center gap-1.5 font-mono">
              <Scale className="h-3 w-3" /> Statutory Citations
            </h4>
            <ul className="space-y-2 text-xs text-ink-inverse/80 font-sans">
              <li className="flex items-start gap-1.5">
                <span className="text-brass-400 font-bold font-mono">§</span>
                <span>The Patents Act, 1970 (§ 3(p) Traditional Knowledge & § 3(e) Mere Admixture)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-brass-400 font-bold font-mono">§</span>
                <span>Biological Diversity (Amendment) Act, 2024 (Section 7 Cultivated Flora Exemption)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-brass-400 font-bold font-mono">§</span>
                <span>Drugs and Cosmetics Rules, 1945 (Rule 158B Classical vs Proprietary)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-brass-400 font-bold font-mono">§</span>
                <span>Traditional Knowledge Digital Library (TKDL Prior Art Defenses)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-brass-400 font-bold font-mono">§</span>
                <span>Chou-Talalay Combination Index Theorem (CI &lt; 0.9 Synergy Defense)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Gateways */}
          <div className="space-y-3 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brass-400 flex items-center gap-1.5 font-mono">
              <ExternalLink className="h-3 w-3" /> Official Portals
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-ink-inverse/80 font-sans">
              <Link
                href="https://ipindia.gov.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-surface-raised flex items-center justify-between group transition-colors py-1 border-b border-forest-800"
              >
                <span>IP India (IPO)</span>
                <ExternalLink className="h-3 w-3 text-forest-500 group-hover:text-brass-400 transition-colors" />
              </Link>
              <Link
                href="http://nbaindia.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-surface-raised flex items-center justify-between group transition-colors py-1 border-b border-forest-800"
              >
                <span>NBA Chennai</span>
                <ExternalLink className="h-3 w-3 text-forest-500 group-hover:text-brass-400 transition-colors" />
              </Link>
              <Link
                href="https://ayush.gov.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-surface-raised flex items-center justify-between group transition-colors py-1 border-b border-forest-800"
              >
                <span>Ministry of Ayush</span>
                <ExternalLink className="h-3 w-3 text-forest-500 group-hover:text-brass-400 transition-colors" />
              </Link>
              <Link
                href="https://tkdl.res.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-surface-raised flex items-center justify-between group transition-colors py-1 border-b border-forest-800"
              >
                <span>TKDL Database</span>
                <ExternalLink className="h-3 w-3 text-forest-500 group-hover:text-brass-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Gazette bottom bar */}
        <div className="pt-6 border-t border-forest-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-inverse/70">
          <p className="font-serif">
            © 2026 IP-SAKTI Sahayak • Official Government of India Ayush Jurisprudence Portal.
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono text-ink-inverse/70">
            <span className="flex items-center gap-1 text-brass-400 font-bold">
              <BookOpen className="h-3.5 w-3.5" /> 54 Classical Pharmacopeias Indexed
            </span>
            <span>•</span>
            <span className="text-emerald-300 font-semibold">Zero Commercial Data Leakage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
