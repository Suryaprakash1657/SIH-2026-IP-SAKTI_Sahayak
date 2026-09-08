"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FlaskConical,
  Sparkles,
  FileSpreadsheet,
  Copy,
  Check,
  ArrowRight,
  Play,
  Zap,
  Activity,
  Sliders,
  Award,
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";
import { VideoExplainerModal } from "@/components/visual/VideoExplainerModal";
import { VisualSynergyMeter } from "@/components/visual/VisualSynergyMeter";

const SYNERGY_PRESETS = [
  {
    name: "Ashwagandha + Brahmi (Neuro Supercharge)",
    herbA: "Withania somnifera Extract (Withanolides 5%)",
    herbB: "Bacopa monnieri Extract (Bacosides 20%)",
    assay: "Acetylcholinesterase (AChE) Enzyme Inhibition Assay",
    doseA: 25,
    effectA: 28,
    doseB: 25,
    effectB: 32,
    combEffect: 86,
  },
  {
    name: "Curcumin + Piperine (20x Bioavailability Boost)",
    herbA: "Curcuma longa (Curcuminoids 95%)",
    herbB: "Piper nigrum (Piperine 95%)",
    assay: "Anti-Inflammatory COX-2 Inhibition Assay",
    doseA: 50,
    effectA: 34,
    doseB: 10,
    effectB: 18,
    combEffect: 89,
  },
  {
    name: "Licorice + Ginger (Simple Tea Mix - Failed Synergy)",
    herbA: "Glycyrrhiza glabra (Licorice Extract)",
    herbB: "Zingiber officinale (Ginger Extract)",
    assay: "Free Radical DPPH Scavenging Assay",
    doseA: 30,
    effectA: 30,
    doseB: 30,
    effectB: 28,
    combEffect: 49,
  },
];

