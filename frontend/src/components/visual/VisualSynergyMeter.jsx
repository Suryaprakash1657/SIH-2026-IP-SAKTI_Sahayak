"use client";

import React from "react";
import { Zap, Activity, AlertCircle, CheckCircle2 } from "lucide-react";

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
    <div className="parchment-card p-6 sm:p-7 rounded-3xl space-y-6 border border-[#d6ccb8] shadow-luxury">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e8e0ce]">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1e40af] flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[#2563eb]" /> Laboratory Synergism Theorem
          </span>
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#0e2720] mt-0.5">
            Chou-Talalay Combination Index ($CI$) Console
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase text-stone-500 block">Calculated Value</span>
            <span className="text-2xl font-black font-mono tracking-tight text-[#144d3c]">
              CI = {ci}
            </span>
          </div>
          <span
            className={`text-xs px-3 py-1.5 rounded-xl font-mono font-extrabold border ${
              isSynergistic
                ? "bg-[#e2efe8] text-[#144d3c] border-[#2d7f63]/40"
                : isAntagonistic
                ? "bg-rose-50 text-rose-900 border-rose-300"
                : "bg-blue-50 text-blue-900 border-blue-300"
            }`}
          >
            {foldEnhancement}x Boost
          </span>
        </div>
      </div>

      {/* Visual Analogy Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
          isSynergistic
            ? "bg-gradient-to-r from-[#edf6f2] via-[#f7faf8] to-[#f4f0e6] border-[#2d7f63]/30"
            : isAntagonistic
            ? "bg-rose-50/70 border-rose-200"
            : "bg-blue-50/70 border-blue-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`h-11 w-11 rounded-xl flex items-center justify-center font-black text-lg border shadow-xs ${
              isSynergistic
                ? "bg-[#144d3c] text-[#f4ecd8] border-[#2d7f63]"
                : "bg-[#1e40af] text-white border-[#3b82f6]"
            }`}
          >
            {isSynergistic ? "⚡" : "⚠️"}
          </div>
          <div>
            <h4 className="text-sm font-serif font-bold text-[#0e2720]">
              {isSynergistic
                ? "Super-Additive Synergism (1 + 1 = 3+)"
                : isAntagonistic
                ? "Antagonistic Interference (Efficacy Cancelled)"
                : "Mere Admixture (1 + 1 = 2 Simple Sum)"}
            </h4>
            <p className="text-xs text-stone-600 mt-0.5 leading-normal">
              {isSynergistic
                ? `Observed biological bioactivity exceeds mathematical additivity by +${netGainPct}%. Section 3(e) objection cleared!`
                : "Combination only matches the simple arithmetic sum of single herbs. IPO Section 3(e) rejections expected."}
            </p>
          </div>
        </div>
      </div>

      {/* Chou-Talalay Precision Dial Graphic */}
      <div className="space-y-2.5 pt-2">
        <div className="flex justify-between text-xs font-mono font-bold">
          <span className="text-[#144d3c]">Synergistic (&lt; 0.9)</span>
          <span className="text-[#2563eb]">Additive (0.9 - 1.1)</span>
          <span className="text-rose-700">Antagonistic (&gt; 1.1)</span>
        </div>

        {/* Gauge Bar with Precision Needle */}
        <div className="relative h-6 rounded-full bg-[#e8e0ce] border border-[#d3c8b2] p-1 overflow-visible shadow-inner">
          {/* Gradient zones */}
          <div className="h-full w-full rounded-full flex overflow-hidden">
            <div className="w-[45%] bg-gradient-to-r from-[#123c33] via-[#1b5a4b] to-[#2d7f63]" />
            <div className="w-[20%] bg-[#60a5fa]" />
            <div className="w-[35%] bg-gradient-to-r from-amber-600 to-rose-600" />
          </div>

          {/* Needle Indicator */}
          <div
            className="absolute top-[-7px] -translate-x-1/2 flex flex-col items-center transition-all duration-500 z-20"
            style={{ left: `${needlePercent}%` }}
          >
            <div className="h-9 w-2.5 rounded-full bg-[#0a1c16] shadow-md border-2 border-white" />
            <span className="text-[10px] font-mono font-bold text-[#0a1c16] bg-white px-2 py-0.5 rounded-md shadow-md border border-[#2563eb]/50 mt-1 whitespace-nowrap">
              CI {ci}
            </span>
          </div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-stone-500 pt-3">
          <span>0.20 (Extreme Potency)</span>
          <span>1.00 (Simple Mixture)</span>
          <span>1.80 (Inhibition)</span>
        </div>
      </div>

      {/* Comparative Bioactivity Bars */}
      <div className="space-y-4 pt-4 border-t border-[#e8e0ce]">
        {/* Baseline Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-stone-600">
            <span className="font-mono text-[11px]">Expected Additive Baseline (Webb's Equation)</span>
            <span className="font-mono text-stone-800 font-bold">{expectedPct}%</span>
          </div>
          <div className="w-full bg-[#e8e0ce] rounded-full h-3.5 overflow-hidden border border-[#d3c8b2]">
            <div
              className="bg-stone-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${expectedPct}%` }}
            />
          </div>
        </div>

        {/* Observed Synergistic Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-[#144d3c]">
            <span className="font-serif text-xs">Observed Experimental Bioactivity (Herbs Combined)</span>
            <span className="font-mono text-[#144d3c] text-sm font-black">{observedPct}%</span>
          </div>
          <div className="w-full bg-[#e8e0ce] rounded-full h-3.5 overflow-hidden border border-[#d3c8b2]">
            <div
              className="bg-gradient-to-r from-[#144d3c] via-[#22705d] to-[#34a383] h-full rounded-full shadow-sm transition-all duration-500"
              style={{ width: `${observedPct}%` }}
            />
          </div>
        </div>

        {/* Super-Additive Delta Callout */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#e8f3ed] to-[#fbf8f0] border border-[#2d7f63]/30 text-xs">
          <span className="text-[#144d3c] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#1b5a4b]" /> Net Super-Additive Boost:
          </span>
          <span className="font-mono font-black text-[#144d3c] text-sm">
            +{netGainPct}% Above Mere Admixture
          </span>
        </div>
      </div>
    </div>
  );
}
