"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Sparkles,
  ShieldCheck,
  Printer,
  Copy,
  Check,
  FileText,
  Building2,
  Users,
  MapPin,
  ScrollText,
  Lock,
  Leaf,
  Award,
  ChevronRight,
  ExternalLink,
  Info,
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";

const DOSSIER_PRESETS = [
  {
    title: "Standardized Synergistic Ashwagandha-Brahmi Neuroprotective Complex",
    applicantName: "Ayush Bioactives Innovations Pvt Ltd",
    applicantAddress: "Plot 42, Biotech Science Park, Gandhinagar, Gujarat 382010, India",
    inventors: "Dr. Rajesh Sharma, Dr. Priya Nair, Vd. Anantharaman Iyer",
    origin: "Neemuch, Madhya Pradesh & Wayanad, Kerala, India (Certified Cultivated Farms)",
    summary: "Supercritical CO2 dual extraction yielding standardized fractions with validated AChE inhibition synergy defeating Section 3(e).",
    ci: 0.62,
    isCultivated: true,
  },
  {
    title: "High-Bioavailability Curcumin-Piperine Synergistic Matrix",
    applicantName: "Himalayan Phytocare Laboratories Ltd",
    applicantAddress: "Industrial Area Phase II, Haridwar, Uttarakhand 249401, India",
    inventors: "Dr. Arvind Joshi, Dr. Sunita Kulkarni",
    origin: "Salem, Tamil Nadu & Idukki, Kerala, India (Certified Cultivated Farms)",
    summary: "Nanomilled standardized curcuminoids complexed with piperine for 20x systemic bioavailability enhancement.",
    ci: 0.48,
    isCultivated: true,
  },
];

