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
  BookOpen,
  Clock,
  Sparkles,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";
import { VideoExplainerModal } from "@/components/visual/VideoExplainerModal";
import { MetricGauge } from "@/components/visual/MetricGauge";
import { Footer } from "@/components/layout/Footer";

const SAMPLE_PRESETS = [
  {
    id: "ashwagandha-brahmi",
    name: "Ashwagandha + Brahmi Neuro Complex",
    herbs: "Withania somnifera + Bacopa monnieri (Ratio 1:1.5)",
    sec3p: "DEFENSIBLE VIA NOVEL RATIO",
    sec3pDetail: "Overcomes Section 3(p) TK bar by establishing a specific synergistic ratio not disclosed in classical Samhitas.",
    sec3pScore: 48,
    sec3e: "CLEARED (CI = 0.62)",
    sec3eDetail: "Chou-Talalay Combination Index 0.62 proves genuine biological synergy defeating mere admixture objections.",
    sec3eScore: 86,
    bdaAbs: "0% EXEMPT (CULTIVATED)",
    bdaDetail: "Farmer cultivation certificates waive domestic ABS liability under amended Section 7 proviso.",
    bdaScore: 100,
    overall: "DEFENSE VIA STANDARDIZED SYNERGY RATIO",
  },
  {
    id: "classical-triphala",
    name: "Classical Triphala Churna (Ancient Heritage)",
    herbs: "Haritaki + Bibhitaki + Amalaki (Equal Proportions)",
    sec3p: "STATUTORILY BARRED",
    sec3pDetail: "Verbatim match in Charaka Samhita. Ancient community remedies cannot be privately patented.",
    sec3pScore: 98,
    sec3e: "NOT APPLICABLE",
    sec3eDetail: "Cannot patent raw ancient recipes even with laboratory data.",
    sec3eScore: 20,
    bdaAbs: "VAIDYA EXEMPTION",
    bdaDetail: "Traditional Vaidyas exempt from SBB intimation when dispensing directly to patients.",
    bdaScore: 100,
    overall: "PIVOT TO BRAND (CLASS 5) & TRADE SECRET",
  },
];

