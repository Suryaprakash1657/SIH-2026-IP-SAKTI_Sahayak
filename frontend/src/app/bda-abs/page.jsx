"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  DollarSign,
  ArrowRight,
  Sprout,
  Play,
  ShieldCheck,
  Award,
  Coins,
  Building2,
  BookOpen,
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";
import { VideoExplainerModal } from "@/components/visual/VideoExplainerModal";
import { MetricGauge } from "@/components/visual/MetricGauge";
import { formatCurrencyINR } from "@/lib/utils";

const BDA_BENCHMARKS = [
  {
    name: "Domestic Ayush MSME (Cultivated Herbs)",
    entityType: "INDIAN_AYUSH_COMPANY",
    isForeign: false,
    isVaidya: false,
    source: "CULTIVATED",
    hasCert: true,
    sales: 15000000,
    herbs: "Ashwagandha, Brahmi, Curcumin",
  },
  {
    name: "Foreign-Owned / FDI Entity (Sec 3(2))",
    entityType: "FOREIGN_CONTROLLED_ENTITY",
    isForeign: true,
    isVaidya: false,
    source: "WILD_FOREST",
    hasCert: false,
    sales: 85000000,
    herbs: "Guggulu, Arjuna Bark, Shilajit",
  },
  {
    name: "Traditional Ayurvedic Vaidya / Clinic",
    entityType: "REGISTERED_AYUSH_VAIDYA",
    isForeign: false,
    isVaidya: true,
    source: "CULTIVATED",
    hasCert: true,
    sales: 2500000,
    herbs: "Classical Rasayanas",
  },
];

