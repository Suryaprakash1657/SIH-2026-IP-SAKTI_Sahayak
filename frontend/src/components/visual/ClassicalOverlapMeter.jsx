"use client";

import React from "react";
import { BookOpen, ShieldAlert, CheckCircle2, Scale, Scroll, Sparkles } from "lucide-react";

export function ClassicalOverlapMeter({
  overlapScore = 0.64,
  textbookName = "Saraswatarishta & Charaka Samhita",
  classicalCitation = "Uttara Tantra, Chapter 28",
  isVerbatim = false,
  isNovelRatio = true,
  overlappingHerbs = ["Ashwagandha", "Brahmi"],
}) {
  const overlapPct = Math.round(overlapScore * 100);
  const isHighRisk = overlapPct > 80 || isVerbatim;
  const isModerate = overlapPct > 40 && overlapPct <= 80;

  return (
    <div className="parchment-card p-6 sm:p-7 rounded-3xl space-y-5 border border-[#d6ccb8] shadow-luxury">
      {/* Header with Heraldic Icon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e8e0ce]">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] border border-[#2563eb]/40 flex items-center justify-center text-[#1e40af] shadow-sm">
            <Scroll className="h-5 w-5 text-[#2563eb]" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1e40af] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#2563eb]" /> Classical Pharmacopoeia Cross-Match
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-[#0e2720] mt-0.5">
              Traditional Knowledge Digital Library (TKDL) Meter
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-3.5 py-1 rounded-full font-extrabold font-mono border ${
              isHighRisk
                ? "bg-rose-50 text-rose-800 border-rose-300"
                : isModerate
                ? "bg-blue-50 text-blue-900 border-blue-300"
                : "bg-emerald-50 text-emerald-900 border-emerald-300"
            }`}
          >
            {overlapPct}% Heritage Match
          </span>
        </div>
      </div>

      {/* Segmented Precision Overlap Gauge */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-[#2d473e]">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#1b5a4b]" />
            54 First Schedule Authority Index
          </span>
          <span className="font-mono text-[#0e2720] font-bold text-sm">{overlapPct}% Density</span>
        </div>

        {/* Outer gauge track */}
        <div className="relative w-full bg-[#e8e0ce] rounded-full h-3.5 p-0.5 overflow-hidden border border-[#d3c8b2]">
          <div
            className={`h-full rounded-full transition-all duration-500 shadow-sm ${
              isHighRisk
                ? "bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600"
                : isModerate
                ? "bg-gradient-to-r from-[#1b5a4b] via-[#2d7f63] to-[#2563eb]"
                : "bg-gradient-to-r from-[#123c33] to-[#1b5a4b]"
            }`}
            style={{ width: `${Math.max(overlapPct, 5)}%` }}
          />
        </div>

        {/* Gauge tick legends */}
        <div className="flex justify-between text-[10px] font-mono text-[#5f736a] pt-0.5">
          <span>0% Novel</span>
          <span>40% Defensible</span>
          <span>80% Barred (Sec 3p)</span>
          <span>100% Verbatim</span>
        </div>
      </div>

      {/* Classical Citation Manuscript Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#fbf8f2] to-[#f4ede0] border border-[#ded4bf] space-y-2.5 text-xs shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-stone-700 pb-2 border-b border-[#e8dfcf]">
          <span className="font-mono font-bold text-[11px] text-[#1e40af] uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-[#2563eb]" />
            Indexed Classical Scripture:
          </span>
          <span className="font-serif font-bold text-[#0e2720] text-sm">{textbookName}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-stone-700 pb-2 border-b border-[#e8dfcf]">
          <span className="font-mono text-[11px] text-[#556960] uppercase">Statutory Verse & Chapter:</span>
          <span className="font-mono font-semibold text-[#18392f] bg-white/80 px-2 py-0.5 rounded border border-[#d6ccb8]">
            {classicalCitation}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-stone-700">
          <span className="font-mono text-[11px] text-[#556960] uppercase">Overlapping Classical Herbs:</span>
          <div className="flex flex-wrap gap-1.5">
            {overlappingHerbs.map((h, i) => (
              <span key={i} className="px-2 py-0.5 rounded-lg bg-[#e2efe8] text-[#144d3c] font-semibold text-[11px] border border-[#2d7f63]/30">
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Plain Language Verdict Callout */}
      <div
        className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3.5 ${
          isHighRisk
            ? "bg-[#fdf2f2] border-rose-200 text-rose-950"
            : isModerate
            ? "bg-[#eff6ff] border-blue-200 text-blue-950"
            : "bg-[#edf6f2] border-emerald-200 text-emerald-950"
        }`}
      >
        <div className="p-1.5 rounded-xl shrink-0 mt-0.5 bg-white shadow-xs border">
          {isHighRisk ? (
            <ShieldAlert className="h-5 w-5 text-rose-600" />
          ) : isModerate ? (
            <Scale className="h-5 w-5 text-blue-600" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          )}
        </div>
        <div>
          <strong className="font-serif font-bold text-sm block mb-1">
            {isHighRisk
              ? "Section 3(p) Ancient Recipe Bar Applies"
              : isModerate
              ? "Defensible with Standardized Ratio or Synergy"
              : "High Novelty - Safe from Section 3(p)"}
          </strong>
          <p className="text-xs text-[#283832] leading-relaxed">
            {isHighRisk
              ? "This recipe matches classical scriptures verbatim. Under Indian Patent law, ancient community remedies cannot be privately owned. Pivot to brand trademarks or trade secrets."
              : isModerate
              ? "Your herbs exist in ancient texts, but your standardized extraction or ratio gives you room to claim patent eligibility if you show novel biological synergy."
              : "Your herbal combination is not recognized as a classical mix. You are clear of the traditional knowledge statutory exclusion!"}
          </p>
        </div>
      </div>
    </div>
  );
}
