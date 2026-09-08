"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  FlaskConical,
  Scale,
  FileText,
  Compass,
  FileSpreadsheet,
  Award,
  Play,
  CheckCircle2,
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";
import { VideoExplainerModal } from "@/components/visual/VideoExplainerModal";

const SAMPLE_PRESETS = [
  {
    id: "ashwagandha-brahmi",
    name: "Ashwagandha + Brahmi Neuro Complex",
    herbs: "Withania somnifera + Bacopa monnieri (Ratio 1:1.5)",
    sec3p: "DEFENSIBLE VIA NOVEL RATIO",
    sec3pDetail: "Overcomes Section 3(p) TK bar by establishing a specific synergistic ratio not disclosed in classical Samhitas.",
    sec3e: "CLEARED (CI = 0.62)",
    sec3eDetail: "Chou-Talalay Combination Index 0.62 proves genuine biological synergy defeating mere admixture objections.",
    bdaAbs: "0% EXEMPT (CULTIVATED)",
    bdaDetail: "Farmer cultivation certificates waive domestic ABS liability.",
    overall: "DEFENSE VIA BIOENHANCER CLAIMS",
  },
  {
    id: "classical-triphala",
    name: "Classical Triphala Churna (Ancient Heritage)",
    herbs: "Haritaki + Bibhitaki + Amalaki (Equal Proportions)",
    sec3p: "STATUTORILY BARRED",
    sec3pDetail: "Verbatim match in Charaka Samhita. Ancient community remedies cannot be privately patented.",
    sec3e: "NOT APPLICABLE",
    sec3eDetail: "Cannot patent raw ancient recipes even with laboratory data.",
    bdaAbs: "VAIDYA EXEMPTION",
    bdaDetail: "Traditional Vaidyas exempt from SBB intimation when dispensing to patients.",
    overall: "PIVOT TO BRAND & TRADE SECRET",
  },
];

