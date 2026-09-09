"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Lock,
  Tag,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Scale,
  Award,
  ShieldAlert,
  Scroll,
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";

const STRATEGIES = [
  {
    id: "TRADE_SECRET",
    title: "Process Trade Secrets",
    plainTitle: "Confidential Secret Recipe Protocol",
    icon: Lock,
    accentColor: "brass",
    tag: "Indefinite Protection",
    summary:
      "Keep proprietary extraction temperatures, exact soaking durations, and standardized chromatographic fraction SOPs confidential under strict bilateral NDAs.",
    whenToUse: "When your recipe uses classical herbs that cannot be patented due to Section 3(p), but your extraction method is proprietary.",
    actionItems: [
      "Divide manufacturing steps between different facility teams so no single person holds the full master formula.",
      "Execute bilateral Non-Disclosure & Non-Compete Agreements (NDAs) with all lab technicians and contract manufacturers.",
      "Label master formulation logs as 'Strictly Confidential & Proprietary Trade Secret under Common Law'.",
    ],
    sampleClause:
      "The Recipient acknowledges that the proprietary extraction ratio, solvent temperature curve, and active botanical concentrations constitute trade secrets of the Disclosing Party and shall not be disclosed to any third party for an indefinite period.",
  },
  {
    id: "TRADEMARK",
    title: "Registered Trademark (Class 5)",
    plainTitle: "Brand Name & Packaging Monopoly",
    icon: Tag,
    accentColor: "forest",
    tag: "10 Years (Renewable Forever)",
    summary:
      "Register a distinctive, coined brand name for your Ayush remedy in NICE Class 5 (Pharmaceutical & Ayush preparations) to own exclusive marketing rights.",
    whenToUse: "When anyone can sell the herbal ingredients, but you want exclusive rights so competitors cannot copy your brand name or logo.",
    actionItems: [
      "Avoid descriptive Sanskrit words alone (e.g. 'Pure Triphala' cannot be trademarked, but 'TriphaLux' or 'VedaPhala' can).",
      "Run a clearance search on the IP India Trademark Public Search portal in NICE Class 5.",
      "File Form TM-A with the Indian Trademark Registry claiming user date or proposed to be used.",
    ],
    sampleClause:
      "Application under Class 5 of the Trade Marks Rules, 2017 for goods: 'Ayurvedic, herbal and medicinal preparations for human consumption; dietary and therapeutic supplements.'",
  },
  {
    id: "GI_TAG",
    title: "Geographical Indication (GI Tag)",
    plainTitle: "Certified Authentic Regional Origin",
    icon: MapPin,
    accentColor: "emerald",
    tag: "Authorized User Status",
    summary:
      "Authenticate biological raw drugs using registered Indian GI tags (e.g. Malabar Pepper, Kashmir Saffron, Naga Mircha) to command premium commercial value and prevent adulteration.",
    whenToUse: "When your product's superior potency is derived from specific regional soil and climatic terroir.",
    actionItems: [
      "Source herbs from certified farmer cooperatives in registered GI designated regions.",
      "Apply to the GI Registry in Chennai for 'Authorized User' status under the Geographical Indications of Goods Act, 1999.",
      "Display the official Government of India GI logo on retail packaging to justify 30-50% pricing premiums.",
    ],
    sampleClause:
      "Procured exclusively from certified registered cultivators of Malabar Pepper (GI Application No. 49) under the Geographical Indications of Goods (Registration and Protection) Act, 1999.",
  },
  {
    id: "RULE_158B",
    title: "ASU Classical License (Rule 158B)",
    plainTitle: "Instant Regulatory Fast-Track",
    icon: Scale,
    accentColor: "saffron",
    tag: "No Clinical Trials Needed",
    summary:
      "Manufacture classical recipes under Rule 158B Part (I) of the Drugs & Cosmetics Rules without needing expensive, multi-year clinical trials.",
    whenToUse: "When you want to get to market in 60-90 days using time-tested formulas documented in Charaka, Sushruta, or Sharangadhara Samhita.",
    actionItems: [
      "Cite the exact textbook name, edition, chapter, and verse from the 54 authoritative books in the First Schedule.",
      "Comply with Good Manufacturing Practices (GMP) under Schedule T of the Drugs and Cosmetics Rules, 1945.",
      "Submit batch analysis records and pharmacopoeial quality standards (API standards) to the State Licensing Authority (SLA).",
    ],
    sampleClause:
      "Licensed as an Ayurvedic Classical Medicine under Rule 158B Part (I) of Drugs & Cosmetics Rules, 1945, manufactured strictly in accordance with Sharangadhara Samhita, Madhyama Khanda, Adhyaya 6.",
  },
];

