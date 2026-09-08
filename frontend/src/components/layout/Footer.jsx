import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, Sparkles, BookOpen, Scale, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1b3d33] bg-[#071c16] text-[#ded5c2] py-14 mt-auto relative overflow-hidden print:hidden">
      {/* Subtle ornamental ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-32 bg-[#2d7f63]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-[#2563eb]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-7xl px-4 sm:px-8 mx-auto space-y-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Identity & National Civic-Tech Mission */}
          <div className="space-y-4 md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#1b5a4b] to-[#0d342b] border border-[#2563eb]/50 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="h-6 w-6 text-[#38bdf8]" />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white tracking-tight block leading-none">
                  IP-SAKTI <span className="text-[#38bdf8]">Sahayak</span>
                </span>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block mt-1">
                  National Ayush Jurisprudence AI Co-Pilot
                </span>
              </div>
            </div>

            <p className="text-xs text-[#b8ad96] leading-relaxed">
              Pioneering sovereign civic-tech architecture engineered for the Ministry of Ayush & CGPDTM. Unifying classical botanical medicine with high-precision patent jurisprudence and statutory BDA 2024 compliance.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18392f] border border-[#2e6252] text-[10px] font-mono font-semibold text-[#f5ebd3]">
                <Award className="h-3 w-3 text-[#38bdf8]" /> National Ayush Legal-Tech Portal
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112338] border border-[#1d4ed8]/40 text-[10px] font-mono font-semibold text-[#93c5fd]">
                <Sparkles className="h-3 w-3 text-[#60a5fa]" /> Civic Innovation
              </div>
            </div>
          </div>

          {/* Col 2: Core Specialized Journeys */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#38bdf8] flex items-center gap-1.5 font-mono">
              <Sparkles className="h-3 w-3" /> Core Journeys
            </h4>
            <ul className="space-y-2 text-xs text-[#c5baa3]">
              <li>
                <Link href="/diagnostic" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#38bdf8]" />
                  Section 3(p) Patentability Checker
                </Link>
              </li>
              <li>
                <Link href="/synergism" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#38bdf8]" />
                  Section 3(e) Herbal Booster (1+1=3)
                </Link>
              </li>
              <li>
                <Link href="/bda-abs" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#38bdf8]" />
                  BDA 2024 Forest & Royalty Mapper
                </Link>
              </li>
              <li>
                <Link href="/inspector" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#38bdf8]" />
                  Side-by-Side Statute & Gazette RAG
                </Link>
              </li>
              <li>
                <Link href="/dual-jurisdiction" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#38bdf8]" />
                  Strict Dual-Jurisdiction (PCT/US)
                </Link>
              </li>
              <li>
                <Link href="/pivot-engine" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#38bdf8]" />
                  Alternative IP & Trade Secret Hub
                </Link>
              </li>
              <li>
                <Link href="/dossier" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-[#38bdf8]" />
                  Ready-to-File Dossier Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory Grounding */}
          <div className="space-y-3 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#38bdf8] flex items-center gap-1.5 font-mono">
              <Scale className="h-3 w-3" /> Statutory Grounding
            </h4>
            <ul className="space-y-2 text-xs text-[#c5baa3]">
              <li className="flex items-start gap-1.5">
                <span className="text-[#38bdf8] font-bold">•</span>
                <span>The Patents Act, 1970 (§ 3p Traditional Knowledge & § 3e Mere Admixture)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#38bdf8] font-bold">•</span>
                <span>Biological Diversity (Amendment) Act, 2024 (Section 7 Cultivated Flora Exemption)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#38bdf8] font-bold">•</span>
                <span>Drugs and Cosmetics Rules, 1945 (Rule 158B Classical vs Proprietary)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#38bdf8] font-bold">•</span>
                <span>Traditional Knowledge Digital Library (TKDL Prior Art Defenses)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#38bdf8] font-bold">•</span>
                <span>Chou-Talalay Combination Index Theorem ($CI &lt; 0.9$ Synergy Defense)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Gateways */}
          <div className="space-y-3 md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#38bdf8] flex items-center gap-1.5 font-mono">
              <ExternalLink className="h-3 w-3" /> Official Portals
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-[#c5baa3]">
              <Link
                href="https://ipindia.gov.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center justify-between group transition-colors py-1 border-b border-stone-800"
              >
                <span>IP India (IPO)</span>
                <ExternalLink className="h-3 w-3 text-stone-500 group-hover:text-[#38bdf8] transition-colors" />
              </Link>
              <Link
                href="http://nbaindia.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center justify-between group transition-colors py-1 border-b border-stone-800"
              >
                <span>NBA Chennai</span>
                <ExternalLink className="h-3 w-3 text-stone-500 group-hover:text-[#38bdf8] transition-colors" />
              </Link>
              <Link
                href="https://ayush.gov.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center justify-between group transition-colors py-1 border-b border-stone-800"
              >
                <span>Ministry of Ayush</span>
                <ExternalLink className="h-3 w-3 text-stone-500 group-hover:text-[#38bdf8] transition-colors" />
              </Link>
              <Link
                href="https://tkdl.res.in"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center justify-between group transition-colors py-1 border-b border-stone-800"
              >
                <span>TKDL Database</span>
                <ExternalLink className="h-3 w-3 text-stone-500 group-hover:text-[#38bdf8] transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Gazette bottom bar */}
        <div className="pt-8 border-t border-[#1d4337] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9d927d]">
          <p>
            © 2026 IP-SAKTI Sahayak • Government of India Ayush Jurisprudence Portal.
          </p>
          <div className="flex items-center gap-3 text-[11px] font-mono text-[#b3a792]">
            <span className="flex items-center gap-1 text-[#38bdf8]">
              <BookOpen className="h-3.5 w-3.5" /> 54 Classical Pharmacopeias Indexed
            </span>
            <span>•</span>
            <span className="text-emerald-400">Zero Commercial Data Leakage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
