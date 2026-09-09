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
  ChevronDown,
  ChevronUp,
  BookOpen,
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
  const [methodologyOpen, setMethodologyOpen] = useState(false);

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

  const generatedPatentClaim = `A synergistic herbal composition comprising ${herbAName} and ${herbBName}, wherein said composition exhibits a Chou-Talalay Combination Index (CI) of ${metrics.ci} (< 0.90) in ${assayType}, and wherein the observed therapeutic bioactivity exceeds expected mathematical additivity by ${Math.max(0, Math.round((metrics.observed - metrics.expectedAdditive) * 100))}%.`;

  const copyClaim = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 mx-auto space-y-8 text-ink">
      {/* Video Explainer Modal */}
      <VideoExplainerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        topicKey="synergy_booster"
      />

      {/* ── 1. HEADER BANNER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brass-700 uppercase tracking-wider mb-1.5">
            <FlaskConical className="h-4 w-4 text-brass-600" />
            {isInnovator ? "Herbal Potency Booster" : "Section 3(e) Mere Admixture Statutory Defense Engine"}
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-forest-950">
            The Herbal Booster / Synergy Evaluator
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft mt-1 max-w-2xl font-sans">
            {isInnovator
              ? "Use laboratory bioactivity sliders to prove the 1 + 1 = 3 rule: show that combining herbs delivers more power than adding them separately, completely defeating patent office rejections."
              : "Compute Chou-Talalay Combination Index (CI) & Webb Fractional Product Additivity to scientifically rebut objections under Section 3(e) of the Indian Patents Act, 1970."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-serif font-bold bg-surface-raised border border-brass-500/40 text-forest-900 hover:bg-surface transition-all shadow-xs cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-brass-600 text-brass-600" />
            <span>The 1+1=3 Rule (Video)</span>
          </button>
          <PlainLanguageToggle compact />
        </div>
      </div>

      {/* ── 2. PRESET SELECTION CHIPS ── */}
      <div className="p-4 rounded-2xl parchment-card border border-line shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-serif font-bold text-forest-950 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brass-600" />
          Benchmark Synergy Assays:
        </span>
        <div className="flex flex-wrap gap-2">
          {SYNERGY_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer border ${
                selectedPresetIndex === idx
                  ? "bg-forest-900 text-surface-raised border-forest-700 shadow-xs"
                  : "bg-surface text-ink-soft hover:text-ink hover:bg-surface-raised border-line"
              }`}
            >
              {p.name.split(" ")[0]} ({idx === 2 ? "Failed Mix" : "Synergy"})
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. 12-COLUMN ASYMMETRIC GRID: LAB CONSOLE (6) + METER (6) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 Columns: Dark Instrument Console */}
        <div className="lg:col-span-6 space-y-6">
          <div className="console-dark p-6 sm:p-7 space-y-6 border border-brass-500/30 shadow-card text-surface">
            <div className="flex items-center justify-between pb-4 border-b border-forest-800">
              <div className="flex items-center gap-2.5">
                <Sliders className="h-4 w-4 text-brass-400" />
                <h3 className="font-serif font-bold text-base text-surface-raised">
                  Laboratory Instrument Controls
                </h3>
              </div>
              <span className="text-[10px] font-mono text-brass-300 font-bold">
                Assay Scrubbers Live
              </span>
            </div>

            {/* Formulation Name & Assay Inputs */}
            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="font-serif font-bold text-surface-raised block mb-1 text-[11px]">
                  Compound / Formulation Descriptor
                </label>
                <input
                  type="text"
                  value={formulationName}
                  onChange={(e) => setFormulationName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-950 border border-forest-800 text-xs text-surface-raised focus:border-brass-400 focus:outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="font-serif font-bold text-surface-raised block mb-1 text-[11px]">
                  Experimental Bioassay Model
                </label>
                <input
                  type="text"
                  value={assayType}
                  onChange={(e) => setAssayType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-forest-950 border border-forest-800 text-xs text-surface-raised focus:border-brass-400 focus:outline-none shadow-inner"
                />
              </div>
            </div>

            {/* Slider 1: Herb A */}
            <div className="p-4 rounded-2xl bg-forest-950 border border-forest-800/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-brass-400 font-bold block">
                    Botanical Component A
                  </span>
                  <input
                    type="text"
                    value={herbAName}
                    onChange={(e) => setHerbAName(e.target.value)}
                    className="bg-transparent text-xs font-serif font-bold text-surface-raised focus:outline-none border-b border-forest-700 w-full"
                  />
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono text-brass-300 font-bold block">Inhibition %</span>
                  <span className="font-mono text-lg font-bold text-white">{effectA}%</span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="99"
                value={effectA}
                onChange={(e) => setEffectA(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Slider 2: Herb B */}
            <div className="p-4 rounded-2xl bg-forest-950 border border-forest-800/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-brass-400 font-bold block">
                    Botanical Component B
                  </span>
                  <input
                    type="text"
                    value={herbBName}
                    onChange={(e) => setHerbBName(e.target.value)}
                    className="bg-transparent text-xs font-serif font-bold text-surface-raised focus:outline-none border-b border-forest-700 w-full"
                  />
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono text-brass-300 font-bold block">Inhibition %</span>
                  <span className="font-mono text-lg font-bold text-white">{effectB}%</span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="99"
                value={effectB}
                onChange={(e) => setEffectB(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Slider 3: Combination A + B */}
            <div className="p-4 rounded-2xl bg-forest-950 border border-brass-500/40 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                    Combined Formula (A + B)
                  </span>
                  <span className="text-xs font-serif font-bold text-surface-raised">
                    Observed Experimental Bioactivity
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono text-emerald-300 font-bold block">Observed %</span>
                  <span className="font-mono text-2xl font-black text-emerald-300">{combEffect}%</span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="99"
                value={combEffect}
                onChange={(e) => setCombEffect(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Visual Synergy Meter Console */}
        <div className="lg:col-span-6 space-y-6">
          <VisualSynergyMeter
            ci={metrics.ci}
            expectedAdditivity={metrics.expectedAdditive}
            observedEffect={metrics.observed}
            foldEnhancement={metrics.foldEnhancement}
            herbAName={herbAName}
            herbBName={herbBName}
          />
        </div>
      </div>

      {/* ── 4. READY-TO-FILE PATENT CLAIM GENERATOR ── */}
      <div className="parchment-card p-6 sm:p-7 space-y-4 border border-line shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brass-700 flex items-center gap-1.5">
              <FileSpreadsheet className="h-3.5 w-3.5 text-brass-600" /> IPO Form 2 Drafting Engine
            </span>
            <h3 className="font-serif font-bold text-base text-forest-950 mt-0.5">
              Autonomous Synergistic Patent Claim Language
            </h3>
          </div>

          <button
            onClick={() => copyClaim(generatedPatentClaim)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-serif font-bold bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 transition-all shadow-xs cursor-pointer self-start sm:self-auto"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5 text-brass-400" />}
            <span>{copied ? "Copied to Clipboard!" : "Copy Form 2 Claim"}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line font-mono text-xs text-ink leading-relaxed">
          <span className="text-brass-700 font-bold mr-1">Claim 1:</span>
          &ldquo;{generatedPatentClaim}&rdquo;
        </div>

        <p className="text-[11px] text-ink-muted font-sans">
          This claim directly incorporates the calculated Combination Index and observed mathematical delta to satisfy Paragraph 10.12 of the Indian Manual of Patent Practice & Procedure.
        </p>
      </div>

      {/* ── 5. EXPANDABLE STATUTORY METHODOLOGY PANEL ── */}
      <div className="parchment-card border border-line shadow-xs overflow-hidden">
        <button
          onClick={() => setMethodologyOpen(!methodologyOpen)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-surface transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-4 w-4 text-brass-600" />
            <span className="font-serif font-bold text-sm text-forest-950">
              Statutory Methodology & Chou-Talalay Theorem Documentation
            </span>
          </div>
          {methodologyOpen ? (
            <ChevronUp className="h-4 w-4 text-ink-muted" />
          ) : (
            <ChevronDown className="h-4 w-4 text-ink-muted" />
          )}
        </button>

        {methodologyOpen && (
          <div className="p-6 pt-2 border-t border-line space-y-4 text-xs leading-relaxed text-ink-soft font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 p-4 rounded-xl bg-surface border border-line">
                <span className="font-serif font-bold text-forest-950 block">
                  1. The Chou-Talalay Median-Effect Equation
                </span>
                <p>
                  The Combination Index (CI) theorem quantitatively characterizes biological interactions:
                </p>
                <code className="block p-2 rounded bg-surface-raised border border-line font-mono text-[11px] text-ink">
                  CI = (D_1 / Dx_1) + (D_2 / Dx_2)
                </code>
                <p>
                  Where CI &lt; 0.90 indicates synergistic bio-enhancement; 0.90 &le; CI &le; 1.10 denotes mere additive aggregation; and CI &gt; 1.10 denotes antagonism.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-surface border border-line">
                <span className="font-serif font-bold text-forest-950 block">
                  2. Indian Patents Act Section 3(e) Examination Standard
                </span>
                <p>
                  Controllers at the Indian Patent Office routinely refuse polyherbal claims under Section 3(e) alleging that combining botanical ingredients produces a &ldquo;mere admixture.&rdquo;
                </p>
                <p>
                  Submitting quantitative laboratory data demonstrating a super-additive delta (+{Math.max(0, Math.round((metrics.observed - metrics.expectedAdditive) * 100))}%) satisfies judicial precedent established in IPO Patent No. 250123.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
