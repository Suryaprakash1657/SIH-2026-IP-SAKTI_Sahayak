"use client";

import React from "react";
import { BookOpen, ShieldAlert, CheckCircle2, Scale, Scroll, Sparkles } from "lucide-react";
import { MetricGauge } from "./MetricGauge";

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

  const severityBadge = isHighRisk
    ? {
        text: "Statutorily Barred (§ 3p)",
        variant: "crimson",
        classes: "bg-rose-50 text-rose-900 border-rose-400/50",
      }
    : isModerate
    ? {
        text: "Defensible Novel Ratio",
        variant: "brass",
        classes: "bg-brass-50 text-brass-900 border-brass-500/50",
      }
    : {
        text: "Clear of § 3(p) Heritage Bar",
        variant: "emerald",
        classes: "bg-emerald-50 text-emerald-950 border-emerald-500/50",
      };

  return (
    <div className="parchment-card p-6 sm:p-7 space-y-6 border border-line shadow-card text-ink">
      {/* ── HEADER WITH CITATION METADATA ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-xl bg-forest-900 border border-brass-500/40 flex items-center justify-center text-brass-400 shadow-card shrink-0">
            <Scroll className="h-6 w-6 text-brass-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brass-700 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brass-600" /> 54 Classical Pharmacopeias Cross-Match
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950 mt-0.5">
              Traditional Knowledge Digital Library (TKDL) Prior Art Density
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-3 py-1 rounded-full font-extrabold font-mono border ${severityBadge.classes}`}
          >
            {overlapPct}% Classical Match
          </span>
        </div>
      </div>

      {/* ── CALIBRATED CONFIDENCE GAUGE & DENSITY BANDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-4 flex justify-center">
          <MetricGauge
            value={overlapPct}
            max={100}
            unit="%"
            label="TKDL Density"
            sublabel="Scripture Match"
            variant={severityBadge.variant}
            statusLabel={severityBadge.text}
            size="md"
          />
        </div>

        <div className="md:col-span-8 space-y-3">
          <div className="flex justify-between text-xs font-semibold text-ink-soft">
            <span className="flex items-center gap-1.5 font-serif font-bold text-ink">
              <span className="h-2 w-2 rounded-full bg-forest-800" />
              Statutory Prior Art Meter
            </span>
            <span className="font-mono text-ink font-bold text-sm">{overlapPct}% Overlap Density</span>
          </div>

          {/* Segmented Outer Gauge Bar */}
          <div className="relative w-full bg-canvas-deep rounded-full h-4 p-0.5 overflow-hidden border border-line-strong">
            <div
              className={`h-full rounded-full transition-all duration-500 shadow-xs ${
                isHighRisk
                  ? "bg-gradient-to-r from-saffron-500 via-warning to-danger"
                  : isModerate
                  ? "bg-gradient-to-r from-forest-800 via-moss-600 to-brass-500"
                  : "bg-gradient-to-r from-forest-900 to-forest-700"
              }`}
              style={{ width: `${Math.max(overlapPct, 6)}%` }}
            />
          </div>

          {/* Calibrated Threshold Ticks */}
          <div className="flex justify-between text-[10px] font-mono text-ink-muted pt-0.5">
            <span className="text-emerald-700 font-semibold">0% Novel Formulation</span>
            <span className="text-brass-700 font-semibold">40% Defensible Ratio</span>
            <span className="text-amber-800 font-semibold">75% Obvious Combination</span>
            <span className="text-rose-800 font-semibold">100% Verbatim (§ 3p Bar)</span>
          </div>
        </div>
      </div>

      {/* ── OFFICIAL MANUSCRIPT EXCERPT / LEGAL CITATION ── */}
      <div className="p-4 rounded-2xl bg-surface border border-line space-y-3 text-xs shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-ink pb-2 border-b border-line">
          <span className="font-mono font-bold text-[11px] text-brass-700 uppercase tracking-wider flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-brass-600" />
            Statutory Textbook Citation:
          </span>
          <span className="font-serif font-bold text-forest-950 text-sm">{textbookName}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-ink pb-2 border-b border-line">
          <span className="font-mono text-[11px] text-ink-muted uppercase">Statutory Verse & Chapter:</span>
          <span className="font-mono font-semibold text-forest-900 bg-surface-raised px-2.5 py-0.5 rounded border border-line">
            {classicalCitation}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-ink">
          <span className="font-mono text-[11px] text-ink-muted uppercase">Overlapping Classical Herbs:</span>
          <div className="flex flex-wrap gap-1.5">
            {overlappingHerbs.map((h, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-lg bg-surface-raised text-forest-900 font-semibold text-[11px] border border-line shadow-2xs"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPLICIT STATUTORY VERDICT CALLOUT ── */}
      <div
        className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3.5 ${
          isHighRisk
            ? "bg-rose-50/70 border-rose-300 text-rose-950"
            : isModerate
            ? "bg-brass-50/70 border-brass-300 text-amber-950"
            : "bg-emerald-50/70 border-emerald-300 text-emerald-950"
        }`}
      >
        <div className="p-1.5 rounded-xl shrink-0 mt-0.5 bg-surface-raised shadow-xs border border-line">
          {isHighRisk ? (
            <ShieldAlert className="h-5 w-5 text-danger" />
          ) : isModerate ? (
            <Scale className="h-5 w-5 text-brass-600" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-success" />
          )}
        </div>
        <div>
          <strong className="font-serif font-bold text-sm block mb-1">
            {isHighRisk
              ? "Section 3(p) Ancient Recipe Bar Applies"
              : isModerate
              ? "Defensible with Standardized Ratio or Synergism Proof"
              : "High Novelty - Clear of Section 3(p) Exclusion"}
          </strong>
          <p className="text-xs text-ink-soft leading-relaxed font-sans">
            {isHighRisk
              ? "This recipe matches classical scriptures verbatim. Under Indian Patent law, ancient community remedies cannot be privately owned. We advise pivoting to brand trademarks (Class 5) and process trade secrets."
              : isModerate
              ? "Your botanical ingredients exist in ancient texts, but your standardized extract ratio provides viable grounds to overcome Section 3(p). You must pair this with experimental synergism proof to defeat Section 3(e)."
              : "Your herbal combination is not recognized as a classical mix in the 54 First Schedule texts. You are clear of the traditional knowledge statutory exclusion!"}
          </p>
        </div>
      </div>
    </div>
  );
}