export default function BDAABSPage() {
  const { mode } = useLanguageStore();
  const isInnovator = mode === "innovator";

  const [selectedPreset, setSelectedPreset] = useState(0);
  const [sourceType, setSourceType] = useState(BDA_BENCHMARKS[0].source);
  const [isAyushVaidya, setIsAyushVaidya] = useState(BDA_BENCHMARKS[0].isVaidya);
  const [isForeignShareholding, setIsForeignShareholding] = useState(BDA_BENCHMARKS[0].isForeign);
  const [hasCultivationCert, setHasCultivationCert] = useState(BDA_BENCHMARKS[0].hasCert);
  const [annualSales, setAnnualSales] = useState(BDA_BENCHMARKS[0].sales);
  const [bioResources, setBioResources] = useState(BDA_BENCHMARKS[0].herbs);
  const [videoOpen, setVideoOpen] = useState(false);

  const isExempt = (sourceType === "CULTIVATED" && hasCultivationCert) || isAyushVaidya;
  const absRate = isExempt ? 0 : isForeignShareholding ? 0.005 : 0.002;
  const potentialGrossFee = annualSales * (isForeignShareholding ? 0.005 : 0.002);
  const actualPayableFee = isExempt ? 0 : potentialGrossFee;
  const totalSavings = isExempt ? potentialGrossFee : 0;

  const applyBenchmark = (idx) => {
    setSelectedPreset(idx);
    const b = BDA_BENCHMARKS[idx];
    setSourceType(b.source);
    setIsForeignShareholding(b.isForeign);
    setIsAyushVaidya(b.isVaidya);
    setHasCultivationCert(b.hasCert);
    setAnnualSales(b.sales);
    setBioResources(b.herbs);
  };

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 mx-auto space-y-8 text-ink">
      {/* Video Explainer Modal */}
      <VideoExplainerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        topicKey="forest_rules"
      />

      {/* ── 1. HEADER BANNER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brass-700 uppercase tracking-wider mb-1.5">
            <Scale className="h-4 w-4 text-brass-600" />
            {isInnovator ? "Forest Sourcing & Royalties" : "Biological Diversity Act (BDA 2024 Amended) Compliance"}
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-forest-950">
            Forest & Bio-Resource Rule Mapper
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft mt-1 max-w-2xl font-sans">
            {isInnovator
              ? "Check whether your herbal sourcing triggers farmer royalty payments (ABS) to forest tribes, and verify how cultivated herbs grant 100% statutory exemptions."
              : "Assess domestic Access & Benefit Sharing (ABS) liability under amended Section 7, determine NBA vs SBB jurisdiction, and compute statutory royalty liabilities."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-serif font-bold bg-surface-raised border border-brass-500/40 text-forest-900 hover:bg-surface transition-all shadow-xs cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-brass-600 text-brass-600" />
            <span>Forest vs Farm in 60s (Video)</span>
          </button>
          <PlainLanguageToggle compact />
        </div>
      </div>

      {/* ── 2. PRESETS STRIP ── */}
      <div className="p-4 rounded-2xl parchment-card border border-line shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-serif font-bold text-forest-950 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brass-600" />
          Sourcing Profiles:
        </span>
        <div className="flex flex-wrap gap-2">
          {BDA_BENCHMARKS.map((b, idx) => (
            <button
              key={idx}
              onClick={() => applyBenchmark(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer border ${
                selectedPreset === idx
                  ? "bg-forest-900 text-surface-raised border-forest-700 shadow-xs"
                  : "bg-surface text-ink-soft hover:text-ink hover:bg-surface-raised border-line"
              }`}
            >
              {b.name.split(" ")[0]} ({b.isForeign ? "Foreign" : b.isVaidya ? "Vaidya" : "MSME"})
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. 12-COLUMN GRID: INSTRUMENT CONSOLE (6) + VERDICT (6) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 Columns: Dark Instrument Console */}
        <div className="lg:col-span-6 space-y-6">
          <div className="console-dark p-6 sm:p-7 space-y-6 border border-brass-500/30 shadow-card text-surface">
            <div className="flex items-center justify-between pb-4 border-b border-forest-800">
              <div className="flex items-center gap-2.5">
                <Building2 className="h-4 w-4 text-brass-400" />
                <h3 className="font-serif font-bold text-base text-surface-raised">
                  Enterprise Sourcing Parameters
                </h3>
              </div>
              <span className="text-[10px] font-mono text-brass-300 font-bold">
                BDA 2024 Formula
              </span>
            </div>

            {/* Sourcing Origin Selector */}
            <div className="space-y-3">
              <label className="text-[11px] font-serif font-bold text-surface-raised block">
                Primary Botanical Sourcing Channel
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSourceType("CULTIVATED")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    sourceType === "CULTIVATED"
                      ? "bg-forest-900 border-emerald-500 text-white ring-1 ring-emerald-500"
                      : "bg-forest-950 border-forest-800 text-white/90 hover:bg-forest-900/60"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Sprout className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="font-serif font-bold text-xs text-white">Farm Cultivated</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300 font-bold block mt-0.5">
                    0% Statutory ABS
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSourceType("WILD_FOREST")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    sourceType === "WILD_FOREST"
                      ? "bg-forest-900 border-brass-500 text-white ring-1 ring-brass-500"
                      : "bg-forest-950 border-forest-800 text-white/90 hover:bg-forest-900/60"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Scale className="h-3.5 w-3.5 text-brass-400" />
                    <span className="font-serif font-bold text-xs text-white">Wild Forest</span>
                  </div>
                  <span className="text-[10px] font-mono text-brass-300 font-bold block mt-0.5">
                    0.2% - 0.5% Fee
                  </span>
                </button>
              </div>
            </div>

            {/* Toggles Strip */}
            <div className="space-y-3 pt-2 border-t border-forest-800">
              {/* Cultivation Certificate Checkbox */}
              {sourceType === "CULTIVATED" && (
                <label className="flex items-start gap-3 p-3 rounded-xl bg-forest-950 border border-forest-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasCultivationCert}
                    onChange={(e) => setHasCultivationCert(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <div className="text-xs">
                    <span className="font-serif font-bold text-white block">
                      Hold Certified Cultivated Flora Certificate (Farmer Invoice)
                    </span>
                    <span className="text-xs text-white/90 font-sans block mt-0.5">
                      Grants 100% exemption under amended Section 7 proviso of the BDA 2024.
                    </span>
                  </div>
                </label>
              )}

              {/* Registered Traditional Vaidya Toggle */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-forest-950 border border-forest-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAyushVaidya}
                  onChange={(e) => setIsAyushVaidya(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div className="text-xs">
                  <span className="font-serif font-bold text-white block">
                    Traditional Ayush Practitioner (Vaidya / Hakim)
                  </span>
                  <span className="text-xs text-white/90 font-sans block mt-0.5">
                    Practitioners dispensing classical medicines directly to patients are exempt from SBB intimation.
                  </span>
                </div>
              </label>

              {/* Foreign Shareholding Toggle */}
              <label className="flex items-start gap-3 p-3 rounded-xl bg-forest-950 border border-forest-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isForeignShareholding}
                  onChange={(e) => setIsForeignShareholding(e.target.checked)}
                  className="mt-0.5 rounded text-brass-500 focus:ring-brass-500"
                />
                <div className="text-xs">
                  <span className="font-serif font-bold text-white block">
                    Foreign Shareholding / Non-Resident Controlled (Section 3(2))
                  </span>
                  <span className="text-xs text-white/90 font-sans block mt-0.5">
                    Requires National Biodiversity Authority (NBA Chennai) prior approval and 0.5% ABS fee.
                  </span>
                </div>
              </label>
            </div>

            {/* Annual Turnover Slider */}
            <div className="space-y-3 pt-2 border-t border-forest-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-white">
                  Annual Commercial Turnover
                </span>
                <span className="font-mono text-base font-bold text-brass-300">
                  {formatCurrencyINR(annualSales)}
                </span>
              </div>
              <input
                type="range"
                min="500000"
                max="100000000"
                step="500000"
                value={annualSales}
                onChange={(e) => setAnnualSales(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] font-mono text-brass-300 font-bold">
                <span>₹5 Lakhs (Micro)</span>
                <span>₹5 Crores</span>
                <span>₹10 Crores (Large)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Columns: Metric Gauges & Financial Verdict Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="parchment-card p-6 sm:p-7 space-y-6 border border-line shadow-card text-ink">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-forest-900 border border-brass-500/40 flex items-center justify-center text-brass-400 shadow-card shrink-0">
                  <Coins className="h-5 w-5 text-brass-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brass-700">
                    Statutory Benefit Sharing Audit
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-forest-950 mt-0.5">
                    Statutory Royalty & Exemption Verdict
                  </h3>
                </div>
              </div>

              <span
                className={`text-xs px-3 py-1.5 rounded-full font-mono font-extrabold border ${
                  isExempt
                    ? "bg-emerald-50 text-emerald-950 border-emerald-500/40"
                    : "bg-brass-50 text-brass-900 border-brass-500/40"
                }`}
              >
                {isExempt ? "100% Statutory Exemption" : `${(absRate * 100).toFixed(1)}% ABS Rate`}
              </span>
            </div>

            {/* Dual Metric Gauges */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-surface border border-line">
              <MetricGauge
                value={isExempt ? 0 : (absRate * 100).toFixed(1)}
                max={1.0}
                unit="%"
                label="ABS Royalty Rate"
                sublabel={isExempt ? "0.0% Exempt" : "Turnover Levy"}
                variant={isExempt ? "emerald" : "brass"}
                statusLabel={isExempt ? "Exempt" : "Payable"}
                size="md"
              />

              <div className="flex flex-col items-center justify-center text-center p-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted block">
                  Annual Rupee Savings
                </span>
                <span className="font-mono text-2xl font-black text-emerald-700 tracking-tight block mt-1">
                  {formatCurrencyINR(totalSavings)}
                </span>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-950 border border-emerald-500/40">
                  Retained in Enterprise
                </span>
              </div>
            </div>

            {/* Financial Verdict Breakdown */}
            <div className="space-y-3 p-4 rounded-2xl bg-surface border border-line text-xs font-sans">
              <div className="flex justify-between items-center pb-2 border-b border-line">
                <span className="text-ink-soft">Potential Gross ABS Liability:</span>
                <span className="font-mono font-bold text-ink">{formatCurrencyINR(potentialGrossFee)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-line">
                <span className="text-ink-soft">Statutory Farm Exemption Credit:</span>
                <span className="font-mono font-bold text-emerald-700">-{formatCurrencyINR(totalSavings)}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-serif font-bold text-forest-950 text-sm">Net Payable Fee:</span>
                <span className="font-mono font-black text-lg text-forest-950">
                  {formatCurrencyINR(actualPayableFee)}
                </span>
              </div>
            </div>

            {/* Detailed Statutory Route */}
            <div
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                isExempt
                  ? "bg-emerald-50/60 border-emerald-300 text-emerald-950"
                  : "bg-brass-50/60 border-brass-300 text-amber-950"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-surface-raised border border-line shrink-0 mt-0.5">
                  {isExempt ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-brass-700" />
                  )}
                </div>
                <div>
                  <span className="font-serif font-bold text-sm block mb-0.5">
                    {isExempt
                      ? "Zero Royalty Liability (BDA 2024 Proviso Applied)"
                      : isForeignShareholding
                      ? "National Biodiversity Authority (NBA Form III Required)"
                      : "State Biodiversity Board (SBB Form I Prior Intimation Required)"}
                  </span>
                  <p className="font-sans text-ink-soft">
                    {isExempt
                      ? "Your botanical ingredients are certified farm-cultivated or dispensed under the Vaidya exemption. You owe 0% royalties. Maintain farmer purchase receipts in your AYUSH manufacturing file."
                      : isForeignShareholding
                      ? "Because the entity has foreign participation or non-resident control under Section 3(2), you must obtain prior approval from the NBA in Chennai before commercialization."
                      : "Wild forest harvesting requires filing Form I prior intimation to the State Biodiversity Board and contributing 0.2% of turnover to the Local Biodiversity Fund."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. STATUTORY CITATIONS & GAZETTE REFERENCE ── */}
      <div className="parchment-card p-6 sm:p-7 space-y-4 border border-line shadow-card text-ink">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-brass-700 uppercase tracking-wider">
          <BookOpen className="h-4 w-4 text-brass-600" />
          Statutory Grounding & Act Citations
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5">
            <span className="font-serif font-bold text-forest-950 block">
              Section 7 Proviso (BDA 2024)
            </span>
            <p className="text-ink-soft leading-relaxed text-[11px]">
              &ldquo;Provided that this requirement shall not apply to local people, vaids and hakims, nor to cultivated medicinal plants.&rdquo;
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5">
            <span className="font-serif font-bold text-forest-950 block">
              Section 3(2) (Foreign Ownership)
            </span>
            <p className="text-ink-soft leading-relaxed text-[11px]">
              Requires mandatory NBA Chennai approval prior to obtaining any bio-resource if foreign individuals or entities hold shares.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-line space-y-1.5">
            <span className="font-serif font-bold text-forest-950 block">
              Section 40 (Normal Trade Flora)
            </span>
            <p className="text-ink-soft leading-relaxed text-[11px]">
              Exempts normally traded agricultural commodities from ABS provisions when traded strictly as agricultural produce.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