const RECENT_DOCKETS = [
  {
    id: "DOC-2026-089",
    formulation: "Standardized Ashwagandha-Brahmi Matrix",
    category: "Proprietary ASU Medicine (Rule 158B Part II)",
    authority: "Charaka Samhita Chikitsa Sthana",
    sec3pStatus: "Defensible (48% match)",
    sec3eStatus: "Synergistic (CI = 0.62)",
    bdaStatus: "0.0% Exempt (Cultivated)",
    date: "08 Sep 2026",
  },
  {
    id: "DOC-2026-088",
    formulation: "Curcumin-Piperine Bioavailability Complex",
    category: "Proprietary Extract Formulation",
    authority: "Sushruta Samhita & TKDL Registry",
    sec3pStatus: "Defensible (Novel Carrier)",
    sec3eStatus: "Cleared (20x Bioavailability)",
    bdaStatus: "0.0% Exempt (Cultivated)",
    date: "07 Sep 2026",
  },
  {
    id: "DOC-2026-087",
    formulation: "Classical Triphala Churna Compound",
    category: "Classical Ayurvedic Medicine (Rule 158B Part I)",
    authority: "Sharangadhara Samhita Madhyama Khanda",
    sec3pStatus: "Statutorily Barred (§ 3p)",
    sec3eStatus: "Ineligible (Mere Admixture)",
    bdaStatus: "Vaidya Exemption Applied",
    date: "06 Sep 2026",
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
    <div className="flex flex-col min-h-screen text-ink">
      {/* Video Explainer Modal */}
      <VideoExplainerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        topicKey={videoTopic}
      />

      {/* ── 1. ASYMMETRIC WORKSPACE OVERVIEW (HERO) ── */}
      <section className="relative overflow-hidden botanical-mesh py-14 lg:py-20 border-b border-line">
        <div className="absolute inset-0 legal-grid-pattern opacity-40 pointer-events-none" />

        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Editorial Identity & Purpose */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-surface-raised border border-brass-500/40 text-brass-700 shadow-xs">
                <Award className="h-3.5 w-3.5 text-brass-600" />
                <span>National Ayush Legal-Tech Corridor</span>
                <span className="h-1 w-1 rounded-full bg-forest-600" />
                <span className="text-forest-800">Ministry of Ayush & CGPDTM Co-Pilot</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-forest-950 leading-[1.15]">
                Authoritative Patent & Legal Compliance for{" "}
                <span className="text-brass-700 italic underline decoration-brass-400/50 decoration-2">
                  Ayurvedic Innovators
                </span>
              </h1>

              <p className="text-sm sm:text-base text-ink-soft max-w-2xl font-sans leading-relaxed">
                {isInnovator
                  ? "Engineered for grassroots Ayurvedic doctors, formulation scientists, and wellness enterprises. Verify whether your formulation clears ancient recipe exclusions (§ 3p), mathematically prove herbal booster synergy (§ 3e), and confirm 0% biodiversity royalties in plain English."
                  : "Autonomous statutory jurisprudence co-pilot: systematically cross-reference 54 First Schedule pharmacopeias against Section 3(p), overcome Section 3(e) mere admixture rejections using the Chou-Talalay combination index, and automate Biological Diversity Act 2024 exemptions."}
              </p>

              {/* Action Rails */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/diagnostic"
                  className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl font-serif font-bold text-sm bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 shadow-card hover:shadow-floating transition-all duration-200"
                >
                  <ShieldCheck className="h-4.5 w-4.5 text-brass-400" />
                  <span>Launch Formulation Patent Checker</span>
                  <ArrowRight className="h-4 w-4 ml-0.5 text-brass-400" />
                </Link>

                <Link
                  href="/synergism"
                  className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-xl font-serif font-bold text-sm bg-surface-raised hover:bg-surface border border-line text-forest-900 shadow-xs hover:border-forest-700/50 transition-all duration-200"
                >
                  <Zap className="h-4.5 w-4.5 text-brass-600" />
                  <span>Test Synergism Theorem (1+1=3)</span>
                </Link>
              </div>
            </div>

            {/* Right 5 Columns: Executive Metric Instrumentation */}
            <div className="lg:col-span-5">
              <div className="console-dark p-6 sm:p-7 space-y-6 border border-brass-500/40">
                <div className="flex items-center justify-between pb-4 border-b border-forest-800">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono font-bold text-brass-300 uppercase tracking-wider">
                      Statutory Confidence Instruments
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-brass-300">
                    Active Session Live
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <MetricGauge
                    value={54}
                    max={54}
                    unit=""
                    label="Pharmacopeias"
                    sublabel="First Schedule"
                    variant="brass"
                    statusLabel="Indexed"
                    size="sm"
                    dark
                  />

                  <MetricGauge
                    value={0.62}
                    max={1.5}
                    unit=""
                    label="Chou-Talalay CI"
                    sublabel="Target < 0.90"
                    variant="emerald"
                    statusLabel="Synergistic"
                    size="sm"
                    dark
                  />

                  <MetricGauge
                    value={100}
                    max={100}
                    unit="%"
                    label="Farm Exemption"
                    sublabel="BDA 2024 § 7"
                    variant="forest"
                    statusLabel="0.0% Fee"
                    size="sm"
                    dark
                  />
                </div>

                <div className="p-4 rounded-xl bg-forest-950 border border-forest-800 text-xs text-white space-y-1.5 font-sans">
                  <div className="flex items-center justify-between font-serif font-bold text-white">
                    <span className="text-sm">Autonomous Legal Core</span>
                    <span className="text-emerald-300 font-mono text-xs font-bold">Zero Data Leakage</span>
                  </div>
                  <p className="text-xs leading-relaxed text-white/90 font-normal">
                    Formulations evaluated locally against traditional scriptures without uploading unpublished trade secrets to external servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INSTANT FORMULATION SIMULATOR & BENCHMARK CONSOLE ── */}
      <section className="py-12 border-b border-line bg-surface/50">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto space-y-6">
          <div className="parchment-card p-6 sm:p-8 space-y-6 border border-line shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-line">
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 rounded-xl bg-forest-900 border border-brass-500/40 flex items-center justify-center text-brass-400 shadow-xs shrink-0">
                  <Zap className="h-5 w-5 text-brass-400" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-forest-950">
                    Instant Formulation Patentability Simulator
                  </h3>
                  <p className="text-xs text-ink-soft mt-0.5 font-sans">
                    Select a benchmark Ayurvedic case study to preview autonomous statutory cross-matching:
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {SAMPLE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer border ${
                      selectedPreset.id === preset.id
                        ? "bg-forest-900 text-surface-raised border-forest-700 shadow-xs"
                        : "bg-surface text-ink-soft hover:text-ink hover:bg-surface-raised border-line"
                    }`}
                  >
                    {preset.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Simulation Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Metric 1: Section 3(p) */}
              <div className="p-5 rounded-2xl bg-surface border border-line space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider">
                    {isInnovator ? "Ancient Recipe Bar" : "Section 3(p) TK Bar"}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono border ${
                      selectedPreset.sec3p.includes("BARRED")
                        ? "bg-rose-50 text-rose-900 border-rose-300"
                        : "bg-brass-50 text-brass-900 border-brass-400/50"
                    }`}
                  >
                    {selectedPreset.sec3p}
                  </span>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed font-sans">
                  {selectedPreset.sec3pDetail}
                </p>
              </div>

              {/* Metric 2: Section 3(e) */}
              <div className="p-5 rounded-2xl bg-surface border border-line space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider">
                    {isInnovator ? "1+1=3 Herbal Booster" : "Section 3(e) Synergism"}
                  </span>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono bg-forest-50 text-forest-900 border border-forest-600/30">
                    {selectedPreset.sec3e.split(" ")[0]}
                  </span>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed font-sans">
                  {selectedPreset.sec3eDetail}
                </p>
              </div>

              {/* Metric 3: BDA 2024 ABS */}
              <div className="p-5 rounded-2xl bg-surface border border-line space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider">
                    {isInnovator ? "Forest Royalty Liability" : "BDA 2024 ABS Status"}
                  </span>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-mono bg-emerald-50 text-emerald-900 border border-emerald-600/30">
                    {selectedPreset.bdaAbs.split(" ")[0]}
                  </span>
                </div>
                <p className="text-xs text-ink-soft leading-relaxed font-sans">
                  {selectedPreset.bdaDetail}
                </p>
              </div>
            </div>

            {/* Bottom Recommendation Row */}
            <div className="p-4 rounded-2xl bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-forest-900 flex items-center justify-center text-brass-400 shadow-xs shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] text-brass-700 block uppercase tracking-wider font-mono font-bold">
                    Statutory Roadmap Recommendation
                  </span>
                  <span className="text-sm font-serif font-bold text-forest-950">
                    {selectedPreset.overall}
                  </span>
                </div>
              </div>

              <Link
                href="/diagnostic"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-serif font-bold bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 transition-all shadow-xs shrink-0"
              >
                <span>Run Detailed 5-Step Diagnosis</span>
                <ArrowRight className="h-3.5 w-3.5 text-brass-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HIGH-PRIORITY ACTION RAILS (6 CORE JOURNEYS) ── */}
      <section className="py-14 border-b border-line bg-canvas">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass-700">
              Sovereign Ayush Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
              Six Specialized Interactive Journeys
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft font-sans">
              Each module operates autonomously with plain-language guidance, mathematical validation, and ready-to-file exports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Journey 1: Diagnostic (High Dominance) */}
            <Link
              href="/diagnostic"
              className="parchment-card p-6 sm:p-7 space-y-4 border border-line shadow-card hover:border-forest-700 hover:shadow-floating transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-forest-900 border border-forest-800 flex items-center justify-center text-brass-400 shadow-xs">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-900 border border-forest-600/30 font-bold">
                  Section 3(p)
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 group-hover:text-brass-700 transition-colors">
                Formulation Patentability Checker
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed font-sans">
                5-step judicial intake verifying whether your formulation is an ancient public remedy or an innovative delivery form eligible for protection.
              </p>
              <div className="flex items-center text-xs font-serif font-bold text-forest-900 gap-1.5 pt-2">
                <span>Launch Intake Corridor</span>
                <ArrowRight className="h-3.5 w-3.5 text-brass-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 2: Synergism (High Dominance) */}
            <Link
              href="/synergism"
              className="parchment-card p-6 sm:p-7 space-y-4 border border-line shadow-card hover:border-brass-600 hover:shadow-floating transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-brass-700 border border-brass-600 flex items-center justify-center text-surface-raised shadow-xs">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-brass-50 text-brass-900 border border-brass-500/30 font-bold">
                  Section 3(e)
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 group-hover:text-brass-700 transition-colors">
                The Herbal Booster / Synergy Evaluator
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed font-sans">
                Interactive sliders testing whether combining herbs creates an enhanced effect (1+1=3) to mathematically clear Indian Patent Office rejections.
              </p>
              <div className="flex items-center text-xs font-serif font-bold text-brass-700 gap-1.5 pt-2">
                <span>Test Combination Index</span>
                <ArrowRight className="h-3.5 w-3.5 text-brass-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 3: BDA ABS */}
            <Link
              href="/bda-abs"
              className="parchment-card p-6 sm:p-7 space-y-4 border border-line shadow-card hover:border-forest-700 hover:shadow-floating transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-forest-950 border border-forest-800 flex items-center justify-center text-emerald-400 shadow-xs">
                  <Scale className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-600/30 font-bold">
                  BDA 2024
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 group-hover:text-brass-700 transition-colors">
                Forest & Bio-Resource Rule Mapper
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed font-sans">
                Assess sourcing origins, calculate statutory farmer royalties, and verify 0% ABS exemptions for certified cultivated herbs.
              </p>
              <div className="flex items-center text-xs font-serif font-bold text-forest-900 gap-1.5 pt-2">
                <span>Calculate Benefit Sharing</span>
                <ArrowRight className="h-3.5 w-3.5 text-brass-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 4: Statute Inspector */}
            <Link
              href="/inspector"
              className="parchment-card p-6 sm:p-7 space-y-4 border border-line shadow-card hover:border-forest-700 hover:shadow-floating transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-forest-900 border border-forest-800 flex items-center justify-center text-brass-400 shadow-xs">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-surface-raised text-ink-muted border border-line font-bold">
                  Gazette RAG
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 group-hover:text-brass-700 transition-colors">
                Statute & Gazette Inspector
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed font-sans">
                Compare official government gazettes side-by-side with everyday translations, patent office tests, and landmark judicial precedents.
              </p>
              <div className="flex items-center text-xs font-serif font-bold text-forest-900 gap-1.5 pt-2">
                <span>Inspect Official Law</span>
                <ArrowRight className="h-3.5 w-3.5 text-brass-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 5: Alternative IP Pivots */}
            <Link
              href="/pivot-engine"
              className="parchment-card p-6 sm:p-7 space-y-4 border border-line shadow-card hover:border-brass-600 hover:shadow-floating transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-surface-raised border border-line flex items-center justify-center text-brass-700 shadow-xs">
                  <Compass className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-brass-50 text-brass-900 border border-brass-500/30 font-bold">
                  Alternative IP
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 group-hover:text-brass-700 transition-colors">
                Alternative Protection Hub
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed font-sans">
                When recipes cannot be patented, pivot to Class 5 Trademarks, Trade Secrets, GI protection, and Rule 158B fast-track licensing.
              </p>
              <div className="flex items-center text-xs font-serif font-bold text-brass-700 gap-1.5 pt-2">
                <span>Explore Monetization Pivots</span>
                <ArrowRight className="h-3.5 w-3.5 text-brass-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Journey 6: Dossier Generator */}
            <Link
              href="/dossier"
              className="parchment-card p-6 sm:p-7 space-y-4 border border-line shadow-card hover:border-forest-700 hover:shadow-floating transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-forest-950 border border-forest-800 flex items-center justify-center text-brass-400 shadow-xs">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-forest-50 text-forest-900 border border-forest-600/30 font-bold">
                  Forms 1, 2, III
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg text-forest-950 group-hover:text-brass-700 transition-colors">
                Ready-to-File Dossier Hub
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed font-sans">
                Autonomously compile official patent specifications, draft synergistic claims, and export official application packets in A4 format.
              </p>
              <div className="flex items-center text-xs font-serif font-bold text-forest-900 gap-1.5 pt-2">
                <span>Generate Dossier Packet</span>
                <ArrowRight className="h-3.5 w-3.5 text-brass-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. RECENT STATUTORY DOCKET TIMELINE ── */}
      <section className="py-14 border-b border-line bg-surface">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass-700 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brass-600" /> Recent Statutory Activity
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 mt-1">
                Ayurvedic Compliance Docket Timeline
              </h2>
            </div>
            <span className="text-xs font-mono text-ink-muted">
              Live National Ayush Registry Feed
            </span>
          </div>

          <div className="parchment-card divide-y divide-line border border-line shadow-card overflow-hidden">
            {RECENT_DOCKETS.map((doc) => (
              <div key={doc.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-raised transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-brass-700">{doc.id}</span>
                    <span className="text-ink-muted">•</span>
                    <span className="text-ink-muted">{doc.date}</span>
                    <span className="text-ink-muted">•</span>
                    <span className="text-forest-800 font-semibold">{doc.category}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-forest-950">
                    {doc.formulation}
                  </h4>
                  <p className="text-xs text-ink-soft">
                    Classical Authority: <span className="font-mono text-ink">{doc.authority}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0 text-[11px] font-mono font-semibold">
                  <span className="px-2.5 py-1 rounded-full bg-surface-raised border border-line text-ink">
                    {doc.sec3pStatus}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-forest-50 border border-forest-600/30 text-forest-900">
                    {doc.sec3eStatus}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-600/30 text-emerald-950">
                    {doc.bdaStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. VISUAL LEARNING HUB (VIDEO PREVIEWS) ── */}
      <section className="py-14 bg-canvas-deep">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass-700 flex items-center justify-center gap-1.5">
              <Play className="h-3.5 w-3.5 fill-brass-600 text-brass-600" /> Visual Learning Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
              Complex Patent Rules Explained in 2 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft font-sans">
              Interactive visual explainers with animated diagrams designed specifically for Ayurvedic practitioners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Video Card 1 */}
            <div
              onClick={() => openVideo("recipe_bar")}
              className="parchment-card p-6 space-y-4 border border-line shadow-card hover:border-brass-600 hover:shadow-floating cursor-pointer transition-all duration-200 group"
            >
              <div className="aspect-video w-full rounded-2xl bg-forest-950 flex items-center justify-center relative overflow-hidden border border-brass-500/20">
                <span className="text-4xl group-hover:scale-110 transition-transform">📜</span>
                <div className="absolute inset-0 bg-forest-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-11 w-11 rounded-full bg-brass-600 text-forest-950 flex items-center justify-center shadow-card font-bold">
                    <Play className="h-5 w-5 fill-forest-950 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-forest-900/90 text-brass-300 border border-brass-500/30">
                  2:15
                </span>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-brass-700">Section 3(p)</span>
                <h4 className="text-sm font-serif font-bold text-forest-950 group-hover:text-brass-700 transition-colors">
                  Why Ancient Recipes Can't Be Patented
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed font-sans">
                  How the TKDL protects centuries-old remedies and what modifications unlock patent protection.
                </p>
              </div>
            </div>

            {/* Video Card 2 */}
            <div
              onClick={() => openVideo("synergy_booster")}
              className="parchment-card p-6 space-y-4 border border-line shadow-card hover:border-forest-700 hover:shadow-floating cursor-pointer transition-all duration-200 group"
            >
              <div className="aspect-video w-full rounded-2xl bg-forest-950 flex items-center justify-center relative overflow-hidden border border-brass-500/20">
                <span className="text-4xl group-hover:scale-110 transition-transform">🧪</span>
                <div className="absolute inset-0 bg-forest-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-11 w-11 rounded-full bg-brass-600 text-forest-950 flex items-center justify-center shadow-card font-bold">
                    <Play className="h-5 w-5 fill-forest-950 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-forest-900/90 text-emerald-300 border border-forest-600/30">
                  2:40
                </span>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-forest-800">Section 3(e)</span>
                <h4 className="text-sm font-serif font-bold text-forest-950 group-hover:text-forest-800 transition-colors">
                  The 1 + 1 = 3 Rule: Proving Herbal Synergy
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed font-sans">
                  How to defeat patent office 'mere admixture' objections using simple biological assay curves.
                </p>
              </div>
            </div>

            {/* Video Card 3 */}
            <div
              onClick={() => openVideo("forest_rules")}
              className="parchment-card p-6 space-y-4 border border-line shadow-card hover:border-emerald-600 hover:shadow-floating cursor-pointer transition-all duration-200 group"
            >
              <div className="aspect-video w-full rounded-2xl bg-forest-950 flex items-center justify-center relative overflow-hidden border border-brass-500/20">
                <span className="text-4xl group-hover:scale-110 transition-transform">🌲</span>
                <div className="absolute inset-0 bg-forest-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-11 w-11 rounded-full bg-brass-600 text-forest-950 flex items-center justify-center shadow-card font-bold">
                    <Play className="h-5 w-5 fill-forest-950 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-forest-900/90 text-brass-300 border border-brass-500/30">
                  2:20
                </span>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-brass-700">BDA 2024</span>
                <h4 className="text-sm font-serif font-bold text-forest-950 group-hover:text-brass-700 transition-colors">
                  Forest vs Farm: Sourcing & Royalties
                </h4>
                <p className="text-xs text-ink-soft leading-relaxed font-sans">
                  How cultivated herbs grant 100% royalty exemptions and protect your enterprise from statutory penalties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer rendered strictly on Landing Page */}
      <Footer />
    </div>
  );
}
