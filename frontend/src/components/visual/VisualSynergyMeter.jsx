"use client";

import React from "react";
import { Zap, CheckCircle2, ShieldAlert } from "lucide-react";
import { MetricGauge } from "./MetricGauge";

export function VisualSynergyMeter({
  ci = 0.62,
  expectedAdditivity = 0.52,
  observedEffect = 0.86,
  foldEnhancement = 1.65,
  herbAName = "Herb A",
  herbBName = "Herb B",
}) {
  const isSynergistic = ci < 0.9;
  const isAntagonistic = ci > 1.1;

  const clampedCI = Math.min(Math.max(ci, 0.2), 1.8);
  const needlePercent = ((clampedCI - 0.2) / (1.8 - 0.2)) * 100;

  const expectedPct = Math.round(expectedAdditivity * 100);
  const observedPct = Math.round(observedEffect * 100);
  const netGainPct = Math.max(0, observedPct - expectedPct);

  return (
    <div className="parchment-card p-6 sm:p-7 space-y-6 border border-line shadow-card text-ink">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-line">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-forest-900 border border-brass-500/40 flex items-center justify-center text-brass-400 shadow-card shrink-0">
            <Zap className="h-5 w-5 text-brass-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brass-700 flex items-center gap-1.5">
              Laboratory Synergism Assay Engine
            </span>
            <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950 mt-0.5">
              Chou-Talalay Combination Index ($CI$) Verification
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-3 py-1.5 rounded-xl font-mono font-extrabold border ${
              isSynergistic
                ? "bg-emerald-50 text-emerald-900 border-emerald-500/40"
                : isAntagonistic
                ? "bg-rose-50 text-rose-900 border-rose-400/40"
                : "bg-brass-50 text-brass-900 border-brass-500/40"
            }`}
          >
            {foldEnhancement}x Supercharge Boost
          </span>
        </div>
      </div>

      {/* Dual Metric Gauges Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-surface border border-line">
        <MetricGauge
          value={ci}
          max={1.5}
          unit=""
          label="Combination Index"
          sublabel="Target < 0.90"
          variant={isSynergistic ? "emerald" : isAntagonistic ? "crimson" : "brass"}
          statusLabel={isSynergistic ? "Synergistic" : isAntagonistic ? "Antagonistic" : "Additive"}
          size="md"
        />

        <MetricGauge
          value={observedPct}
          max={100}
          unit="%"
          label="Observed Bioactivity"
          sublabel={`+${netGainPct}% Over Sum`}
          variant="forest"
          statusLabel="Assay Potency"
          size="md"
        />
      </div>

      {/* Visual Analogy Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
          isSynergistic
            ? "bg-emerald-50/60 border-emerald-300 text-emerald-950"
            : isAntagonistic
            ? "bg-rose-50/60 border-rose-300 text-rose-950"
            : "bg-brass-50/60 border-brass-300 text-amber-950"
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-lg border shadow-xs ${
              isSynergistic
                ? "bg-forest-900 text-brass-400 border-forest-700"
                : "bg-surface-raised text-ink border-line"
            }`}
          >
            {isSynergistic ? "⚡" : isAntagonistic ? "⚠️" : "⚖️"}
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-forest-950">
              {isSynergistic
                ? "Super-Additive Synergism (1 + 1 = 3+ Rule Met)"
                : isAntagonistic
                ? "Antagonistic Reaction (Biological Interference)"
                : "Mere Admixture (1 + 1 = 2 Simple Sum)"}
            </h4>
            <p className="text-xs text-ink-soft mt-0.5 leading-normal font-sans">
              {isSynergistic
                ? `Observed experimental potency exceeds arithmetic sum by +${netGainPct}%. Section 3(e) mere admixture rejection successfully rebutted!`
                : isAntagonistic
                ? "The combined formulation exhibits lower biological efficacy than individual botanicals. Re-adjust formulation ratio."
                : "Combination only matches the simple mathematical sum of single herbs. IPO Section 3(e) rejections guaranteed without ratio tuning."}
            </p>
          </div>
        </div>
      </div>

      {/* Chou-Talalay Precision Dial Graphic */}
      <div className="space-y-3 pt-1">
        <div className="flex justify-between text-xs font-mono font-bold">
          <span className="text-emerald-800">Synergistic (&lt; 0.90)</span>
          <span className="text-brass-700">Additive (0.90 - 1.10)</span>
          <span className="text-rose-800">Antagonistic (&gt; 1.10)</span>
        </div>

        {/* Gauge Bar with Precision Needle */}
        <div className="relative h-6 rounded-full bg-canvas-deep border border-line-strong p-1 overflow-visible shadow-inner">
          <div className="h-full w-full rounded-full flex overflow-hidden">
            <div className="w-[45%] bg-gradient-to-r from-forest-900 via-forest-700 to-moss-500" />
            <div className="w-[20%] bg-brass-400" />
            <div className="w-[35%] bg-gradient-to-r from-saffron-500 to-danger" />
          </div>

          {/* Needle Indicator */}
          <div
            className="absolute top-[-7px] -translate-x-1/2 flex flex-col items-center transition-all duration-500 z-20"
            style={{ left: `${needlePercent}%` }}
          >
            <div className="h-9 w-2.5 rounded-full bg-forest-950 shadow-card border-2 border-surface-raised" />
            <span className="text-[10px] font-mono font-bold text-forest-950 bg-surface-raised px-2 py-0.5 rounded-md shadow-card border border-line mt-1 whitespace-nowrap">
              CI {ci}
            </span>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-ink-muted pt-2">
          <span>0.20 (Extreme Potency)</span>
          <span>1.00 (Simple Mixture)</span>
          <span>1.80 (Efficacy Inhibition)</span>
        </div>
      </div>

      {/* Comparative Bioactivity Bars */}
      <div className="space-y-3.5 pt-4 border-t border-line">
        {/* Baseline Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-ink-muted">
            <span className="font-mono text-[11px]">Expected Additive Baseline (Webb's Equation)</span>
            <span className="font-mono text-ink font-bold">{expectedPct}%</span>
          </div>
          <div className="w-full bg-canvas-deep rounded-full h-3.5 overflow-hidden border border-line">
            <div
              className="bg-ink-muted/50 h-full rounded-full transition-all duration-500"
              style={{ width: `${expectedPct}%` }}
            />
          </div>
        </div>

        {/* Observed Synergistic Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-forest-900">
            <span className="font-serif text-xs">Observed Experimental Bioactivity (Combined Formula)</span>
            <span className="font-mono text-forest-950 text-sm font-black">{observedPct}%</span>
          </div>
          <div className="w-full bg-canvas-deep rounded-full h-3.5 overflow-hidden border border-line">
            <div
              className="bg-gradient-to-r from-forest-800 via-forest-700 to-moss-500 h-full rounded-full shadow-xs transition-all duration-500"
              style={{ width: `${observedPct}%` }}
            />
          </div>
        </div>

        {/* Super-Additive Delta Callout */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-line text-xs">
          <span className="text-forest-900 font-semibold flex items-center gap-1.5 font-serif">
            <CheckCircle2 className="h-4 w-4 text-emerald-700" /> Net Super-Additive Boost:
          </span>
          <span className="font-mono font-black text-forest-950 text-sm">
            +{netGainPct}% Above Mere Admixture
          </span>
        </div>
      </div>
    </div>
  );
}