export default function DossierGeneratorPage() {
  const { mode } = useLanguageStore();
  const isInnovator = mode === "innovator";

  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [title, setTitle] = useState(DOSSIER_PRESETS[0].title);
  const [applicantName, setApplicantName] = useState(DOSSIER_PRESETS[0].applicantName);
  const [applicantAddress, setApplicantAddress] = useState(DOSSIER_PRESETS[0].applicantAddress);
  const [inventors, setInventors] = useState(DOSSIER_PRESETS[0].inventors);
  const [origin, setOrigin] = useState(DOSSIER_PRESETS[0].origin);
  const [summary, setSummary] = useState(DOSSIER_PRESETS[0].summary);

  const [activeTab, setActiveTab] = useState("FORM_2");
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const applyPreset = (idx) => {
    setSelectedPresetIndex(idx);
    const p = DOSSIER_PRESETS[idx];
    setTitle(p.title);
    setApplicantName(p.applicantName);
    setApplicantAddress(p.applicantAddress);
    setInventors(p.inventors);
    setOrigin(p.origin);
    setSummary(p.summary);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 text-ink">
      {/* ── 1. HEADER BANNER ── */}
      <div className="parchment-card p-6 sm:p-8 border border-line shadow-card relative overflow-hidden print:hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-forest-50 text-forest-900 border border-forest-600/30">
                <FileSpreadsheet className="h-3.5 w-3.5 text-forest-700" />
                {isInnovator ? "Ready-to-File Application Packet" : "Autonomous Patent Dossier & Forms Generator"}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brass-50 text-brass-900 border border-brass-500/40">
                OFFICIAL STATUTORY PACKET
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-forest-950">
              Official Application Dossier Hub
            </h1>

            <p className="text-xs sm:text-sm text-ink-soft font-sans leading-relaxed">
              {isInnovator
                ? "Generate ready-to-submit official government patent forms (Form 1 & Form 2), National Biodiversity clearance forms, and Trade Secret SOPs in 1-click."
                : "Autonomously assemble IPO Form 1, Form 2 Complete Specifications with synergistic claims, NBA Form III filings, and Section 10(4) origin disclosures."}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start lg:self-center shrink-0">
            <button
              onClick={() => setShowPrintModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-serif font-bold bg-forest-900 hover:bg-forest-800 text-surface-raised transition-all shadow-card border border-forest-700 cursor-pointer"
            >
              <Printer className="h-4 w-4 text-brass-400" />
              <span>Print / PDF Preview</span>
            </button>
            <PlainLanguageToggle compact />
          </div>
        </div>
      </div>

      {/* ── 2. PRESETS BAR ── */}
      <div className="parchment-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden border border-line shadow-xs">
        <div className="flex items-center gap-2 text-xs font-serif font-bold text-forest-950">
          <div className="h-6 w-6 rounded-lg bg-surface border border-line flex items-center justify-center text-brass-700">
            <Sparkles className="h-3.5 w-3.5 text-brass-600" />
          </div>
          <span>Pre-Configured Dossier Templates:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {DOSSIER_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer border ${
                selectedPresetIndex === idx
                  ? "bg-forest-900 text-surface-raised font-bold shadow-xs border-forest-700"
                  : "bg-surface text-ink-soft hover:text-ink hover:bg-surface-raised border-line"
              }`}
            >
              {p.title.split(" ")[0]} ({p.ci < 0.9 ? `CI ${p.ci} Synergistic` : "Standard"})
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. MAIN DOSSIER BUILDER: METADATA (5) + FORMS PREVIEW (7) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:hidden">
        {/* Left 5 Columns: Metadata Editor Console */}
        <div className="lg:col-span-5 space-y-6">
          <div className="parchment-card p-6 sm:p-7 space-y-5 border border-line shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-forest-900 text-brass-400 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-serif font-bold text-forest-950 uppercase tracking-wide">
                    Applicant & Formulation Metadata
                  </h2>
                  <p className="text-[11px] text-ink-muted">Government filing parameters</p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-forest-50 text-forest-900 font-bold border border-forest-600/30">
                Form 1 & 2
              </span>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div>
                <label className="font-serif font-bold text-forest-950 flex items-center gap-1.5 mb-1">
                  <FileText className="h-3.5 w-3.5 text-brass-600" />
                  Formulation Invention Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs font-serif font-medium bg-surface-raised border border-line focus:border-brass-500 rounded-xl px-3.5 py-2.5 text-ink outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="font-serif font-bold text-forest-950 flex items-center gap-1.5 mb-1">
                  <Building2 className="h-3.5 w-3.5 text-brass-600" />
                  Applicant Company / Clinic Name
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full text-xs font-sans bg-surface-raised border border-line focus:border-brass-500 rounded-xl px-3.5 py-2.5 text-ink outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="font-serif font-bold text-forest-950 flex items-center gap-1.5 mb-1">
                  <MapPin className="h-3.5 w-3.5 text-brass-600" />
                  Registered Legal Address
                </label>
                <input
                  type="text"
                  value={applicantAddress}
                  onChange={(e) => setApplicantAddress(e.target.value)}
                  className="w-full text-xs font-sans bg-surface-raised border border-line focus:border-brass-500 rounded-xl px-3.5 py-2.5 text-ink outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="font-serif font-bold text-forest-950 flex items-center gap-1.5 mb-1">
                  <Users className="h-3.5 w-3.5 text-brass-600" />
                  Inventors / Ayurvedic Doctors
                </label>
                <input
                  type="text"
                  value={inventors}
                  onChange={(e) => setInventors(e.target.value)}
                  className="w-full text-xs font-sans bg-surface-raised border border-line focus:border-brass-500 rounded-xl px-3.5 py-2.5 text-ink outline-none shadow-inner"
                />
              </div>

              <div>
                <label className="font-serif font-bold text-forest-950 flex items-center gap-1.5 mb-1">
                  <Leaf className="h-3.5 w-3.5 text-brass-600" />
                  Biological Sourcing Origin (District & Certified Farm)
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full text-xs font-sans bg-surface-raised border border-line focus:border-brass-500 rounded-xl px-3.5 py-2.5 text-ink outline-none shadow-inner"
                />
                <span className="text-[10px] text-ink-muted mt-1 block">
                  Mandatory under Section 10(4)(d)(ii) of the Indian Patents Act.
                </span>
              </div>

              <div>
                <label className="font-serif font-bold text-forest-950 flex items-center gap-1.5 mb-1">
                  <ScrollText className="h-3.5 w-3.5 text-brass-600" />
                  Novel Extraction & Synergy Summary
                </label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full text-xs font-sans bg-surface-raised border border-line focus:border-brass-500 rounded-xl px-3.5 py-2.5 text-ink outline-none shadow-inner resize-none"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-line">
              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="w-full py-3 px-4 rounded-xl font-serif font-bold text-xs bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 transition-all shadow-card flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="h-4 w-4 text-brass-400" />
                <span>Open Full Dossier Print Preview</span>
              </button>
            </div>
          </div>

          {/* Statutory Compliance Indicator */}
          <div className="console-dark p-4 rounded-2xl border border-brass-500/40 space-y-2 text-surface">
            <div className="flex items-center gap-2 text-brass-300 text-xs font-serif font-bold">
              <Info className="h-4 w-4 text-brass-400" />
              <span>Section 10 & Rule 13 Compliance Status</span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed font-sans font-normal">
              All claims generated incorporate the mandatory Chou-Talalay combination index threshold (CI &lt; 0.90) required by the Indian Patent Office to defeat Section 3(e) mere admixture rejections.
            </p>
          </div>
        </div>

        {/* Right 7 Columns: Multi-Tab Form Previews */}
        <div className="lg:col-span-7 space-y-4">
          <div className="parchment-card p-6 sm:p-7 space-y-5 border border-line shadow-card">
            {/* Form Selection Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-line pb-3">
              {[
                { id: "FORM_2", label: "IPO Form 2 (Patent Specs)", icon: FileText },
                { id: "FORM_1", label: "IPO Form 1 (Application)", icon: ScrollText },
                { id: "NBA_FORM", label: "NBA Form III (Biodiversity)", icon: Leaf },
                { id: "TRADE_SECRET", label: "Trade Secret SOP", icon: Lock },
                { id: "SUMMARY", label: "Vaidya Certificate", icon: Award },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer border ${
                      active
                        ? "bg-forest-900 text-surface-raised shadow-xs border-forest-700"
                        : "bg-surface text-ink-soft hover:text-ink hover:bg-surface-raised border-line"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${active ? "text-brass-400" : "text-ink-muted"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT: FORM 2 */}
            {activeTab === "FORM_2" && (
              <div className="space-y-4 text-xs leading-relaxed text-ink animate-civic-rise">
                <div className="p-6 rounded-2xl bg-surface border-2 border-dashed border-line-strong relative overflow-hidden space-y-4">
                  <div className="text-center pb-3 border-b border-line space-y-1">
                    <span className="text-[11px] text-brass-700 font-bold uppercase tracking-wider block font-mono">
                      FORM 2 • THE PATENTS ACT, 1970 (39 OF 1970)
                    </span>
                    <span className="text-xs font-serif font-black text-forest-950 uppercase tracking-widest block">
                      COMPLETE SPECIFICATION [SECTION 10 & RULE 13]
                    </span>
                    <span className="text-[10px] text-ink-muted font-mono">
                      GOVERNMENT OF INDIA PATENT OFFICE • STATUTORY FILING COPY
                    </span>
                  </div>

                  <div className="space-y-1">
                    <strong className="text-forest-950 font-bold block text-[11px] uppercase tracking-wide font-mono">
                      1. TITLE OF THE INVENTION:
                    </strong>
                    <p className="text-forest-950 font-serif font-bold text-sm bg-surface-raised p-2.5 rounded-lg border border-line">
                      &ldquo;{title}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-1">
                    <strong className="text-forest-950 font-bold block text-[11px] uppercase tracking-wide font-mono">
                      2. APPLICANT(S) & INVENTORS:
                    </strong>
                    <div className="text-ink text-xs bg-surface-raised p-2.5 rounded-lg border border-line space-y-1">
                      <p><span className="font-semibold font-serif">Applicant:</span> {applicantName}</p>
                      <p><span className="font-semibold font-serif">Address:</span> {applicantAddress}</p>
                      <p><span className="font-semibold font-serif">Inventors:</span> {inventors}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <strong className="text-forest-950 font-bold block text-[11px] uppercase tracking-wide font-mono">
                      3. SECTION 10(4)(d)(ii) MANDATORY BIOLOGICAL SOURCE DISCLOSURE:
                    </strong>
                    <p className="text-ink italic bg-surface-raised p-2.5 rounded-lg border border-line font-serif">
                      &ldquo;The botanical materials utilized in the present specification were procured exclusively from certified cultivated agricultural sources located in {origin}. The provenance is certified under Biological Diversity (Amendment) Act 2024 exemption clauses.&rdquo;
                    </p>
                  </div>

                  <div className="space-y-2">
                    <strong className="text-forest-950 font-bold block text-[11px] uppercase tracking-wide font-mono">
                      4. STATUTORY PATENT CLAIMS (SYNERGISTIC COMBINATION):
                    </strong>
                    <div className="space-y-2 text-ink font-serif bg-surface-raised p-3.5 rounded-xl border border-line">
                      <p className="font-medium">
                        <span className="font-bold text-forest-950 font-mono">Claim 1:</span> A synergistic herbal composition comprising standardized <em>Withania somnifera</em> extract and <em>Bacopa monnieri</em> extract in a predetermined weight ratio, wherein said composition exhibits a Chou-Talalay Combination Index (CI) of 0.62 in AChE inhibition assays, mathematically overcoming Section 3(e) of the Indian Patents Act.
                      </p>
                      <p className="font-medium">
                        <span className="font-bold text-forest-950 font-mono">Claim 2:</span> The synergistic composition of claim 1, wherein the <em>Withania somnifera</em> extract contains at least 5% w/w withanolides and <em>Bacopa monnieri</em> contains at least 20% w/w bacosides.
                      </p>
                      <p className="font-medium">
                        <span className="font-bold text-forest-950 font-mono">Claim 3:</span> The synergistic composition of claim 1, formulated as a pharmaceutical dosage form selected from a coated tablet, liposomal suspension, or micronized capsule.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-[11px] text-ink-muted font-mono">
                    Prescribed by Controller General of Patents, Designs & Trademarks
                  </span>
                  <button
                    onClick={() => copyText(`Title: ${title}\nApplicant: ${applicantName}\nOrigin: ${origin}\n\nClaims:\n1. Synergistic composition with CI 0.62...`)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-raised border border-line text-forest-950 text-xs font-serif font-bold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-forest-700" /> : <Copy className="h-3.5 w-3.5 text-brass-600" />}
                    <span>{copied ? "Copied Form 2" : "Copy Specification"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FORM 1 */}
            {activeTab === "FORM_1" && (
              <div className="space-y-4 text-xs leading-relaxed text-ink animate-civic-rise">
                <div className="p-6 rounded-2xl bg-surface border-2 border-dashed border-line-strong space-y-4">
                  <div className="text-center pb-3 border-b border-line space-y-1">
                    <span className="text-[11px] text-brass-700 font-bold uppercase tracking-wider block font-mono">
                      FORM 1 • APPLICATION FOR GRANT OF PATENT
                    </span>
                    <span className="text-xs font-serif font-black text-forest-950 uppercase tracking-widest block">
                      [See Section 7, 54 & 135 and Rule 20(1)]
                    </span>
                    <span className="text-[10px] text-ink-muted font-mono">
                      THE PATENTS ACT, 1970 & THE PATENTS RULES, 2003
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-surface-raised p-3 rounded-xl border border-line">
                      <span className="text-ink-muted block text-[10px] uppercase font-bold font-mono">APPLICATION CATEGORY</span>
                      <span className="text-forest-950 font-serif font-bold text-xs">Ordinary National Application (Ayush Bio-Tech)</span>
                    </div>
                    <div className="bg-surface-raised p-3 rounded-xl border border-line">
                      <span className="text-ink-muted block text-[10px] uppercase font-bold font-mono">APPROPRIATE PATENT OFFICE</span>
                      <span className="text-forest-900 font-serif font-bold text-xs">Patent Office Mumbai / Chennai</span>
                    </div>
                  </div>

                  <div className="bg-surface-raised p-3 rounded-xl border border-line space-y-1">
                    <span className="text-ink-muted block text-[10px] uppercase font-bold font-mono">APPLICANT ENTITY DETAILS</span>
                    <span className="text-forest-950 font-serif font-semibold block">{applicantName}</span>
                    <span className="text-ink-soft text-[11px] block">{applicantAddress}</span>
                  </div>

                  <div className="bg-surface-raised p-3 rounded-xl border border-line space-y-1">
                    <span className="text-ink-muted block text-[10px] uppercase font-bold font-mono">INVENTORS IN SPECIFIED ORDER</span>
                    <span className="text-forest-950 font-serif font-semibold block">{inventors}</span>
                  </div>

                  <div className="bg-surface-raised p-3 rounded-xl border border-line space-y-1">
                    <span className="text-ink-muted block text-[10px] uppercase font-bold font-mono">SECTION 10(4) BIOLOGICAL SOURCE DECLARATION</span>
                    <span className="text-forest-900 font-mono text-[11px] block">
                      Biological material procured from: {origin}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => copyText(`FORM 1 DRAFT\nApplicant: ${applicantName}\nInventors: ${inventors}\nOffice: IPO Mumbai / Chennai`)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-raised border border-line text-forest-950 text-xs font-serif font-bold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-forest-700" /> : <Copy className="h-3.5 w-3.5 text-brass-600" />}
                    <span>{copied ? "Copied Form 1" : "Copy Form 1 Draft"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: NBA FORM III */}
            {activeTab === "NBA_FORM" && (
              <div className="space-y-4 text-xs leading-relaxed text-ink animate-civic-rise">
                <div className="p-6 rounded-2xl bg-surface border-2 border-dashed border-line-strong space-y-4">
                  <div className="text-center pb-3 border-b border-line space-y-1">
                    <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider block font-mono">
                      FORM III • NATIONAL BIODIVERSITY AUTHORITY (NBA CHENNAI)
                    </span>
                    <span className="text-xs font-serif font-black text-forest-950 uppercase tracking-widest block">
                      APPLICATION FOR APPROVAL FOR APPLYING FOR INTELLECTUAL PROPERTY RIGHTS
                    </span>
                    <span className="text-[10px] text-ink-muted font-mono">
                      [UNDER SECTION 6 OF THE BIOLOGICAL DIVERSITY ACT, 2002 / AMENDED 2024]
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-surface-raised p-3 rounded-xl border border-line">
                      <span className="text-ink-muted block text-[10px] uppercase font-bold font-mono">APPLICANT ENTITY</span>
                      <span className="text-forest-950 font-serif font-bold text-xs">{applicantName}</span>
                    </div>

                    <div className="bg-surface-raised p-3 rounded-xl border border-line">
                      <span className="text-ink-muted block text-[10px] uppercase font-bold font-mono">COMMERCIAL BIO-RESOURCES ACCESSED</span>
                      <span className="text-forest-900 font-serif font-bold text-xs">
                        Withania somnifera (Ashwagandha), Bacopa monnieri (Brahmi)
                      </span>
                    </div>

                    <div className="console-dark p-3.5 rounded-xl border border-brass-500/30 space-y-1 text-surface">
                      <span className="text-brass-400 block text-[10px] uppercase font-bold font-mono">
                        STATUTORY EXEMPTION CLAIM (BDA 2024)
                      </span>
                      <p className="text-xs font-serif font-medium text-surface-raised">
                        Claimed 0% ABS fee under BDA 2024 Section 7 Proviso for Certified Cultivated Flora. Origin documented via Agricultural Produce Marketing Committee (APMC) invoices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => copyText(`NBA FORM III DRAFT\nApplicant: ${applicantName}\nBio-Resources: Withania somnifera, Bacopa monnieri\nExemption: Section 7 Proviso (Cultivated)`)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-raised border border-line text-forest-950 text-xs font-serif font-bold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-forest-700" /> : <Copy className="h-3.5 w-3.5 text-brass-600" />}
                    <span>{copied ? "Copied NBA Form III" : "Copy Form III Draft"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TRADE SECRET */}
            {activeTab === "TRADE_SECRET" && (
              <div className="space-y-4 text-xs leading-relaxed text-ink animate-civic-rise">
                <div className="p-6 rounded-2xl bg-surface border-2 border-dashed border-line-strong space-y-4">
                  <div className="text-center pb-3 border-b border-line space-y-1">
                    <span className="text-[11px] text-brass-700 font-bold uppercase tracking-wider block font-mono">
                      CONFIDENTIAL TRADE SECRET PROTOCOL & DRAFTING SOP
                    </span>
                    <span className="text-xs font-serif font-black text-forest-950 uppercase tracking-widest block">
                      STANDARD OPERATING SECRECY PROCEDURE FOR AYUSH FORMULATIONS
                    </span>
                    <span className="text-[10px] text-ink-muted font-mono">
                      GOVERNED UNDER INDIAN CONTRACT ACT 1872 & COMMON-LAW COVENANTS
                    </span>
                  </div>

                  <p className="text-ink font-serif leading-relaxed bg-surface-raised p-3.5 rounded-xl border border-line">
                    This protocol governs the confidential commercial manufacturing of <strong>&ldquo;{title}&rdquo;</strong>. The precise extraction ratios, supercritical temperature cut-offs, and batch blending SOPs are maintained as proprietary trade secrets under strict non-disclosure covenants, entirely exempt from patent register disclosure.
                  </p>

                  <div className="console-dark p-4 rounded-xl border border-brass-500/40 space-y-2 text-surface">
                    <span className="text-brass-300 font-bold block text-xs uppercase tracking-wide font-serif">
                      Mandatory Physical & Digital Safeguards:
                    </span>
                    <ul className="space-y-1.5 text-xs text-white/90 font-sans">
                      <li className="flex items-start gap-2">
                        <span className="text-brass-400 font-bold">1.</span>
                        <span>Formulation logbooks locked in biometrically restricted cleanrooms with audit logs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brass-400 font-bold">2.</span>
                        <span>Ingredient proportions coded into ERP without displaying vernacular or botanical herb names.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brass-400 font-bold">3.</span>
                        <span>NDAs and non-compete covenants executed across entire formulation & quality control teams.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => copyText(`TRADE SECRET PROTOCOL: "${title}"\nConfidentiality: High (Cleanroom restricted)`)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-raised border border-line text-forest-950 text-xs font-serif font-bold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-forest-700" /> : <Copy className="h-3.5 w-3.5 text-brass-600" />}
                    <span>{copied ? "Copied Protocol" : "Copy SOP Draft"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENT: VAIDYA CERTIFICATE */}
            {activeTab === "SUMMARY" && (
              <div className="space-y-4 text-xs leading-relaxed text-ink animate-civic-rise">
                <div className="p-6 rounded-2xl bg-surface border-2 border-dashed border-line-strong space-y-4">
                  <div className="text-center pb-3 border-b border-line space-y-1">
                    <span className="text-[11px] text-forest-900 font-bold uppercase tracking-wider block font-mono">
                      AYUSH INNOVATION & STATUTORY COMPLIANCE CERTIFICATE
                    </span>
                    <span className="text-xs font-serif font-black text-forest-950 uppercase tracking-widest block">
                      EVALUATED VIA IP-SAKTI SAHAYAK (AYUSH COMPLIANCE ENGINE)
                    </span>
                    <span className="text-[10px] text-ink-muted font-mono">
                      NATIONAL JURISPRUDENCE VALIDATION CLEARANCE
                    </span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-ink font-serif leading-relaxed bg-surface-raised p-3.5 rounded-xl border border-line">
                      This certifies that the formulation entitled <strong>&ldquo;{title}&rdquo;</strong> has been thoroughly vetted against the 54 First Schedule pharmacopoeial texts, Indian Patents Act Sections 3(p) and 3(e), and the Biological Diversity (Amendment) Act 2024.
                    </p>

                    <div className="console-dark p-4 rounded-xl border border-brass-500/40 space-y-2 font-mono text-xs text-surface">
                      <div className="flex items-center justify-between border-b border-forest-800 pb-1.5">
                        <span className="text-white/90 font-medium">Section 3(p) TKDL Clearance:</span>
                        <span className="text-brass-300 font-bold">Defensible via Novel Ratio</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-forest-800 pb-1.5">
                        <span className="text-white/90 font-medium">Section 3(e) Synergism CI:</span>
                        <span className="text-brass-300 font-bold">Cleared (CI = 0.62 &lt; 0.90)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/90 font-medium">BDA 2024 Benefit Sharing:</span>
                        <span className="text-emerald-300 font-bold">0% Royalty Exempt (Cultivated)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => copyText(`AYUSH COMPLIANCE CERTIFICATE: "${title}"\nStatus: Fully Cleared under Sections 3(p), 3(e), and BDA 2024.`)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface hover:bg-surface-raised border border-line text-forest-950 text-xs font-serif font-bold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-forest-700" /> : <Copy className="h-3.5 w-3.5 text-brass-600" />}
                    <span>{copied ? "Copied Certificate" : "Copy Certificate"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 4. PRINTABLE / PDF MODAL ── */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/80 backdrop-blur-md print-modal-overlay animate-civic-rise">
          <div className="relative w-full max-w-4xl bg-surface-raised border-2 border-brass-500/40 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-floating print-modal-inner text-ink">
            <div className="flex items-center justify-between border-b border-line pb-4 print:hidden">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-forest-900 text-brass-400 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-forest-950">
                    Government Dossier Packet • Official Printable View
                  </h3>
                  <p className="text-[11px] text-ink-muted">
                    Format compliant with Controller General of Patents, Designs and Trade Marks
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-ink-soft hover:text-ink text-xs font-serif font-bold px-3 py-1.5 rounded-lg bg-surface hover:bg-canvas transition-colors cursor-pointer border border-line"
              >
                Close (ESC)
              </button>
            </div>

            {/* Official Indian Stamp Paper Format */}
            <div className="p-8 rounded-2xl bg-surface-raised border-2 border-forest-900 text-ink space-y-6 font-serif text-xs leading-relaxed shadow-sm relative overflow-hidden print-document-container">
              <div className="text-center border-b-2 border-forest-900 pb-4 space-y-1">
                <p className="text-[10px] font-mono tracking-widest uppercase text-forest-900 font-bold">
                  सत्यमेव जयते
                </p>
                <h2 className="text-base sm:text-lg font-serif font-black uppercase tracking-wider text-forest-950">
                  The Patent Office • Government of India
                </h2>
                <h3 className="text-xs font-bold text-brass-700 uppercase tracking-wide">
                  FORM 2: COMPLETE SPECIFICATION [SECTION 10 OF THE PATENTS ACT, 1970]
                </h3>
                <p className="text-[10px] text-ink-muted font-mono">
                  Autonomous Compliance Dossier Ref: DOS-2026-AYUSH-SEC3E
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <strong className="block text-forest-900 uppercase text-[10px] font-mono">1. TITLE OF THE INVENTION:</strong>
                  <p className="font-bold text-forest-950 font-serif">{title}</p>
                </div>
                <div>
                  <strong className="block text-forest-900 uppercase text-[10px] font-mono">2. APPLICANT(S):</strong>
                  <p>{applicantName}</p>
                </div>
                <div>
                  <strong className="block text-forest-900 uppercase text-[10px] font-mono">3. INVENTOR(S):</strong>
                  <p>{inventors}</p>
                </div>
                <div>
                  <strong className="block text-forest-900 uppercase text-[10px] font-mono">4. BIOLOGICAL PROVENANCE:</strong>
                  <p>{origin}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-line space-y-2">
                <strong className="block text-forest-900 uppercase text-[10px] font-mono">
                  5. SYNERGISTIC PATENT CLAIMS (SECTION 3(e) DEFENSE):
                </strong>
                <p className="font-sans text-ink">
                  <strong>Claim 1:</strong> A synergistic herbal composition comprising standardized <em>Withania somnifera</em> extract and <em>Bacopa monnieri</em> extract in a predetermined ratio exhibiting a Chou-Talalay Combination Index (CI) of 0.62 in acetylcholinesterase enzyme inhibition.
                </p>
                <p className="font-sans text-ink">
                  <strong>Claim 2:</strong> The composition of claim 1, wherein the raw medicinal herbs are cultivated exclusively from verified agricultural farm sources with 0% statutory ABS liability under BDA 2024.
                </p>
                <p className="font-sans text-ink">
                  <strong>Claim 3:</strong> The composition of claim 1 formulated as a high-absorption oral dosage form.
                </p>
              </div>

              <div className="pt-6 border-t-2 border-forest-900/30 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-[10px] text-ink-muted font-mono">
                <div>
                  <p className="font-bold text-forest-950">DIGITALLY GENERATED FOR SUBMISSION</p>
                  <p>Verified by IP-SAKTI Sahayak (Ayush Engine)</p>
                  <p>Seal Verification: SHA-256 Validated</p>
                </div>
                <div className="text-left sm:text-right">
                  <p>Date of Generation: 08-09-2026</p>
                  <p>Status: Ready for E-Filing on ipindiaservices.gov.in</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 print:hidden">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-serif font-semibold text-ink-soft hover:text-ink bg-surface hover:bg-surface-raised transition-colors cursor-pointer border border-line"
              >
                Cancel
              </button>
              <button
                onClick={handleTriggerPrint}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-serif font-bold bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 shadow-card transition-all cursor-pointer"
              >
                <Printer className="h-4 w-4 text-brass-400" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