export default function HomePage() {
  const { mode } = useLanguageStore();
  const isInnovator = mode === "innovator";

  const [selectedPreset, setSelectedPreset] = useState(SAMPLE_PRESETS[0]);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoTopic, setVideoTopic] = useState("recipe_bar");

  const openVideo = (topicKey) => {
    setVideoTopic(topicKey);
    setVideoOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf9f4] text-[#12231d]">
      {/* Video Explainer Modal */}
      <VideoExplainerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        topicKey={videoTopic}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden botanical-mesh py-16 lg:py-24 border-b border-[#e5decb]">
        <div className="absolute inset-0 legal-grid-pattern opacity-60 pointer-events-none" />

        <div className="container relative max-w-7xl px-4 sm:px-8 mx-auto">
          <div className="flex flex-col items-center text-center space-y-7 max-w-4xl mx-auto">
            {/* National Sovereign Portal Badge */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#eff6ff] border border-[#2563eb]/30 text-[#1e40af] shadow-xs">
                <Award className="h-3.5 w-3.5 text-[#2563eb]" />
                <span className="font-mono">National Ayush Legal-Tech Portal</span>
                <span className="h-1 w-1 rounded-full bg-blue-300" />
                <span>Ministry of Ayush & CGPDTM Co-Pilot</span>
              </div>
            </div>

            {/* Main Headline - Balanced Centered Typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#0a1c16] leading-[1.2] max-w-4xl mx-auto text-center">
              Demystifying Patent & Legal Compliance
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#0d9488] bg-clip-text text-transparent">
                for Ayurvedic Innovators
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#324b42] max-w-2xl mx-auto text-center text-balance leading-relaxed font-sans font-normal">
              {isInnovator
                ? "Built for everyday Ayurvedic doctors, grassroots herbal researchers, and wellness founders. Check if your formula is patent-eligible, prove your herbal booster (1+1=3), and clear forest biodiversity rules in plain English."
                : "Autonomous statutory legal co-pilot: cross-reference 54 classical texts against Section 3(p), mathematically defeat Section 3(e) mere admixture rejections via Chou-Talalay synergism, and automate BDA 2024 ABS exemptions."}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
              <Link
                href="/diagnostic"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-xl font-bold text-sm bg-gradient-to-r from-[#123c33] via-[#1b5a4b] to-[#22705d] hover:from-[#1b5a4b] hover:to-[#123c33] text-[#f7f2e4] shadow-lg shadow-[#123c33]/25 border border-[#2d7f63]/50 hover:scale-102 active:scale-98 transition-all duration-200"
              >
                <ShieldCheck className="h-5 w-5 text-[#38bdf8]" />
                <span>Check My Recipe Patentability</span>
                <ArrowRight className="h-4 w-4 ml-0.5 text-[#38bdf8]" />
              </Link>

              <Link
                href="/synergism"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-xl font-bold text-sm bg-gradient-to-r from-[#eff6ff] to-[#dbeafe] border border-[#2563eb]/40 text-[#1e40af] hover:bg-[#dbeafe] shadow-md hover:scale-102 active:scale-98 transition-all duration-200"
              >
                <Zap className="h-5 w-5 text-[#2563eb]" />
                <span>Test The 1 + 1 = 3 Rule</span>
              </Link>
            </div>
          </div>

          {/* Interactive Live Quick Risk Scanner Console */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="parchment-card p-6 sm:p-8 rounded-3xl border border-[#d6ccb8] shadow-luxury relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e8dfcf]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#eff6ff] border border-[#2563eb]/30 flex items-center justify-center text-[#1e40af]">
                    <Zap className="h-5 w-5 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#0e2720]">
                      Instant Formulation Patentability Simulator
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5 font-sans">
                      Select a benchmark Ayurvedic case study to preview autonomous statutory cross-matching:
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {SAMPLE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedPreset.id === preset.id
                          ? "bg-[#144d3c] text-white shadow-sm border border-[#2d7f63]"
                          : "bg-[#eee7d7] text-stone-700 hover:bg-[#e4dcce]"
                      }`}
                    >
                      {preset.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Simulation Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* 3(p) Metric */}
                <div className="p-4 rounded-2xl bg-[#f7f2e4]/70 border border-[#e5decb] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-stone-600 uppercase tracking-wider">
                      {isInnovator ? "Ancient Recipe Bar" : "Section 3(p) TK Bar"}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono border ${
                        selectedPreset.sec3p.includes("BARRED")
                          ? "bg-rose-50 text-rose-800 border-rose-300"
                          : selectedPreset.sec3p.includes("HIGH")
                          ? "bg-amber-50 text-amber-900 border-amber-300"
                          : "bg-emerald-50 text-emerald-900 border-emerald-300"
                      }`}
                    >
                      {selectedPreset.sec3p}
                    </span>
                  </div>
                  <p className="text-xs text-[#283d35] leading-relaxed font-sans">
                    {selectedPreset.sec3pDetail}
                  </p>
                </div>

                {/* 3(e) Synergism Metric */}
                <div className="p-4 rounded-2xl bg-[#f7f2e4]/70 border border-[#e5decb] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-stone-600 uppercase tracking-wider">
                      {isInnovator ? "1+1=3 Herbal Booster" : "Section 3(e) Synergism"}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono bg-[#eff6ff] text-[#1e40af] border border-[#2563eb]/30">
                      {selectedPreset.sec3e.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-xs text-[#283d35] leading-relaxed font-sans">
                    {selectedPreset.sec3eDetail}
                  </p>
                </div>

                {/* BDA 2024 ABS Metric */}
                <div className="p-4 rounded-2xl bg-[#f7f2e4]/70 border border-[#e5decb] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-stone-600 uppercase tracking-wider">
                      {isInnovator ? "Forest Royalty Liability" : "BDA 2024 ABS Status"}
                    </span>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono bg-[#e8f3ed] text-[#144d3c] border border-[#2d7f63]/40">
                      {selectedPreset.bdaAbs.split(" ")[0]}
                    </span>
                  </div>
                  <p className="text-xs text-[#283d35] leading-relaxed font-sans">
                    {selectedPreset.bdaDetail}
                  </p>
                </div>
              </div>

              {/* Bottom Result Row */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#eaf3ee] via-[#f7f5ed] to-[#eff6ff] border border-[#2d7f63]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#144d3c] flex items-center justify-center text-[#38bdf8] shadow-sm">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase tracking-wider font-mono font-bold">
                      Statutory Recommendation
                    </span>
                    <span className="text-sm font-serif font-bold text-[#0a1c16]">
                      {selectedPreset.overall}
                    </span>
                  </div>
                </div>

                <Link
                  href="/diagnostic"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#144d3c] hover:bg-[#0c2f25] text-white transition-all shadow-sm hover:scale-102"
                >
                  <span>Run Detailed Diagnosis</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#38bdf8]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Storytelling: 3 Video Explainer Previews */}
      <section className="py-16 border-b border-[#e5decb] bg-[#f5efe2]/70">
        <div className="container max-w-7xl px-4 sm:px-8 mx-auto space-y-9">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1e40af] flex items-center justify-center gap-1.5">
              <Play className="h-3.5 w-3.5 fill-[#2563eb] text-[#2563eb]" /> Visual Learning Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0a1c16]">
              Complex Patent Rules Explained in 2 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Interactive visual explainers with animated diagrams designed specifically for Ayurvedic practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Video Card 1 */}
            <div
              onClick={() => openVideo("recipe_bar")}
              className="parchment-card p-6 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-sm hover:border-[#2563eb] hover:shadow-luxury cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-[#0c1f38] via-[#102a4c] to-[#0c1c16] flex items-center justify-center relative overflow-hidden border border-[#2563eb]/30">
                <span className="text-4xl group-hover:scale-110 transition-transform">📜</span>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white flex items-center justify-center shadow-lg">
                    <Play className="h-5 w-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-[#60a5fa] border border-white/10">
                  2:15
                </span>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#1e40af]">Section 3(p)</span>
                <h4 className="text-sm font-serif font-bold text-[#0e2720] group-hover:text-[#1e40af] transition-colors">
                  Why Ancient Recipes Can't Be Patented
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  How the TKDL protects centuries-old remedies and what modifications unlock patent protection.
                </p>
              </div>
            </div>

            {/* Video Card 2 */}
            <div
              onClick={() => openVideo("synergy_booster")}
              className="parchment-card p-6 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-sm hover:border-[#2d7f63] hover:shadow-luxury cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-[#0c231c] via-[#12392d] to-[#051410] flex items-center justify-center relative overflow-hidden border border-[#2d7f63]/30">
                <span className="text-4xl group-hover:scale-110 transition-transform">🧪</span>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white flex items-center justify-center shadow-lg">
                    <Play className="h-5 w-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-[#34d399] border border-white/10">
                  2:40
                </span>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#144d3c]">Section 3(e)</span>
                <h4 className="text-sm font-serif font-bold text-[#0e2720] group-hover:text-[#144d3c] transition-colors">
                  The 1 + 1 = 3 Rule: Proving Herbal Synergy
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  How to defeat patent office 'mere admixture' objections using simple biological assay curves.
                </p>
              </div>
            </div>

            {/* Video Card 3 */}
            <div
              onClick={() => openVideo("forest_rules")}
              className="parchment-card p-6 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-sm hover:border-[#2563eb] hover:shadow-luxury cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-[#102235] via-[#16314c] to-[#0c1813] flex items-center justify-center relative overflow-hidden border border-[#2563eb]/30">
                <span className="text-4xl group-hover:scale-110 transition-transform">🌲</span>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white flex items-center justify-center shadow-lg">
                    <Play className="h-5 w-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-[#60a5fa] border border-white/10">
                  2:20
                </span>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#1e40af]">BDA 2024</span>
                <h4 className="text-sm font-serif font-bold text-[#0e2720] group-hover:text-[#1e40af] transition-colors">
                  Forest vs Farm: Sourcing & Royalties
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  How cultivated herbs grant 100% royalty exemptions and protect your enterprise from statutory penalties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Interactive Journeys Bento Grid */}
      <section className="py-16 border-b border-[#e5decb] bg-[#fbf9f4]">
        <div className="container max-w-7xl px-4 sm:px-8 mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1e40af]">
              Flagship Ayush IP Architecture
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#0a1c16]">
              Six Dedicated Interactive Journeys
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Every tool is self-contained, reactive, and engineered with plain-language guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Journey 1: Diagnostic */}
            <Link
              href="/diagnostic"
              className="parchment-card p-6 sm:p-7 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-sm hover:border-[#1b5a4b] hover:shadow-luxury transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#edf6f2] border border-[#2d7f63]/40 flex items-center justify-center text-[#144d3c] shadow-xs">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#edf6f2] text-[#144d3c] border border-[#2d7f63]/30 font-bold">
                  Section 3(p)
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0e2720] group-hover:text-[#144d3c] transition-colors">
                Formulation Patentability Checker
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                5-step judicial intake verifying whether your formulation is an ancient public remedy or an innovative delivery form eligible for protection.
              </p>
              <div className="flex items-center text-xs font-bold text-[#144d3c] gap-1.5 pt-2">
                <span>Launch Intake Corridor</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 2: Synergism */}
            <Link
              href="/synergism"
              className="parchment-card p-6 sm:p-7 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-sm hover:border-[#2563eb] hover:shadow-luxury transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#eff6ff] border border-[#2563eb]/40 flex items-center justify-center text-[#1e40af] shadow-xs">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#1e40af] border border-[#2563eb]/30 font-bold">
                  Section 3(e)
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0e2720] group-hover:text-[#1e40af] transition-colors">
                The Herbal Booster / Synergy Evaluator
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Interactive sliders testing whether combining herbs creates an enhanced effect (1+1=3) to mathematically clear Indian Patent Office rejections.
              </p>
              <div className="flex items-center text-xs font-bold text-[#1e40af] gap-1.5 pt-2">
                <span>Test Combination Index</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 3: BDA ABS */}
            <Link
              href="/bda-abs"
              className="parchment-card p-6 sm:p-7 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-sm hover:border-[#22705d] hover:shadow-luxury transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#eaf3ee] border border-[#22705d]/40 flex items-center justify-center text-[#16483d] shadow-xs">
                  <Scale className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#eaf3ee] text-[#16483d] border border-[#22705d]/30 font-bold">
                  BDA 2024
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0e2720] group-hover:text-[#16483d] transition-colors">
                Forest & Bio-Resource Rule Mapper
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Assess sourcing origins, calculate statutory farmer royalties, and verify 0% ABS exemptions for certified cultivated herbs.
              </p>
              <div className="flex items-center text-xs font-bold text-[#16483d] gap-1.5 pt-2">
                <span>Calculate Benefit Sharing</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 4: Statute Inspector */}
            <Link
              href="/inspector"
              className="parchment-card p-6 sm:p-7 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-sm hover:border-[#1b5a4b] hover:shadow-luxury transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#edf6f2] border border-[#2d7f63]/40 flex items-center justify-center text-[#144d3c] shadow-xs">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#edf6f2] text-[#144d3c] border border-[#2d7f63]/30 font-bold">
                  Gazette RAG
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0e2720] group-hover:text-[#144d3c] transition-colors">
                Statute & Gazette Inspector
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Compare official government gazettes side-by-side with everyday translations, patent office tests, and landmark precedents.
              </p>
              <div className="flex items-center text-xs font-bold text-[#144d3c] gap-1.5 pt-2">
                <span>Inspect Official Law</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 5: Alternative IP Pivots */}
            <Link
              href="/pivot-engine"
              className="parchment-card p-6 sm:p-7 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-sm hover:border-[#2563eb] hover:shadow-luxury transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#eff6ff] border border-[#2563eb]/40 flex items-center justify-center text-[#1e40af] shadow-xs">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#1e40af] border border-[#2563eb]/30 font-bold">
                  Alternative IP
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0e2720] group-hover:text-[#1e40af] transition-colors">
                Alternative Protection Hub
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                When recipes cannot be patented, pivot to Class 5 Trademarks, Trade Secrets, GI protection, and Rule 158B fast-track licensing.
              </p>
              <div className="flex items-center text-xs font-bold text-[#1e40af] gap-1.5 pt-2">
                <span>Explore Monetization Pivots</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 6: Dossier Generator */}
            <Link
              href="/dossier"
              className="parchment-card p-6 sm:p-7 rounded-3xl space-y-4 border border-[#d6ccb8] shadow-sm hover:border-[#1b5a4b] hover:shadow-luxury transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-[#edf6f2] border border-[#2d7f63]/40 flex items-center justify-center text-[#144d3c] shadow-xs">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#edf6f2] text-[#144d3c] border border-[#2d7f63]/30 font-bold">
                  Forms 1, 2, III
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0e2720] group-hover:text-[#144d3c] transition-colors">
                Ready-to-File Dossier Hub
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Autonomously compile official patent specifications, draft synergistic claims, and export official application packets.
              </p>
              <div className="flex items-center text-xs font-bold text-[#144d3c] gap-1.5 pt-2">
                <span>Generate Dossier Packet</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
