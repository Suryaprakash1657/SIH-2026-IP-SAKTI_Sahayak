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
    <div className="container max-w-7xl py-8 px-4 sm:px-8 mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1e40af] uppercase tracking-wider mb-1.5">
            <Globe2 className="h-4 w-4 text-[#2563eb]" /> Cross-Border IPR & Export Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#0a1c16]">
            Strict Dual-Jurisdiction Switch
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl font-sans">
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

      {/* Main Comparative Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Domestic India Card */}
        {(jurisdictionMode === "IN" || jurisdictionMode === "BOTH") && (
          <div className="parchment-card p-6 sm:p-8 rounded-3xl border-t-4 border-t-[#144d3c] border border-[#d6ccb8] shadow-luxury space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8dfcf]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#edf6f2] border border-[#2d7f63]/40 flex items-center justify-center text-[#144d3c]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#0a1c16]">
                    Domestic Jurisdiction (India - IPO)
                  </h3>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">Patents Act 1970</span>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#edf6f2] text-[#144d3c] font-mono font-bold border border-[#2d7f63]/30">
                HIGH THRESHOLD
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-stone-900 block">Primary Statutory Hurdle</span>
                <p className="text-stone-600 leading-relaxed font-sans">
                  Section 3(p) (Traditional Knowledge bar) & Section 3(e) (Mere Admixture bar). Requires experimental proof of synergism (CI &lt; 0.9).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-stone-900 block">Mandatory Biodiversity Compliance</span>
                <p className="text-stone-600 leading-relaxed font-sans">
                  Section 6 NBA approval required prior to patent grant, plus Section 10(4)(d)(ii) mandatory origin disclosure.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-stone-900 block">Domestic Regulatory Marketing Path</span>
                <p className="text-stone-600 leading-relaxed font-sans">
                  State Licensing Authority (SLA) AYUSH Manufacturing License under Rule 158B (Proprietary ASU Medicine).
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e8dfcf]">
              <span className="text-xs font-serif font-bold text-stone-900 block mb-2.5">
                Domestic Filing Protocol:
              </span>
              <ul className="text-xs text-stone-700 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1b5a4b] shrink-0" />
                  <span>File Provisional Specification (Form 2) to lock Indian priority date.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1b5a4b] shrink-0" />
                  <span>Complete Chou-Talalay CI assays before filing Complete Specification.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#1b5a4b] shrink-0" />
                  <span>File NBA Form III prior to examination / patent grant.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* International Export Card */}
        {(jurisdictionMode === "EXPORT" || jurisdictionMode === "BOTH") && (
          <div className="parchment-card p-6 sm:p-8 rounded-3xl border-t-4 border-t-[#2563eb] border border-[#d6ccb8] shadow-luxury space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#e8dfcf]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#eff6ff] border border-[#2563eb]/40 flex items-center justify-center text-[#1e40af]">
                  <Globe2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-[#0a1c16]">
                    Export Markets (USPTO / EPO / PCT)
                  </h3>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">35 U.S.C. 101/103 & EPO</span>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[#eff6ff] text-[#1e40af] font-mono font-bold border border-[#2563eb]/40">
                FAVORABLE FEASIBILITY
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-stone-900 block">Primary Examination Standard</span>
                <p className="text-stone-600 leading-relaxed font-sans">
                  35 U.S.C. § 101/103 (Utility & Non-Obviousness) / EPO Article 56 (Inventive Step). No Section 3(p) traditional knowledge exclusion exists abroad.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-stone-900 block">International Prior Art Defense</span>
                <p className="text-stone-600 leading-relaxed font-sans">
                  USPTO and EPO examiners rely primarily on published journals; standardized novel extracts easily clear inventive step thresholds.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-1.5 shadow-xs">
                <span className="font-serif font-bold text-stone-900 block">Export Market Commercialization</span>
                <p className="text-stone-600 leading-relaxed font-sans">
                  US FDA Dietary Supplement (DSHEA 1994) or NDI (New Dietary Ingredient notification) rather than full synthetic drug approvals.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#e8dfcf]">
              <span className="text-xs font-serif font-bold text-stone-900 block mb-2.5">
                International Export Protocol:
              </span>
              <ul className="text-xs text-stone-700 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2563eb] shrink-0" />
                  <span>File PCT application within 12 months of Indian priority date.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2563eb] shrink-0" />
                  <span>Obtain favorable WIPO Written Opinion on Novel Extract Claims.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2563eb] shrink-0" />
                  <span>Enter US & EU national phase by Month 30/31 with commercial claims.</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Global Patent Filing Timeline */}
      <div className="parchment-card p-6 sm:p-8 rounded-3xl space-y-6 border border-[#d6ccb8] shadow-luxury">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e8dfcf]">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1e40af] flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#2563eb]" /> Paris Convention & PCT Roadmap
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#0e2720] mt-0.5">
              Global 31-Month Export Prosecution Timeline
            </h3>
          </div>
          <span className="text-xs font-mono text-stone-500 bg-white px-3 py-1 rounded-xl border border-[#d6ccb8]">
            Click any milestone node to view filing details
          </span>
        </div>

        {/* Milestone Steps Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {TIMELINE_STEPS.map((step, idx) => {
            const isSelected = activeTimelineStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTimelineStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-[#144d3c] border-[#225e50] text-white shadow-md scale-102"
                    : "bg-white border-[#ded5c2] text-stone-700 hover:bg-[#faf7f0]"
                }`}
              >
                <span className={`text-[10px] font-mono font-bold uppercase block mb-1 ${isSelected ? "text-[#38bdf8]" : "text-[#1e40af]"}`}>
                  {step.month}
                </span>
                <h4 className={`text-xs font-bold leading-tight ${isSelected ? "text-white font-serif" : "text-stone-900"}`}>
                  {step.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Timeline Milestone Detail Card */}
        <div className="p-5 rounded-2xl bg-white border border-[#ded5c2] flex items-start gap-3 shadow-xs">
          <div className="h-9 w-9 rounded-xl bg-[#edf6f2] border border-[#2d7f63]/30 flex items-center justify-center text-[#144d3c] shrink-0 mt-0.5">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-[#1e40af] block">
              {TIMELINE_STEPS[activeTimelineStep].month} Action Item:
            </span>
            <h4 className="text-sm font-serif font-bold text-stone-900 mt-0.5">
              {TIMELINE_STEPS[activeTimelineStep].title}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-sans mt-1">
              {TIMELINE_STEPS[activeTimelineStep].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
