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
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";
import { VideoExplainerModal } from "@/components/visual/VideoExplainerModal";
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
    <div className="container max-w-7xl py-8 px-4 sm:px-8 mx-auto space-y-8">
      {/* Video Explainer Modal */}
      <VideoExplainerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        topicKey="forest_rules"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#144d3c] uppercase tracking-wider mb-1.5">
            <Scale className="h-4 w-4 text-[#1b5a4b]" />
            {isInnovator ? "Forest Sourcing & Royalties" : "Biological Diversity Act (BDA 2024) Compliance"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#0a1c16]">
            Forest & Bio-Resource Rule Mapper
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl font-sans">
            {isInnovator
              ? "Check whether your herbal sourcing triggers farmer royalty payments (ABS) to forest tribes, and verify how cultivated herbs grant 100% statutory exemptions."
              : "Assess domestic Access & Benefit Sharing (ABS) liability under amended Section 7, determine NBA vs SBB jurisdiction, and calculate statutory royalty fees."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#fbf8f2] border border-[#2d7f63]/40 text-[#144d3c] hover:bg-[#eaf3ee] transition-all shadow-xs"
          >
            <Play className="h-3.5 w-3.5 fill-[#1b5a4b] text-[#1b5a4b]" />
            <span>Forest vs Farm in 60s (Video)</span>
          </button>
          <PlainLanguageToggle compact />
        </div>
      </div>

      {/* Quick Presets */}
      <div className="p-4 rounded-2xl parchment-card border border-[#d6ccb8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-serif font-bold text-[#0e2720] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#2563eb]" />
          Sourcing Profiles:
        </span>
        <div className="flex flex-wrap gap-2">
          {BDA_BENCHMARKS.map((b, idx) => (
            <button
              key={idx}
              onClick={() => applyBenchmark(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedPreset === idx
                  ? "bg-[#144d3c] text-white font-extrabold shadow-sm border border-[#2d7f63]"
                  : "bg-[#eee7d7] text-stone-700 hover:bg-[#e4dcce]"
              }`}
            >
              {b.name.split(" ")[0]} ({b.source === "CULTIVATED" ? "Farm Exempt" : "Wild Forest"})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sourcing Assessment Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="parchment-card p-6 sm:p-8 rounded-3xl space-y-6 border border-[#d6ccb8] shadow-luxury">
            <h2 className="text-base font-serif font-bold text-[#0e2720] flex items-center gap-2 border-b border-[#e8dfcf] pb-4">
              <Sprout className="h-5 w-5 text-[#1b5a4b]" />
              Sourcing & Legal Profile
            </h2>

            {/* Question 1: Sourcing Origin Toggle */}
            <div className="space-y-2.5">
              <label className="text-xs font-serif font-bold text-stone-800 block">
                1. Where are your medicinal plants harvested?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSourceType("CULTIVATED")}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    sourceType === "CULTIVATED"
                      ? "bg-[#edf6f2] border-[#22705d] ring-2 ring-[#22705d]/30 shadow-md"
                      : "bg-white border-[#ded5c2] text-stone-600 hover:bg-[#faf7f0]"
                  }`}
                >
                  <span className="text-3xl block mb-1">🚜</span>
                  <span className="text-xs font-serif font-bold text-stone-900 block">Cultivated Farms</span>
                  <span className="text-[10px] text-[#144d3c] font-mono font-bold">0% ABS Fee (Exempt)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSourceType("WILD_FOREST")}
                  className={`p-5 rounded-2xl border text-left transition-all ${
                    sourceType === "WILD_FOREST"
                      ? "bg-[#eff6ff] border-[#2563eb] ring-2 ring-[#2563eb]/30 shadow-md"
                      : "bg-white border-[#ded5c2] text-stone-600 hover:bg-[#faf7f0]"
                  }`}
                >
                  <span className="text-3xl block mb-1">🌲</span>
                  <span className="text-xs font-serif font-bold text-stone-900 block">Wild Forest / Tribal</span>
                  <span className="text-[10px] text-[#1e40af] font-mono font-bold">0.2% - 0.5% SBB Fee</span>
                </button>
              </div>
            </div>

            {/* Question 2: Vaidya Practitioner Exemption */}
            <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-3.5 shadow-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAyushVaidya}
                  onChange={(e) => setIsAyushVaidya(e.target.checked)}
                  className="h-4 w-4 rounded text-[#144d3c] focus:ring-[#144d3c] mt-0.5 accent-[#144d3c]"
                />
                <div>
                  <span className="text-xs font-serif font-bold text-stone-900 block">
                    Registered Traditional Vaidya / Hakim Exemption
                  </span>
                  <p className="text-[11px] text-stone-600 leading-normal font-sans mt-0.5">
                    Under amended BDA 2024 Section 7 proviso, registered Ayush practitioners who prepare remedies for individual patients are 100% exempt from SBB intimation and royalties.
                  </p>
                </div>
              </label>

              {sourceType === "CULTIVATED" && (
                <label className="flex items-start gap-3 cursor-pointer pt-3 border-t border-[#e8dfcf]">
                  <input
                    type="checkbox"
                    checked={hasCultivationCert}
                    onChange={(e) => setHasCultivationCert(e.target.checked)}
                    className="h-4 w-4 rounded text-[#144d3c] focus:ring-[#144d3c] mt-0.5 accent-[#144d3c]"
                  />
                  <div>
                    <span className="text-xs font-serif font-bold text-stone-900 block">
                      Has Valid Cultivation Certificate (RFO / Panchayat)
                    </span>
                    <p className="text-[11px] text-stone-600 leading-normal font-sans mt-0.5">
                      Proof that raw herbs were cultivated by registered farmers, satisfying statutory verification requirements.
                    </p>
                  </div>
                </label>
              )}
            </div>

            {/* Question 3: Foreign Ownership Check */}
            <div className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-2 shadow-xs">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isForeignShareholding}
                  onChange={(e) => setIsForeignShareholding(e.target.checked)}
                  className="h-4 w-4 rounded text-[#1e40af] focus:ring-[#2563eb] mt-0.5 accent-[#2563eb]"
                />
                <div>
                  <span className="text-xs font-serif font-bold text-stone-900 block">
                    Foreign Investment / Non-Indian Controlled Entity (Section 3(2))
                  </span>
                  <p className="text-[11px] text-stone-600 leading-normal font-sans mt-0.5">
                    Check if your company has foreign shareholding or directors. This transfers jurisdiction from the State Biodiversity Board to the National Biodiversity Authority (NBA Chennai).
                  </p>
                </div>
              </label>
            </div>

            {/* Question 4: Gross Turnover Slider */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between text-xs">
                <span className="font-serif font-bold text-stone-800">
                  Annual Ex-Factory Gross Sales of Formulation
                </span>
                <span className="font-mono text-[#144d3c] font-black text-sm">
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
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slateLegal-600 font-semibold font-mono">
                <span>₹5 Lakhs</span>
                <span>₹5 Crores</span>
                <span>₹10 Crores</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Royalty Meter, Savings & Compliance Roadmap */}
        <div className="lg:col-span-6 space-y-6">
          <div className="parchment-card p-6 sm:p-8 rounded-3xl space-y-5 border border-[#d6ccb8] shadow-luxury">
            <div className="flex items-center justify-between border-b border-[#e8dfcf] pb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#144d3c] flex items-center gap-1.5">
                <Coins className="h-4 w-4 text-[#2563eb]" /> Benefit-Sharing Fee Calculator
              </span>
              <span
                className={`text-xs px-3.5 py-1 rounded-full font-black font-mono border ${
                  isExempt
                    ? "bg-[#e2efe8] text-[#144d3c] border-[#2d7f63]/40"
                    : "bg-[#eff6ff] text-[#1e40af] border-[#2563eb]/40"
                }`}
              >
                {isExempt ? "0.0% RATE (EXEMPT)" : `${(absRate * 100).toFixed(1)}% APPLICABLE`}
              </span>
            </div>

            {/* Big Currency Visual */}
            <div className="p-6 rounded-2xl bg-white border border-[#ded5c2] flex items-center justify-between gap-4 shadow-xs">
              <div>
                <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-mono font-bold">
                  Statutory ABS Royalty Payable
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#0a1c16] mt-1 block">
                  {formatCurrencyINR(actualPayableFee)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-mono font-bold">
                  Total Saved via Exemption
                </span>
                <span className="text-xl sm:text-2xl font-black font-mono text-[#144d3c] mt-1 block">
                  {formatCurrencyINR(totalSavings)}
                </span>
              </div>
            </div>

            {/* Jurisdiction Assignment */}
            <div className="p-4 rounded-2xl bg-[#edf6f2] border border-[#2d7f63]/30 space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-[#144d3c] uppercase flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#1b5a4b]" />
                Jurisdiction Authority:
              </span>
              <p className="text-xs font-serif font-bold text-[#0e2720]">
                {isForeignShareholding
                  ? "National Biodiversity Authority (NBA Chennai) — Form III Prior Approval Required"
                  : "State Biodiversity Board (SBB) — Prior Intimation via Form I"}
              </p>
            </div>

            {/* Step-by-Step Compliance Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-serif font-bold text-[#0e2720] block">
                Statutory Compliance Roadmap:
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#ded5c2]">
                  <CheckCircle2 className="h-4 w-4 text-[#1b5a4b] shrink-0 mt-0.5" />
                  <span>
                    {isExempt
                      ? "1. Archive farmer cultivation receipts and Range Forest Officer origin certificates."
                      : "1. File Form I intimation with the respective State Biodiversity Board (SBB)."}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#ded5c2]">
                  <CheckCircle2 className="h-4 w-4 text-[#1b5a4b] shrink-0 mt-0.5" />
                  <span>
                    {isExempt
                      ? "2. Claim statutory 0% ABS exemption under Section 7 proviso during patent filings."
                      : "2. Deposit fair and equitable benefit sharing royalty into designated BMC accounts."}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/dossier"
                className="text-xs font-bold px-5 py-3 rounded-xl bg-gradient-to-r from-[#144d3c] to-[#0c2f25] text-white transition-all flex items-center gap-2 shadow-md hover:scale-102"
              >
                <span>Export Compliance Certificate</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#38bdf8]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
