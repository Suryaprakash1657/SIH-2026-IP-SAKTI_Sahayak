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
    accentColor: "amber",
    tag: "Permanent Protection",
    summary:
      "Keep proprietary extraction temperatures, exact soaking durations, and standardized chromatographic fraction SOPs confidential under strict NDAs.",
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
    accentColor: "blue",
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
    accentColor: "purple",
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

  const [activeStrategyId, setActiveStrategyId] = useState("TRADE_SECRET");
  const [copied, setCopied] = useState(false);

  const activeStrategy = STRATEGIES.find((s) => s.id === activeStrategyId) || STRATEGIES[0];

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-8 mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1e40af] uppercase tracking-wider mb-1.5">
            <Compass className="h-4 w-4 text-[#2563eb]" />
            {isInnovator ? "Can't Patent? Here's Your Playbook" : "Alternative Non-Patent IP & Monetization Hub"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#0a1c16]">
            Alternative Protection Hub
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl font-sans">
            {isInnovator
              ? "If your recipe is an ancient remedy barred from patenting (Section 3p), pivot seamlessly to Trade Secrets, Brand Trademarks, GI Tags, and fast-track Ayush licenses."
              : "Strategically transition unpatentable traditional formulations into enforceable trade secrets, NICE Class 5 trademarks, and Rule 158B ASU manufacturing approvals."}
          </p>
        </div>

        <PlainLanguageToggle compact />
      </div>

      {/* Grid of 4 Alternative IP Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {STRATEGIES.map((strat) => {
          const Icon = strat.icon;
          const isSelected = activeStrategyId === strat.id;
          return (
            <div
              key={strat.id}
              onClick={() => setActiveStrategyId(strat.id)}
              className={`p-6 rounded-3xl border cursor-pointer transition-all space-y-3.5 ${
                isSelected
                  ? "bg-[#144d3c] border-[#225e50] text-[#fbf8f0] shadow-luxury scale-102"
                  : "parchment-card border-[#d6ccb8] text-stone-800 hover:border-[#2563eb] hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`h-11 w-11 rounded-2xl flex items-center justify-center shadow-xs ${
                    isSelected
                      ? "bg-[#22705d] text-[#38bdf8]"
                      : "bg-[#eff6ff] text-[#1e40af] border border-[#2563eb]/30"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    isSelected
                      ? "bg-white/15 text-[#38bdf8] border-white/20"
                      : "bg-[#eee7d7] text-stone-700 border-[#d6ccb8]"
                  }`}
                >
                  {strat.tag}
                </span>
              </div>

              <div>
                <h3 className={`font-serif font-bold text-base leading-snug ${isSelected ? "text-white" : "text-[#0a1c16]"}`}>
                  {strat.title}
                </h3>
                <span className={`text-[11px] block mt-0.5 ${isSelected ? "text-stone-300" : "text-[#1e40af] font-semibold"}`}>
                  {strat.plainTitle}
                </span>
              </div>

              <p className={`text-xs leading-relaxed font-sans ${isSelected ? "text-stone-200" : "text-stone-600"}`}>
                {strat.summary}
              </p>
            </div>
          );
        })}
      </div>

      {/* Strategy Deep-Dive Execution Deck */}
      <div className="parchment-card p-6 sm:p-9 rounded-3xl border border-[#d6ccb8] shadow-luxury space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e8dfcf]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#eff6ff] border border-[#2563eb]/40 flex items-center justify-center text-[#1e40af]">
              <activeStrategy.icon className="h-5 w-5 text-[#2563eb]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1e40af]">
                Selected Commercial Pivot
              </span>
              <h3 className="text-lg font-serif font-bold text-[#0e2720]">
                {activeStrategy.title} ({activeStrategy.plainTitle})
              </h3>
            </div>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-[#eff6ff] text-[#1e40af] font-mono font-bold border border-[#2563eb]/40">
            {activeStrategy.tag}
          </span>
        </div>

        {/* When to use */}
        <div className="p-4 rounded-2xl bg-[#edf6f2] border border-[#2d7f63]/30 space-y-1">
          <span className="text-xs font-mono font-bold uppercase text-[#144d3c] flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5" /> When to Use This Strategy:
          </span>
          <p className="text-xs text-stone-700 font-sans leading-relaxed">
            {activeStrategy.whenToUse}
          </p>
        </div>

        {/* Action Items */}
        <div className="space-y-2.5">
          <span className="text-xs font-serif font-bold text-[#0e2720] block">
            Operational Execution Checklist:
          </span>
          <div className="space-y-2">
            {activeStrategy.actionItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-[#ded5c2] text-xs text-stone-700 shadow-xs"
              >
                <CheckCircle2 className="h-4 w-4 text-[#1b5a4b] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-sans">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Legal Clause */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif font-bold text-[#0e2720] flex items-center gap-1.5">
              <Scroll className="h-3.5 w-3.5 text-[#2563eb]" /> Official Drafting Template / Contractual Clause:
            </span>
            <button
              onClick={() => copyText(activeStrategy.sampleClause)}
              className="text-xs font-bold text-stone-700 hover:text-stone-950 flex items-center gap-1.5 bg-[#eee7d7] hover:bg-[#e4dcce] px-3 py-1.5 rounded-xl border border-[#d6ccb8] transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#144d3c]" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Clause"}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#ded5c2] text-xs font-mono text-stone-900 leading-relaxed shadow-inner">
            "{activeStrategy.sampleClause}"
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#e8dfcf]">
          <Link
            href="/dossier"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#144d3c] to-[#0c2f25] text-white hover:scale-102 transition-all shadow-md"
          >
            <span>Include This Strategy in Dossier Packet</span>
            <ArrowRight className="h-3.5 w-3.5 text-sky-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