export default function PivotEnginePage() {
  const { mode } = useLanguageStore();
  const isInnovator = mode === "innovator";

  const [activeStrategy, setActiveStrategy] = useState(STRATEGIES[0].id);
  const [copiedId, setCopiedId] = useState(null);

  const current = STRATEGIES.find((s) => s.id === activeStrategy) || STRATEGIES[0];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 mx-auto space-y-8 text-ink">
      {/* ── 1. HEADER BANNER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brass-700 uppercase tracking-wider mb-1.5">
            <Compass className="h-4 w-4 text-brass-600" />
            {isInnovator ? "Alternative Protection Routes" : "Non-Patent Intellectual Property Pivots"}
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-forest-950">
            Alternative Protection Hub
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft mt-1 max-w-2xl font-sans">
            {isInnovator
              ? "If your formulation matches classical scriptures and cannot be patented, don't worry! Explore 4 high-value alternative routes to protect your brand and trade secrets."
              : "Defensive and commercial monetization alternatives: Trade Secret protection, NICE Class 5 Trademarks, Geographical Indications, and Rule 158B licensing."}
          </p>
        </div>

        <PlainLanguageToggle compact />
      </div>

      {/* ── 2. STRATEGY NAVIGATION RAIL ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STRATEGIES.map((strat) => {
          const Icon = strat.icon;
          const isActive = strat.id === activeStrategy;

          return (
            <button
              key={strat.id}
              onClick={() => setActiveStrategy(strat.id)}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer space-y-2.5 ${
                isActive
                  ? "bg-forest-900 text-surface-raised border-forest-700 shadow-card ring-2 ring-forest-700/20"
                  : "bg-surface-raised border-line hover:border-forest-700/40 text-ink shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center border ${
                    isActive
                      ? "bg-forest-950 text-brass-400 border-forest-800"
                      : "bg-surface text-forest-800 border-line"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    isActive
                      ? "bg-forest-950 text-brass-300 border-brass-600/30"
                      : "bg-surface text-ink-muted border-line"
                  }`}
                >
                  {strat.tag}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-sm leading-tight">
                  {isInnovator ? strat.plainTitle : strat.title}
                </h3>
                <span
                  className={`text-[10px] font-mono mt-0.5 block ${
                    isActive ? "text-ink-inverse/70" : "text-ink-muted"
                  }`}
                >
                  {strat.id.replace("_", " ")}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── 3. DETAILED STRATEGY BLUEPRINT CARD ── */}
      <div className="parchment-card p-6 sm:p-8 space-y-6 border border-line shadow-card text-ink">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brass-700 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brass-600" /> Strategic Implementation Blueprint
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 mt-0.5">
              {isInnovator ? current.plainTitle : current.title}
            </h2>
          </div>
          <span className="text-xs px-3.5 py-1 rounded-full font-mono font-bold bg-forest-50 text-forest-900 border border-forest-600/30 self-start sm:self-auto">
            {current.tag}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed font-sans">
          {current.summary}
        </p>

        {/* When to Use Callout */}
        <div className="p-4 rounded-2xl bg-surface border border-line text-xs font-sans space-y-1">
          <span className="font-serif font-bold text-forest-950 block text-[11px]">
            Statutory Context / When to Deploy:
          </span>
          <p className="text-ink-soft">{current.whenToUse}</p>
        </div>

        {/* Action Items List */}
        <div className="space-y-3">
          <span className="font-serif font-bold text-sm text-forest-950 block">
            Execution Checklist for Ayurvedic Founders:
          </span>
          <div className="space-y-2">
            {current.actionItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-surface border border-line text-xs text-ink-soft font-sans"
              >
                <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Legal / Contractual Clause */}
        <div className="space-y-3 pt-4 border-t border-line">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-xs text-forest-950 flex items-center gap-1.5">
              <Scroll className="h-3.5 w-3.5 text-brass-600" /> Model Statutory / Contractual Language:
            </span>

            <button
              onClick={() => handleCopy(current.sampleClause, current.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif font-bold bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 transition-all cursor-pointer"
            >
              {copiedId === current.id ? (
                <>
                  <Check className="h-3 w-3 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 text-brass-400" />
                  <span>Copy Clause</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-line font-mono text-xs text-ink leading-relaxed">
            &ldquo;{current.sampleClause}&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}
