"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe2,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Award,
  Scale,
  Calendar,
  Compass,
} from "lucide-react";
import { JurisdictionSwitch } from "@/components/layout/JurisdictionSwitch";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";

const TIMELINE_STEPS = [
  { month: "Month 0", title: "Priority Filing in India (IPO)", desc: "File Indian provisional application to lock in global priority date under Paris Convention." },
  { month: "Month 12", title: "PCT International Application (WIPO)", desc: "File Patent Cooperation Treaty application claiming Indian priority date, designating 157 member states." },
  { month: "Month 16", title: "International Search Report (ISR)", desc: "Receive WIPO search opinion validating novel standardized extract claims against global prior art." },
  { month: "Month 18", title: "International Publication", desc: "PCT international publication and statutory Section 10(4) origin declaration published worldwide." },
  { month: "Month 30/31", title: "National Phase Entry (US / EU / JP)", desc: "Enter USPTO (35 U.S.C. 101/103) & EPO (Art. 56) without Section 3(p) traditional knowledge exclusions." },
];

export default function DualJurisdictionPage() {
  const [jurisdictionMode, setJurisdictionMode] = useState("BOTH");
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 mx-auto space-y-8 text-ink">
      {/* ── 1. HEADER BANNER ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brass-700 uppercase tracking-wider mb-1.5">
            <Globe2 className="h-4 w-4 text-brass-600" /> Cross-Border IPR & Export Engine
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-forest-950">
            Strict Dual-Jurisdiction Switch
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft mt-1 max-w-2xl font-sans">
            Segregate domestic Indian Patent Office (IPO) statutory hurdles from foreign export patentability (USPTO / EPO / PCT).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <PlainLanguageToggle compact />
          <JurisdictionSwitch
            value={jurisdictionMode}
            onChange={setJurisdictionMode}
          />
        </div>
      </div>

      {/* ── 2. MAIN COMPARATIVE BENTO CARDS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Domestic India Card */}
        {(jurisdictionMode === "IN" || jurisdictionMode === "BOTH") && (
          <div className="parchment-card p-6 sm:p-8 rounded-3xl border-t-4 border-t-forest-900 border border-line shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-forest-900 border border-forest-800 flex items-center justify-center text-brass-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950">
                    Domestic Jurisdiction (India - IPO)
                  </h3>
                  <span className="text-[10px] font-mono text-ink-muted uppercase">Patents Act 1970</span>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-forest-50 text-forest-900 font-mono font-bold border border-forest-600/30">
                HIGH THRESHOLD
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-forest-950 block">Primary Statutory Hurdle</span>
                <p className="text-ink-soft leading-relaxed">
                  Section 3(p) (Traditional Knowledge bar) & Section 3(e) (Mere Admixture bar). Requires experimental proof of synergism (CI &lt; 0.90).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-forest-950 block">Mandatory Biodiversity Compliance</span>
                <p className="text-ink-soft leading-relaxed">
                  Section 6 NBA approval required prior to patent grant, plus Section 10(4)(d)(ii) mandatory origin disclosure.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-forest-950 block">Domestic Regulatory Marketing Path</span>
                <p className="text-ink-soft leading-relaxed">
                  State Licensing Authority (SLA) AYUSH Manufacturing License under Rule 158B (Proprietary ASU Medicine).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-line space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-forest-900 block">
                Recommended IPO Corridor
              </span>
              <p className="text-xs text-ink leading-relaxed">
                Frame claims around standardized bioactive extraction ratios (e.g. 5:1 withanolides) rather than botanical names, supported by quantitative bioactivity curves.
              </p>
            </div>
          </div>
        )}

        {/* Foreign Export Jurisdiction Card */}
        {(jurisdictionMode === "EXPORT" || jurisdictionMode === "BOTH") && (
          <div className="parchment-card p-6 sm:p-8 rounded-3xl border-t-4 border-t-brass-700 border border-line shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-brass-700 border border-brass-600 flex items-center justify-center text-surface-raised">
                  <Globe2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950">
                    Foreign Export (USPTO / EPO / PCT)
                  </h3>
                  <span className="text-[10px] font-mono text-ink-muted uppercase">35 U.S.C. 101 & EPC Art. 56</span>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-brass-50 text-brass-900 font-mono font-bold border border-brass-500/40">
                EXPORT VIABLE
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-forest-950 block">Absence of Section 3(p) TK Bar</span>
                <p className="text-ink-soft leading-relaxed">
                  The USPTO and EPO do not have a statutory traditional knowledge bar. Formulations must satisfy standard novelty and non-obviousness tests.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-forest-950 block">Mandatory Section 39 Clearance</span>
                <p className="text-ink-soft leading-relaxed">
                  Indian residents must either file first in India or obtain a Foreign Filing License (FFL) under Section 39 before overseas submission.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface border border-line space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-forest-950 block">FDA / EMA Regulatory Classification</span>
                <p className="text-ink-soft leading-relaxed">
                  Marketable as Dietary Supplements (DSHEA in US) or Traditional Herbal Medicinal Products (THMPD in EU).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-line space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brass-700 block">
                Recommended Overseas Strategy
              </span>
              <p className="text-xs text-ink leading-relaxed">
                File a PCT application claiming Indian priority within 12 months, and claim synergistic composition of matter in the US where utility patent grants are significantly more accessible.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── 3. 30-MONTH PCT INTERNATIONAL FILING TIMELINE ── */}
      <div className="parchment-card p-6 sm:p-8 space-y-6 border border-line shadow-card text-ink">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brass-700 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brass-600" /> Paris Convention & WIPO Protocol
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950 mt-0.5">
              30-Month International PCT Roadmap
            </h3>
          </div>
          <span className="text-xs font-mono text-ink-muted">
            157 Member States
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {TIMELINE_STEPS.map((step, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTimelineStep(idx)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                activeTimelineStep === idx
                  ? "bg-forest-900 text-surface-raised border-forest-700 shadow-card ring-2 ring-forest-700/20"
                  : "bg-surface border-line hover:bg-surface-raised text-ink"
              }`}
            >
              <span className={`text-[10px] font-mono font-bold block ${activeTimelineStep === idx ? "text-brass-400" : "text-brass-700"}`}>
                {step.month}
              </span>
              <span className="font-serif font-bold text-xs block mt-1 leading-snug">
                {step.title}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Timeline Step Detail */}
        <div className="p-5 rounded-2xl bg-surface border border-line space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-brass-600" />
            <span className="font-serif font-bold text-sm text-forest-950">
              {TIMELINE_STEPS[activeTimelineStep].month}: {TIMELINE_STEPS[activeTimelineStep].title}
            </span>
          </div>
          <p className="text-xs text-ink-soft leading-relaxed font-sans">
            {TIMELINE_STEPS[activeTimelineStep].desc}
          </p>
        </div>
      </div>
    </div>
  );
}