export default function SynergismPage() {
  const { mode } = useLanguageStore();
  const isInnovator = mode === "innovator";

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [formulationName, setFormulationName] = useState(SYNERGY_PRESETS[0].name);
  const [herbAName, setHerbAName] = useState(SYNERGY_PRESETS[0].herbA);
  const [herbBName, setHerbBName] = useState(SYNERGY_PRESETS[0].herbB);
  const [assayType, setAssayType] = useState(SYNERGY_PRESETS[0].assay);

  // Live Reactive Sliders
  const [doseA, setDoseA] = useState(SYNERGY_PRESETS[0].doseA);
  const [effectA, setEffectA] = useState(SYNERGY_PRESETS[0].effectA);
  const [doseB, setDoseB] = useState(SYNERGY_PRESETS[0].doseB);
  const [effectB, setEffectB] = useState(SYNERGY_PRESETS[0].effectB);
  const [combEffect, setCombEffect] = useState(SYNERGY_PRESETS[0].combEffect);

  const [videoOpen, setVideoOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const computeMetrics = () => {
    const ea = Math.max(0.01, Math.min(0.99, effectA / 100));
    const eb = Math.max(0.01, Math.min(0.99, effectB / 100));
    const expectedAdditive = Number((ea + eb - ea * eb).toFixed(2));
    const observed = Number((combEffect / 100).toFixed(2));
    const foldEnhancement = Number((observed / Math.max(expectedAdditive, 0.01)).toFixed(2));

    const termComb = (1 - observed) / observed;
    const termSingle = (1 - ea) / ea + (1 - eb) / eb;
    const rawCI = termComb / termSingle;
    const ci = isNaN(rawCI) || rawCI <= 0 ? 0.62 : Number(Math.min(rawCI, 2.0).toFixed(2));

    const isSynergistic = ci < 0.9;
    const isAntagonistic = ci > 1.1;

    return {
      ci,
      expectedAdditive,
      observed,
      foldEnhancement,
      isSynergistic,
      isAntagonistic,
      classification: isSynergistic
        ? "SUPER_ADDITIVE_SYNERGISM"
        : isAntagonistic
        ? "ANTAGONISTIC_REACTION"
        : "MERE_ADDITIVE_ADMIXTURE",
    };
  };

  const metrics = computeMetrics();

  const applyPreset = (idx) => {
    setSelectedPresetIndex(idx);
    const p = SYNERGY_PRESETS[idx];
    setFormulationName(p.name);
    setHerbAName(p.herbA);
    setHerbBName(p.herbB);
    setAssayType(p.assay);
    setDoseA(p.doseA);
    setEffectA(p.effectA);
    setDoseB(p.doseB);
    setEffectB(p.effectB);
    setCombEffect(p.combEffect);
  };

  const generatedPatentClaim = `A synergistic herbal composition comprising ${herbAName} and ${herbBName}, wherein said composition exhibits a Chou-Talalay Combination Index (CI) of ${metrics.ci} (< 0.9) in ${assayType}, and wherein the observed therapeutic effect exceeds expected mathematical additivity by ${Math.max(0, Math.round((metrics.observed - metrics.expectedAdditive) * 100))}%.`;

  const copyClaim = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-8 mx-auto space-y-8">
      {/* Video Explainer Modal */}
      <VideoExplainerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        topicKey="synergy_booster"
      />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1e40af] uppercase tracking-wider mb-1.5">
            <Zap className="h-4 w-4 text-[#2563eb]" />
            {isInnovator ? "The 1 + 1 = 3 Test" : "Patents Act Section 3(e) Synergism Engine"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#0a1c16]">
            The Herbal Booster & Synergy Evaluator
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl font-sans">
            {isInnovator
              ? "Patent law rejects ordinary herbal mixtures. Use this laboratory simulator to prove that your herbs supercharge each other to clear patent hurdles."
              : "Compute the Chou-Talalay Combination Index (CI) and Webb's Fractional Product to mathematically defeat Indian Patent Office 'mere admixture' rejections."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#eff6ff] border border-[#2563eb]/40 text-[#1e40af] hover:bg-[#dbeafe] transition-all shadow-xs cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-[#2563eb] text-[#2563eb]" />
            <span>How to Prove Synergy (2 min)</span>
          </button>
          <PlainLanguageToggle compact />
        </div>
      </div>

      {/* Preset Assays Picker */}
      <div className="p-4 rounded-2xl parchment-card border border-[#d6ccb8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-serif font-bold text-[#0e2720] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#2563eb]" />
          Laboratory Assay Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {SYNERGY_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPresetIndex === idx
                  ? "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white shadow-sm font-bold border border-[#3b82f6]"
                  : "bg-[#eee7d7] text-stone-700 hover:bg-[#e4dcce]"
              }`}
            >
              {p.name.split(" ")[0]} ({p.combEffect > 70 ? "Synergistic" : "Failed"})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Assay Sliders */}
        <div className="lg:col-span-6 space-y-6">
          <div className="parchment-card p-6 sm:p-8 rounded-3xl space-y-5 border border-[#d6ccb8] shadow-luxury">
            <div className="flex items-center justify-between border-b border-[#e8dfcf] pb-4">
              <h2 className="text-base font-serif font-bold text-[#0e2720] flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-[#2563eb]" />
                Live Laboratory Testing Console
              </h2>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#eff6ff] text-[#1e40af] border border-[#2563eb]/30 font-bold">
                Real-Time Chou-Talalay Math
              </span>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-stone-700 block mb-1.5 uppercase">
                Herbal Formulation Title
              </label>
              <input
                type="text"
                value={formulationName}
                onChange={(e) => setFormulationName(e.target.value)}
                className="w-full text-sm bg-white border border-[#d6ccb8] rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb] shadow-xs font-serif"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono font-bold text-stone-600 block mb-1 uppercase">
                  Herb A Active Extract
                </label>
                <input
                  type="text"
                  value={herbAName}
                  onChange={(e) => setHerbAName(e.target.value)}
                  className="w-full text-xs bg-white border border-[#d6ccb8] rounded-xl px-3 py-2 text-stone-900"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono font-bold text-stone-600 block mb-1 uppercase">
                  Herb B Active Extract
                </label>
                <input
                  type="text"
                  value={herbBName}
                  onChange={(e) => setHerbBName(e.target.value)}
                  className="w-full text-xs bg-white border border-[#d6ccb8] rounded-xl px-3 py-2 text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono font-bold text-stone-600 block mb-1 uppercase">
                Biological Screen / Biomarker Assay
              </label>
              <input
                type="text"
                value={assayType}
                onChange={(e) => setAssayType(e.target.value)}
                className="w-full text-xs bg-white border border-[#d6ccb8] rounded-xl px-3 py-2 text-stone-900 font-mono"
              />
            </div>

            {/* Interactive Tactile Sliders */}
            <div className="space-y-4 pt-3 border-t border-[#e8dfcf]">
              <span className="text-xs font-serif font-bold text-[#0e2720] block">
                Adjust Bioactivity Readings (Move Sliders):
              </span>

              {/* Herb A Slider */}
              <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-2 shadow-xs">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">
                    Herb A Single Power: {effectA}%
                  </span>
                  <span className="font-mono text-[#1e40af] font-bold">{effectA}% effect</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={effectA}
                  onChange={(e) => setEffectA(Number(e.target.value))}
                  className="w-full slider-brass cursor-pointer"
                />
              </div>

              {/* Herb B Slider */}
              <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-2 shadow-xs">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">
                    Herb B Single Power: {effectB}%
                  </span>
                  <span className="font-mono text-[#1e40af] font-bold">{effectB}% effect</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={effectB}
                  onChange={(e) => setEffectB(Number(e.target.value))}
                  className="w-full slider-brass cursor-pointer"
                />
              </div>

              {/* Combination Slider */}
              <div className="p-4 rounded-2xl bg-[#edf6f2] border border-[#2d7f63]/40 space-y-2 shadow-xs">
                <div className="flex justify-between text-xs">
                  <span className="font-serif font-bold text-[#144d3c]">
                    Observed Combination Power (A + B Together): {combEffect}%
                  </span>
                  <span className="font-mono text-[#144d3c] font-black text-sm">
                    {combEffect}%
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  value={combEffect}
                  onChange={(e) => setCombEffect(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
                <p className="text-[10px] text-stone-600 font-sans">
                  Slide higher to simulate biological supercharging and lower to preview Section 3(e) rejections.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Synergy Gauge & Plain Claims */}
        <div className="lg:col-span-6 space-y-6">
          <VisualSynergyMeter
            ci={metrics.ci}
            expectedAdditivity={metrics.expectedAdditive}
            observedEffect={metrics.observed}
            foldEnhancement={metrics.foldEnhancement}
            herbAName={herbAName}
            herbBName={herbBName}
          />

          {/* Generated IPO Form 2 Claim Box */}
          <div className="parchment-card p-6 sm:p-7 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-luxury">
            <div className="flex items-center justify-between border-b border-[#e8dfcf] pb-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0e2720] flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-[#2563eb]" />
                {isInnovator ? "Ready-to-Use Patent Claim Draft" : "IPO Form 2 Synergistic Claim Language"}
              </h4>
              <button
                onClick={() => copyClaim(generatedPatentClaim)}
                className="text-xs font-bold text-stone-700 hover:text-stone-950 flex items-center gap-1.5 bg-[#eee7d7] hover:bg-[#e4dcce] px-3 py-1.5 rounded-xl border border-[#d6ccb8] transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-[#144d3c]" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy Claim"}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#ded5c2] text-xs font-mono text-stone-900 leading-relaxed shadow-inner">
              "{generatedPatentClaim}"
            </div>

            <p className="text-[11px] text-stone-600 leading-normal font-sans">
              {metrics.isSynergistic
                ? "✅ This wording explicitly cites mathematical non-obviousness under the IPAB guidelines, preemptively defeating Section 3(e) objections."
                : "⚠️ Because CI exceeds 0.9, this claim will likely be rejected as a mere admixture. Adjust the combination effect higher or formulate an alternative delivery system."}
            </p>

            <div className="pt-2 flex justify-end">
              <Link
                href="/dossier"
                className="text-xs font-bold px-5 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white hover:from-[#3b82f6] hover:to-[#2563eb] transition-all flex items-center gap-2 shadow-md hover:scale-102 cursor-pointer"
              >
                <span>Export Claim into Patent Dossier</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
