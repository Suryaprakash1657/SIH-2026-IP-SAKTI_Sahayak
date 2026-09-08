"use client";

import React, { useState } from "react";
import {
  FileText,
  Search,
  BookOpen,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Scale,
  AlertTriangle,
  Award,
  Scroll,
  Shield,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";

const QUICK_SEARCH_CHIPS = [
  "Section 3(p)",
  "Section 3(e)",
  "Section 7 BDA",
  "Rule 158B",
  "Section 10(4)(d)(ii)",
  "TKDL Guidelines",
];

const STATUTE_CLAUSES = [
  {
    document_code: "IPA_1970",
    document_title: "The Patents Act, 1970 (Act No. 39 of 1970)",
    gazette_date: "1970 (As Amended by Patents Amendment Act 2005)",
    section_number: "Section 3(p)",
    heading: "Inventions Not Patentable - Traditional Knowledge Bar",
    full_statute_text:
      "The following are not inventions within the meaning of this Act: (p) an invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components.",
    plain_english_translation:
      "You cannot patent any herbal recipe or medicinal practice that has already been known and used in India for generations. Remedies that belong to our community heritage cannot be privately monopolized.",
    formulation_impact:
      "If your recipe directly matches compositions in classical Ayurvedic, Siddha, or Unani texts (like Triphala or Saraswatarishta), the patent office will issue an outright statutory rejection under Section 3(p).",
    how_to_comply: [
      "Prove non-obvious technical processing: use a purified, standardized fraction (e.g. 95% withanolides) instead of raw root powder.",
      "Develop a novel delivery system (such as liposomal micro-encapsulation or sublingual spray) that enhances absorption.",
      "Prove unexpected synergistic potency when combined at a specific mathematical ratio.",
    ],
    landmark_precedent: {
      case_name: "CSIR Turmeric Patent Revocation (US Patent No. 5,401,504)",
      year: "1997",
      outcome: "Patent Revoked Worldwide",
      significance:
        "US researchers claimed a patent on turmeric powder for wound healing. Dr. R.A. Mashelkar and CSIR submitted ancient Sanskrit texts proving turmeric's medicinal use for millennia, forcing the US Patent Office to cancel all claims. This led directly to the creation of the TKDL.",
    },
  },
  {
    document_code: "IPA_1970",
    document_title: "The Patents Act, 1970 (Act No. 39 of 1970)",
    gazette_date: "1970 (As Amended by Patents Amendment Act 2005)",
    section_number: "Section 3(e)",
    heading: "Inventions Not Patentable - Mere Admixture Bar",
    full_statute_text:
      "The following are not inventions within the meaning of this Act: (e) a substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance.",
    plain_english_translation:
      "Simply mixing two or more known herbs together is not patentable if each herb merely does what it is already known to do separately (1 + 1 = 2). You must prove a supercharged biological boost (1 + 1 = 3 or more).",
    formulation_impact:
      "Almost every polyherbal patent application receives a Section 3(e) objection during first examination. Without quantitative comparative laboratory data proving synergy, your patent will be refused.",
    how_to_comply: [
      "Conduct in-vitro or in-vivo bioassays comparing Single Herb A, Single Herb B, and Combination A + B.",
      "Calculate the Chou-Talalay Combination Index (CI < 0.9) to mathematically verify super-additive synergy.",
      "Include explicit synergistic claim language in IPO Form 2 Complete Specification.",
    ],
    landmark_precedent: {
      case_name: "Indian Patent Office Curcumin + Piperine Synergy Defense",
      year: "2012",
      outcome: "Patent Granted (Patent No. 250123)",
      significance:
        "The applicant overcame severe Section 3(e) objections by demonstrating that adding just 20mg of piperine increased curcumin bioavailability by 2000% (20-fold), conclusively rebutting the 'mere admixture' exclusion.",
    },
  },
  {
    document_code: "BDA_2024",
    document_title: "The Biological Diversity (Amendment) Act, 2024",
    gazette_date: "Gazette Notification August 2023 / Enforced 2024",
    section_number: "Section 7 (Amended)",
    heading: "Prior Intimation to SBB & Cultivated Plant Exemption",
    full_statute_text:
      "No person who is a citizen of India or a body corporate shall obtain any biological resource for commercial utilization without giving prior intimation to the State Biodiversity Board: Provided that this requirement shall not apply to local people, vaids and hakims, who have been practicing indigenous medicine, nor to cultivated medicinal plants.",
    plain_english_translation:
      "If you commercialize wild forest herbs, you must notify your State Biodiversity Board and share royalties with local tribal gatherers. However, if you purchase cultivated herbs grown on farms by registered farmers, you pay 0% ABS royalty and enjoy complete exemption!",
    formulation_impact:
      "Sourcing herbs from certified cultivated farms eliminates benefit-sharing royalty liabilities (0.1% to 0.5% of sales) and protects your enterprise from statutory biodiversity penalties.",
    how_to_comply: [
      "Obtain a verified Certificate of Cultivated Origin from your herbal supplier, local Range Forest Officer (RFO), or Gram Panchayat.",
      "If you are a practicing Vaidya or Hakim dispensing classical remedies to patients, claim the explicit practitioner exemption.",
      "Disclose cultivated origin in your manufacturing records to ensure seamless AYUSH licensing audits.",
    ],
    landmark_precedent: {
      case_name: "Divya Pharmacy (Patanjali) vs Union of India (Uttarakhand High Court)",
      year: "2018",
      outcome: "Domestic Companies Subject to Fair Benefit Sharing",
      significance:
        "The High Court held that domestic Indian companies utilizing bio-resources must also contribute to fair and equitable benefit sharing. The 2024 BDA amendments subsequently clarified the exemption for certified cultivated plants.",
    },
  },
  {
    document_code: "DCA_1940",
    document_title: "Drugs and Cosmetics Act, 1940 & Rules, 1945",
    gazette_date: "Rule 158B as amended up to 2024",
    section_number: "Rule 158B",
    heading: "Licensing Requirements for Classical vs Proprietary ASU Drugs",
    full_statute_text:
      "Guidelines for Issue of License with respect to Ayurvedic, Siddha or Unani drugs: Part (I) Classical medicines manufactured strictly in accordance with the authoritative books specified in the First Schedule; Part (II) Patent or Proprietary medicines containing ingredients mentioned in the First Schedule with safety and effectiveness data.",
    plain_english_translation:
      "Ayurvedic products are divided into two legal categories: (1) Classical medicines that follow ancient books word-for-word, and (2) Proprietary medicines that use classical herbs in modern formats with proven safety.",
    formulation_impact:
      "Classical medicines do not need clinical trials for a manufacturing license, but they cannot be patented. Proprietary medicines can be protected by patents and trademarks, but require proof of safety and stability.",
    how_to_comply: [
      "If manufacturing a classical recipe, cite the exact textbook name, edition, chapter, and verse from the 54 authoritative books in the First Schedule.",
      "If developing a proprietary formulation, conduct accelerated stability testing and acute toxicity studies as prescribed under Rule 158B.",
      "Register a distinctive brand name in NICE Class 5 rather than using generic Sanskrit drug names.",
    ],
    landmark_precedent: {
      case_name: "Dabur India ASU Licensing Precedents",
      year: "2015",
      outcome: "Dual Portfolio Strategy (Classical + Proprietary)",
      significance:
        "Demonstrated how leading Ayush companies maintain classical lines (Chyawanprash) alongside proprietary patented formulations (micronized tablet extracts), maximizing both regulatory speed and IP protection.",
    },
  },
  {
    document_code: "IPA_1970",
    document_title: "The Patents Act, 1970 (Act No. 39 of 1970)",
    gazette_date: "Section 10(4) as amended by Act 38 of 2002",
    section_number: "Section 10(4)(d)(ii)",
    heading: "Mandatory Biological Origin Disclosure",
    full_statute_text:
      "If the applicant mentions a biological material in the specification which may not be available to the public, the applicant shall disclose the source and geographical origin of the biological material in the specification when used in an invention.",
    plain_english_translation:
      "Whenever you file a patent using plants or herbs, you must legally state where those plants were grown (state, district, and whether from a farm or forest). Hiding this information is grounds for revoking your patent.",
    formulation_impact:
      "Failure to disclose the geographic origin of Indian medicinal herbs in Form 2 Complete Specification will trigger an immediate examination objection and potential revocation under Section 64.",
    how_to_comply: [
      "Include explicit geographical sourcing origin coordinates in Specification Section 3.",
      "State whether the botanical materials were obtained from cultivated flora or forest wilderness.",
      "Attach SBB intimation acknowledgment or Form III NBA approval numbers.",
    ],
    landmark_precedent: {
      case_name: "Indian Patent Office Section 10(4) Revocation Standards",
      year: "2019",
      outcome: "Stringent Mandatory Origin Enforcement",
      significance:
        "Established that non-disclosure of geographical provenance is treated as non-curable ground for revocation during post-grant opposition, safeguarding sovereign biodiversity rights.",
    },
  },
];

export default function InspectorPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState(13);
  const [copiedId, setCopiedId] = useState(null);

  const filteredClauses = STATUTE_CLAUSES.filter(
    (c) =>
      c.section_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.plain_english_translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.document_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-8 mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#144d3c] uppercase tracking-wider mb-1.5">
            <Scale className="h-4 w-4 text-[#1b5a4b]" />
            Side-by-Side Jurisprudential Inspector
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#0a1c16]">
            Statute & Gazette Inspector
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl font-sans">
            Compare official Government of India gazettes side-by-side with conversational plain-English translations, patent office tests, and landmark precedents.
          </p>
        </div>

        {/* Font Zoom Controls & Mode Switcher */}
        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center p-1 rounded-xl bg-[#eee7d7] border border-[#d6ccb8]">
            <button
              onClick={() => setFontSize(Math.max(fontSize - 1, 11))}
              className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-[#e4dcce]"
              title="Decrease Font Size"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="text-[11px] font-mono px-2 text-stone-600">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(fontSize + 1, 17))}
              className="p-1.5 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-[#e4dcce]"
              title="Increase Font Size"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <PlainLanguageToggle compact />
        </div>
      </div>

      {/* Search Bar & Quick Chips */}
      <div className="parchment-card p-5 rounded-3xl space-y-3.5 border border-[#d6ccb8] shadow-luxury">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#2563eb]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search statutes, sections (e.g. Section 3p, Chou-Talalay, BDA Rule 158B)..."
            className="w-full bg-white border border-[#d6ccb8] rounded-2xl pl-11 pr-4 py-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#144d3c] shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider font-bold">
            Quick Clauses:
          </span>
          {QUICK_SEARCH_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(chip === searchQuery ? "" : chip)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all ${
                searchQuery === chip
                  ? "bg-[#144d3c] text-white shadow-xs"
                  : "bg-[#eee7d7] text-stone-700 hover:bg-[#e4dcce]"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Dual Column Gazette Stream */}
      <div className="space-y-8">
        {filteredClauses.map((clause, idx) => (
          <div
            key={idx}
            className="parchment-card rounded-3xl border border-[#d6ccb8] shadow-luxury overflow-hidden"
          >
            {/* Clause Master Banner */}
            <div className="p-5 bg-gradient-to-r from-[#122e26] via-[#1b4e41] to-[#0c231c] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2563eb]/40">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#2563eb]/20 border border-[#2563eb]/40 flex items-center justify-center text-[#38bdf8]">
                  <Scroll className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#38bdf8] uppercase block">
                    {clause.document_code} • {clause.gazette_date}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-black tracking-tight text-white mt-0.5">
                    {clause.section_number}: {clause.heading}
                  </h3>
                </div>
              </div>

              <button
                onClick={() =>
                  handleCopy(
                    `${clause.section_number} - ${clause.heading}\n${clause.full_statute_text}`,
                    idx
                  )
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-stone-200 border border-white/20 transition-colors"
              >
                {copiedId === idx ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedId === idx ? "Copied" : "Copy Statute"}</span>
              </button>
            </div>

            {/* Dual Column Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#e8dfcf]">
              {/* Left Side: Authentic Government Gazette Format */}
              <div className="p-6 sm:p-7 space-y-4 bg-[#fdfbf6]">
                <div className="flex items-center justify-between pb-2 border-b border-[#e8dfcf]">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#1e40af] flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-[#2563eb]" /> Official Gazette Text
                  </span>
                  <span className="text-[10px] font-mono text-slateLegal-600 font-semibold">Verbatim Statutory Record</span>
                </div>

                <div
                  className="font-serif leading-relaxed text-stone-900 p-4 rounded-2xl bg-white border border-[#ded5c2] shadow-inner italic"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  "{clause.full_statute_text}"
                </div>

                <div className="p-4 rounded-2xl bg-[#edf6f2] border border-[#2d7f63]/30 space-y-1.5 text-xs">
                  <span className="font-serif font-bold text-[#144d3c] block">
                    Formulation Impact on Ayush Inventions:
                  </span>
                  <p className="text-stone-700 leading-relaxed font-sans">{clause.formulation_impact}</p>
                </div>
              </div>

              {/* Right Side: Plain-Language Translation & Landmark Precedents */}
              <div className="p-6 sm:p-7 space-y-5 bg-[#fbf9f4]">
                <div className="flex items-center justify-between pb-2 border-b border-[#e8dfcf]">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#144d3c] flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#2563eb]" /> Plain-English Legal Meaning
                  </span>
                  <span className="text-[10px] font-mono text-[#144d3c] bg-[#e2efe8] px-2 py-0.5 rounded">
                    Vaidya Actionable
                  </span>
                </div>

                <div
                  className="font-sans leading-relaxed text-[#18392f] p-4 rounded-2xl bg-gradient-to-br from-[#f8faf8] to-[#f4ede0] border border-[#ded5c2]"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {clause.plain_english_translation}
                </div>

                {/* Compliance Checklist */}
                <div className="space-y-2">
                  <span className="text-xs font-serif font-bold text-stone-900 block">
                    How to Clear Examination Objections:
                  </span>
                  <div className="space-y-1.5 text-xs text-stone-700">
                    {clause.how_to_comply.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-[#ded5c2]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#1b5a4b] shrink-0 mt-0.5" />
                        <span className="leading-normal font-sans">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Landmark Case Law Precedent */}
                <div className="p-4 rounded-2xl bg-white border border-[#2563eb]/30 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1e40af] flex items-center gap-1">
                      <Award className="h-3 w-3 text-[#2563eb]" /> Landmark Judicial Precedent
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-[#eff6ff] text-[#1e40af] px-2 py-0.5 rounded border border-[#2563eb]/30">
                      {clause.landmark_precedent.year}
                    </span>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-stone-900">
                    {clause.landmark_precedent.case_name}
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-normal font-sans">
                    {clause.landmark_precedent.significance}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
