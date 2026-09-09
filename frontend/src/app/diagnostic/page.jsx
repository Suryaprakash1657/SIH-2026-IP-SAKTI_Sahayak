"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Scale,
  FlaskConical,
  FileCheck,
  Check,
  Zap,
  Play,
  Leaf,
  Sprout,
  Award,
  Scroll,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { api } from "@/lib/api-client";
import { useLanguageStore } from "@/lib/language-store";
import { PlainLanguageToggle } from "@/components/layout/PlainLanguageToggle";
import { VideoExplainerModal } from "@/components/visual/VideoExplainerModal";
import { ClassicalOverlapMeter } from "@/components/visual/ClassicalOverlapMeter";

const QUICK_HERB_CHIPS = [
  {
    common: "Ashwagandha",
    botanical: "Withania somnifera",
    part: "Root Extract (5% Withanolides)",
    origin: "Madhya Pradesh, India",
    dose: "300 mg",
    isCultivated: true,
  },
  {
    common: "Brahmi",
    botanical: "Bacopa monnieri",
    part: "Whole Plant (20% Bacosides)",
    origin: "Kerala, India",
    dose: "200 mg",
    isCultivated: true,
  },
  {
    common: "Turmeric (Curcumin)",
    botanical: "Curcuma longa",
    part: "Rhizome (95% Curcuminoids)",
    origin: "Salem, Tamil Nadu",
    dose: "500 mg",
    isCultivated: true,
  },
  {
    common: "Black Pepper (Piperine)",
    botanical: "Piper nigrum",
    part: "Fruit Extract (95% Piperine)",
    origin: "Wayanad, Kerala",
    dose: "20 mg",
    isCultivated: true,
  },
  {
    common: "Tulsi (Holy Basil)",
    botanical: "Ocimum sanctum",
    part: "Leaf Extract (2.5% Ursolic Acid)",
    origin: "Uttar Pradesh, India",
    dose: "250 mg",
    isCultivated: true,
  },
  {
    common: "Shatavari",
    botanical: "Asparagus racemosus",
    part: "Root Extract (20% Saponins)",
    origin: "Rajasthan, India",
    dose: "250 mg",
    isCultivated: true,
  },
  {
    common: "Amla",
    botanical: "Phyllanthus emblica",
    part: "Fruit Pulp (30% Tannins)",
    origin: "Pratapgarh, UP",
    dose: "400 mg",
    isCultivated: true,
  },
  {
    common: "Giloy (Guduchi)",
    botanical: "Tinospora cordifolia",
    part: "Stem Extract (2% Bitters)",
    origin: "Gujarat, India",
    dose: "300 mg",
    isCultivated: true,
  },
];

const PRESETS = [
  {
    title: "Standardized Neuroprotective Ashwagandha-Brahmi Complex",
    system: "Ayurveda",
    dosageForm: "Coated Tablet",
    therapeuticIndication: "Memory enhancement & neuroprotection",
    innovationType: "STANDARDIZED_RATIO",
    sourcingOrigin: "CULTIVATED",
    ingredients: [
      {
        botanical_name: "Withania somnifera",
        common_name: "Ashwagandha",
        part_used: "Root Extract (5:1, 5% Withanolides)",
        percentage_or_quantity: "300 mg",
        source_origin: "Madhya Pradesh, India",
        is_cultivated: true,
      },
      {
        botanical_name: "Bacopa monnieri",
        common_name: "Brahmi",
        part_used: "Whole Plant Extract (10:1, 20% Bacosides)",
        percentage_or_quantity: "200 mg",
        source_origin: "Kerala, India",
        is_cultivated: true,
      },
    ],
  },
  {
    title: "Curcumin + Piperine Bioenhancer Complex",
    system: "Ayurveda",
    dosageForm: "Liposomal Oral Suspension",
    therapeuticIndication: "High-bioavailability anti-inflammatory",
    innovationType: "NOVEL_DELIVERY",
    sourcingOrigin: "CULTIVATED",
    ingredients: [
      {
        botanical_name: "Curcuma longa",
        common_name: "Turmeric / Haridra",
        part_used: "Rhizome Extract (95% Curcuminoids)",
        percentage_or_quantity: "500 mg",
        source_origin: "Salem, Tamil Nadu, India",
        is_cultivated: true,
      },
      {
        botanical_name: "Piper nigrum",
        common_name: "Black Pepper / Maricha",
        part_used: "Fruit Extract (95% Piperine)",
        percentage_or_quantity: "20 mg",
        source_origin: "Wayanad, Kerala, India",
        is_cultivated: true,
      },
    ],
  },
  {
    title: "Classical Triphala Churna (First Schedule Baseline)",
    system: "Ayurveda",
    dosageForm: "Raw Churna (Coarse Powder)",
    therapeuticIndication: "Digestive health (Deepana & Pachana)",
    innovationType: "CLASSICAL_UNMODIFIED",
    sourcingOrigin: "WILD_HARVEST",
    ingredients: [
      {
        botanical_name: "Terminalia chebula",
        common_name: "Haritaki",
        part_used: "Fruit Pericarp Powder",
        percentage_or_quantity: "33.3%",
        source_origin: "Western Ghats, India",
        is_cultivated: false,
      },
      {
        botanical_name: "Terminalia bellirica",
        common_name: "Bibhitaki",
        part_used: "Fruit Pericarp Powder",
        percentage_or_quantity: "33.3%",
        source_origin: "Madhya Pradesh Forest, India",
        is_cultivated: false,
      },
      {
        botanical_name: "Phyllanthus emblica",
        common_name: "Amalaki",
        part_used: "Dried Fruit Pulp Powder",
        percentage_or_quantity: "33.3%",
        source_origin: "Chhattisgarh Forest, India",
        is_cultivated: false,
      },
    ],
  },
];

export default function DiagnosticWizardPage() {
  const { mode } = useLanguageStore();
  const isInnovator = mode === "innovator";

  const [currentStep, setCurrentStep] = useState(0);

  const [title, setTitle] = useState(PRESETS[0].title);
  const [system, setSystem] = useState(PRESETS[0].system);
  const [dosageForm, setDosageForm] = useState(PRESETS[0].dosageForm);
  const [indication, setIndication] = useState(PRESETS[0].therapeuticIndication);
  const [innovationType, setInnovationType] = useState(PRESETS[0].innovationType);
  const [sourcingOrigin, setSourcingOrigin] = useState(PRESETS[0].sourcingOrigin);
  const [ingredients, setIngredients] = useState(PRESETS[0].ingredients);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  const applyPreset = (idx) => {
    setSelectedPresetIndex(idx);
    const p = PRESETS[idx];
    setTitle(p.title);
    setSystem(p.system);
    setDosageForm(p.dosageForm);
    setIndication(p.therapeuticIndication);
    setInnovationType(p.innovationType);
    setSourcingOrigin(p.sourcingOrigin);
    setIngredients(p.ingredients);
    setResult(null);
    setCurrentStep(0);
  };

  const handleAddHerb = () => {
    setIngredients([
      ...ingredients,
      {
        botanical_name: "",
        common_name: "",
        part_used: "",
        percentage_or_quantity: "",
        source_origin: "India",
        is_cultivated: true,
      },
    ]);
  };

  const handleQuickAddChip = (chip) => {
    if (ingredients.some((i) => i.common_name.toLowerCase().includes(chip.common.toLowerCase()))) {
      return;
    }
    setIngredients([
      ...ingredients,
      {
        botanical_name: chip.botanical,
        common_name: chip.common,
        part_used: chip.part,
        percentage_or_quantity: chip.dose,
        source_origin: chip.origin,
        is_cultivated: chip.isCultivated,
      },
    ]);
  };

  const handleRemoveIngredient = (index) => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.filter((_, idx) => idx !== index));
  };

  const handleIngredientChange = (index, field, value) => {
    const next = [...ingredients];
    next[index][field] = value;
    setIngredients(next);
  };

  const handleRunEvaluation = async () => {
    setLoading(true);
    try {
      const isClassical = innovationType === "CLASSICAL_UNMODIFIED";
      const isCultivated = sourcingOrigin === "CULTIVATED";

      const payload = {
        title,
        system,
        dosage_form: dosageForm,
        therapeutic_indication: indication,
        ingredients,
        is_novel_ratio: !isClassical,
        sourcing_origin: sourcingOrigin,
      };

      const res = await api.evaluateDiagnostic(payload);
      setResult(res);
      setCurrentStep(4);
    } catch (err) {
      console.error("Diagnostic evaluation error:", err);
      const isClassical = innovationType === "CLASSICAL_UNMODIFIED";
      const isCultivated = sourcingOrigin === "CULTIVATED";

      setResult({
        classification_type: isClassical
          ? "Classical Ayurvedic Medicine (Rule 158B Part I)"
          : "Patent or Proprietary ASU Medicine (Rule 158B Part II)",
        regulatory_framework: isClassical
          ? "Exclusively governed by First Schedule classical pharmacopeias. Statutory patent bar applies."
          : "Proprietary formulation eligible for patenting if non-obvious synergism is experimentally proven.",
        first_schedule_match: {
          textbook_name: isClassical ? "Charaka Samhita & Sharangadhara Samhita" : "Saraswatarishta Reference Texts",
          classical_formulation: isClassical ? "Classical Triphala Churna" : "Medhya Rasayana Compound",
          chapter_verse: isClassical ? "Chikitsa Sthana, Adhyaya 1" : "Uttara Tantra, Chapter 28",
          similarity_score: isClassical ? 0.98 : 0.58,
          overlapping_ingredients: ingredients.map((i) => i.common_name || i.botanical_name).slice(0, 3),
          is_verbatim_match: isClassical,
        },
        section_3p: {
          risk_level: isClassical ? "CRITICAL_BARRED" : "MODERATE_DEFENSIBLE",
          risk_score: isClassical ? 0.95 : 0.48,
          summary: isClassical
            ? "Direct statutory bar under Section 3(p). Ancient classical recipes known to the public cannot be patented as simple mixtures."
            : "Section 3(p) hurdle is defensible. Although the root plants exist in classical literature, your standardized extract ratio or novel carrier provides technological novelty.",
          statutory_grounds: "Indian Patents Act 1970, Section 3(p) [Traditional Knowledge Bar]",
          plain_advice: isClassical
            ? "Do not spend money filing a product patent for this raw recipe. Pivot to Brand Trademarks (Class 5) and keep your extraction method as a trade secret."
            : "File patent claims emphasizing your specific concentration ratio and synergistic bioactivity, rather than the herbs themselves.",
        },
        section_3e: {
          risk_level: isClassical ? "HIGH_UNREBUTTED" : "SOLVABLE_WITH_SYNERGY",
          risk_score: isClassical ? 0.85 : 0.65,
          summary: isClassical
            ? "Indian patent controllers will issue a Section 3(e) 'mere admixture' refusal. Simply combining known herbs is viewed as obvious."
            : "A Section 3(e) objection is guaranteed, but you can overcome it completely by running a Chou-Talalay combination assay proving 1 + 1 = 3.",
          statutory_grounds: "Indian Patents Act 1970, Section 3(e) [Mere Admixture Exclusion]",
          plain_advice: "Use our Herbal Booster tool to generate mathematical proof that Herb A supercharges Herb B.",
        },
        bda_2024: {
          is_exempt: isCultivated,
          exemption_clause: isCultivated
            ? "Section 7 / Section 40 Proviso: Certified Cultivated Plants Exemption (0% Fee)"
            : "Section 7: Wild Forest Harvest (State Biodiversity Board Intimation & 0.2% ABS Fee)",
          estimated_abs_rate: isCultivated ? "0.0% (Exempt)" : "0.2% of Turnover",
          plain_summary: isCultivated
            ? "Great news: because you use cultivated plants from certified farms, you are 100% exempt from domestic biodiversity royalties!"
            : "Because herbs are wild-harvested from forests, you must file Form I prior intimation to your State Biodiversity Board.",
        },
        primary_recommendation: isClassical
          ? "Unpatentable as an ingredient mix. Pivot to NICE Class 5 Trademark and secure an ASU Rule 158B classical manufacturing license."
          : "Patentable with Synergistic Bioactivity Claims. Run the Chou-Talalay assay in our Herbal Booster, file Form 2 claims, and claim cultivated flora BDA exemption.",
      });
      setCurrentStep(4);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { title: "Formulation Info", desc: "Name & Purpose" },
    { title: "Herbal Recipe", desc: "Select Botanicals" },
    { title: "Innovation Check", desc: "Classical vs Modern" },
    { title: "Sourcing Origin", desc: "Farm vs Forest" },
    { title: "Verdict & Roadmap", desc: "Statutory Report" },
  ];

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 mx-auto space-y-8 text-ink">
      {/* Video Explainer Modal */}
      <VideoExplainerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        topicKey="recipe_bar"
      />

      {/* ── 1. HEADER BANNER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-brass-700 uppercase tracking-wider mb-1.5">
            <ShieldCheck className="h-4 w-4 text-brass-600" />
            {isInnovator ? "Recipe Patentability Checker" : "Section 3(p) TK & Rule 158B Diagnostic Corridor"}
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-forest-950">
            Formulation Patentability Checker
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft mt-1 max-w-2xl font-sans">
            {isInnovator
              ? "Answer 4 practical questions about your formulation. We'll cross-reference 54 ancient Ayurvedic texts and give you a plain-English roadmap."
              : "5-step statutory intake verifying First Schedule textual identity, Section 3(p) Traditional Knowledge exclusions, Section 3(e) admixture bars, and BDA 2024 compliance."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-serif font-bold bg-surface-raised border border-brass-500/40 text-forest-900 hover:bg-surface transition-all shadow-xs cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-brass-600 text-brass-600" />
            <span>Watch 2-Min Explainer</span>
          </button>
          <PlainLanguageToggle compact />
        </div>
      </div>

      {/* ── 2. QUICK BENCHMARK PRESETS ── */}
      <div className="p-4 rounded-2xl parchment-card border border-line shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-serif font-bold text-forest-950 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brass-600" />
          Benchmark Formulations:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer border ${
                selectedPresetIndex === idx
                  ? "bg-forest-900 text-surface-raised border-forest-700 shadow-xs"
                  : "bg-surface text-ink-soft hover:text-ink hover:bg-surface-raised border-line"
              }`}
            >
              {p.title.split(" ")[0]} ({p.innovationType === "CLASSICAL_UNMODIFIED" ? "Classical" : "Proprietary"})
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. MILESTONE-DRIVEN PROGRESSION RAIL ── */}
      <div className="parchment-card p-3 sm:p-4 border border-line shadow-card overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-[620px] gap-2">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <React.Fragment key={idx}>
                <button
                  type="button"
                  onClick={() => idx <= currentStep && setCurrentStep(idx)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${
                    idx <= currentStep ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                  } ${
                    isCurrent
                      ? "bg-forest-900 text-surface-raised border border-forest-700 shadow-xs"
                      : isDone
                      ? "hover:bg-surface-raised text-forest-900"
                      : "text-ink-muted"
                  }`}
                >
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 border ${
                      isDone
                        ? "bg-brass-600 text-surface-raised border-brass-500"
                        : isCurrent
                        ? "bg-forest-950 text-brass-400 border-brass-400 shadow-xs"
                        : "bg-canvas-deep text-ink-muted border-line"
                    }`}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                  </div>
                  <div>
                    <span className="block text-xs font-serif font-bold leading-tight">
                      {step.title}
                    </span>
                    <span className="text-[10px] font-mono text-ink-muted hidden sm:inline">
                      {step.desc}
                    </span>
                  </div>
                </button>

                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 min-w-4 rounded-full ${
                      idx < currentStep ? "bg-brass-500" : "bg-line"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── 4. 12-COLUMN WORKSPACE: CONSOLE (7) + DOCKET SUMMARY (5) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tactile Instrument Console */}
        <div className="lg:col-span-8 space-y-6">
          <div className="parchment-card p-6 sm:p-8 space-y-6 border border-line shadow-card">
            {/* Step 0: Formulation Info */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-civic-rise">
                <div className="border-b border-line pb-4">
                  <span className="text-[10px] font-mono font-bold text-brass-700 uppercase tracking-wider">
                    Milestone 1 of 5
                  </span>
                  <h3 className="text-xl font-serif font-bold text-forest-950 mt-1">
                    Formulation Identity & Therapeutic Target
                  </h3>
                  <p className="text-xs text-ink-soft mt-0.5">
                    Enter the commercial title and primary therapeutic purpose of your remedy.
                  </p>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div>
                    <label className="font-serif font-bold text-forest-950 block mb-1.5">
                      Formulation Name or Docket Title *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Standardized Neuroprotective Ashwagandha-Brahmi Complex"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-line focus:border-brass-500 focus:outline-none text-xs text-ink shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-serif font-bold text-forest-950 block mb-1.5">
                        Traditional Health System
                      </label>
                      <select
                        value={system}
                        onChange={(e) => setSystem(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-line focus:border-brass-500 focus:outline-none text-xs text-ink shadow-xs"
                      >
                        <option value="Ayurveda">Ayurveda</option>
                        <option value="Siddha">Siddha</option>
                        <option value="Unani">Unani</option>
                        <option value="Sowa-Rigpa">Sowa-Rigpa</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-serif font-bold text-forest-950 block mb-1.5">
                        Dosage Form / Delivery Matrix
                      </label>
                      <input
                        type="text"
                        value={dosageForm}
                        onChange={(e) => setDosageForm(e.target.value)}
                        placeholder="e.g. Coated Tablet, Oral Suspension, Churna"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-line focus:border-brass-500 focus:outline-none text-xs text-ink shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-serif font-bold text-forest-950 block mb-1.5">
                      Target Therapeutic Indication
                    </label>
                    <input
                      type="text"
                      value={indication}
                      onChange={(e) => setIndication(e.target.value)}
                      placeholder="e.g. Memory enhancement, cognitive fatigue, neuroprotection"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-line focus:border-brass-500 focus:outline-none text-xs text-ink shadow-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-line">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-serif font-bold text-xs bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Herbal Recipe</span>
                    <ArrowRight className="h-4 w-4 text-brass-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Herbal Recipe */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-civic-rise">
                <div className="border-b border-line pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brass-700 uppercase tracking-wider">
                      Milestone 2 of 5
                    </span>
                    <h3 className="text-xl font-serif font-bold text-forest-950 mt-1">
                      Botanical Ingredients & Proportions
                    </h3>
                    <p className="text-xs text-ink-soft mt-0.5">
                      Specify the herbs, parts used, quantities, and whether they are farm-cultivated.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddHerb}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif font-bold bg-surface-raised border border-line hover:border-forest-700/50 text-forest-900 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="h-3.5 w-3.5 text-brass-600" />
                    <span>Add Botanical</span>
                  </button>
                </div>

                {/* Quick Add Chips */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-ink-muted uppercase tracking-wider block">
                    Quick-Add Verified Ayush Botanicals:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_HERB_CHIPS.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickAddChip(chip)}
                        className="px-2.5 py-1 rounded-lg text-xs bg-surface hover:bg-surface-raised border border-line text-ink flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="h-3 w-3 text-brass-600" />
                        <span className="font-serif font-bold">{chip.common}</span>
                        <span className="text-[10px] font-mono text-ink-muted italic hidden sm:inline">
                          ({chip.botanical})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ingredient Rows */}
                <div className="space-y-4">
                  {ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-surface border border-line space-y-3 relative shadow-xs"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-line">
                        <span className="text-xs font-serif font-bold text-forest-900 flex items-center gap-2">
                          <Leaf className="h-3.5 w-3.5 text-moss-600" />
                          Botanical Ingredient #{idx + 1}
                        </span>
                        {ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveIngredient(idx)}
                            className="text-ink-muted hover:text-danger p-1 rounded-lg transition-colors cursor-pointer"
                            title="Remove herb"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                        <div>
                          <label className="text-[11px] font-semibold text-ink-muted block mb-1">
                            Common Name
                          </label>
                          <input
                            type="text"
                            value={ing.common_name}
                            onChange={(e) => handleIngredientChange(idx, "common_name", e.target.value)}
                            placeholder="e.g. Ashwagandha"
                            className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-xs focus:border-brass-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-ink-muted block mb-1">
                            Botanical / Latin Name
                          </label>
                          <input
                            type="text"
                            value={ing.botanical_name}
                            onChange={(e) => handleIngredientChange(idx, "botanical_name", e.target.value)}
                            placeholder="e.g. Withania somnifera"
                            className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-xs focus:border-brass-500 focus:outline-none font-serif italic"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-ink-muted block mb-1">
                            Part Used & Standardization
                          </label>
                          <input
                            type="text"
                            value={ing.part_used}
                            onChange={(e) => handleIngredientChange(idx, "part_used", e.target.value)}
                            placeholder="e.g. Root Extract (5% Withanolides)"
                            className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-xs focus:border-brass-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-ink-muted block mb-1">
                            Dose / Percentage
                          </label>
                          <input
                            type="text"
                            value={ing.percentage_or_quantity}
                            onChange={(e) => handleIngredientChange(idx, "percentage_or_quantity", e.target.value)}
                            placeholder="e.g. 300 mg or 40%"
                            className="w-full px-3 py-2 rounded-xl bg-surface-raised border border-line text-xs focus:border-brass-500 focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-line">
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif text-xs border border-line hover:bg-surface text-ink cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-serif font-bold text-xs bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Innovation Check</span>
                    <ArrowRight className="h-4 w-4 text-brass-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Innovation Check */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-civic-rise">
                <div className="border-b border-line pb-4">
                  <span className="text-[10px] font-mono font-bold text-brass-700 uppercase tracking-wider">
                    Milestone 3 of 5
                  </span>
                  <h3 className="text-xl font-serif font-bold text-forest-950 mt-1">
                    Technical Novelty vs Ancient Heritage
                  </h3>
                  <p className="text-xs text-ink-soft mt-0.5">
                    How does your preparation differ from classical recipes in the 54 First Schedule texts?
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div
                    onClick={() => setInnovationType("STANDARDIZED_RATIO")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      innovationType === "STANDARDIZED_RATIO"
                        ? "bg-surface-raised border-forest-800 shadow-card ring-2 ring-forest-700/20"
                        : "bg-surface border-line hover:bg-surface-raised"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-forest-950">
                        1. Specific Standardized Extract Ratio (Proprietary)
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-500/30 font-bold">
                        Defensible
                      </span>
                    </div>
                    <p className="text-xs text-ink-soft mt-1 leading-relaxed font-sans">
                      We use standardized extracts (e.g. 5% Withanolides) combined at a specific mathematical ratio backed by laboratory synergy assays.
                    </p>
                  </div>

                  <div
                    onClick={() => setInnovationType("NOVEL_DELIVERY")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      innovationType === "NOVEL_DELIVERY"
                        ? "bg-surface-raised border-forest-800 shadow-card ring-2 ring-forest-700/20"
                        : "bg-surface border-line hover:bg-surface-raised"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-forest-950">
                        2. Novel Carrier or Delivery Format (Proprietary)
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-500/30 font-bold">
                        Defensible
                      </span>
                    </div>
                    <p className="text-xs text-ink-soft mt-1 leading-relaxed font-sans">
                      Liposomal, nanoparticle, enteric-coated, or sustained-release delivery formats that significantly enhance botanical bioavailability.
                    </p>
                  </div>

                  <div
                    onClick={() => setInnovationType("CLASSICAL_UNMODIFIED")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      innovationType === "CLASSICAL_UNMODIFIED"
                        ? "bg-rose-50/60 border-rose-300 shadow-card ring-2 ring-rose-600/20"
                        : "bg-surface border-line hover:bg-surface-raised"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-rose-950">
                        3. Classical Recipe (Unmodified from Samhitas)
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-400 font-bold">
                        Statutorily Barred
                      </span>
                    </div>
                    <p className="text-xs text-rose-900/80 mt-1 leading-relaxed font-sans">
                      Formulated strictly according to Charaka, Sushruta, or Sharangadhara Samhita. Ineligible for product patenting under Section 3(p).
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-line">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif text-xs border border-line hover:bg-surface text-ink cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-serif font-bold text-xs bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Sourcing Origin</span>
                    <ArrowRight className="h-4 w-4 text-brass-400" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Sourcing Origin */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-civic-rise">
                <div className="border-b border-line pb-4">
                  <span className="text-[10px] font-mono font-bold text-brass-700 uppercase tracking-wider">
                    Milestone 4 of 5
                  </span>
                  <h3 className="text-xl font-serif font-bold text-forest-950 mt-1">
                    Biological Sourcing & BDA Compliance
                  </h3>
                  <p className="text-xs text-ink-soft mt-0.5">
                    Where are your botanical raw drugs procured from?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setSourcingOrigin("CULTIVATED")}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      sourcingOrigin === "CULTIVATED"
                        ? "bg-surface-raised border-forest-800 shadow-card ring-2 ring-forest-700/20"
                        : "bg-surface border-line hover:bg-surface-raised"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sprout className="h-4 w-4 text-emerald-700" />
                        <span className="font-serif font-bold text-sm text-forest-950">
                          Certified Farm Cultivation
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-950 border border-emerald-500/30">
                        0% Royalty Fee
                      </span>
                    </div>
                    <p className="text-xs text-ink-soft leading-relaxed font-sans">
                      Herbs are grown on agricultural land by farmers with verified cultivation certificates. Completely exempt from BDA Access & Benefit Sharing under Section 7.
                    </p>
                  </div>

                  <div
                    onClick={() => setSourcingOrigin("WILD_HARVEST")}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      sourcingOrigin === "WILD_HARVEST"
                        ? "bg-surface-raised border-brass-600 shadow-card ring-2 ring-brass-500/20"
                        : "bg-surface border-line hover:bg-surface-raised"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-brass-700" />
                        <span className="font-serif font-bold text-sm text-forest-950">
                          Wild Forest Harvesting
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-brass-50 text-brass-900 border border-brass-500/30">
                        SBB Intimation
                      </span>
                    </div>
                    <p className="text-xs text-ink-soft leading-relaxed font-sans">
                      Herbs are wild-harvested from forests or tribal lands. Requires prior intimation to State Biodiversity Board and 0.2% ABS turnover fee.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-line">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif text-xs border border-line hover:bg-surface text-ink cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={handleRunEvaluation}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-serif font-bold text-xs bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 shadow-card cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin h-3.5 w-3.5 border-2 border-surface-raised border-t-transparent rounded-full" />
                        <span>Evaluating Jurisprudence...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-brass-400" />
                        <span>Compute Full Statutory Verdict</span>
                        <ArrowRight className="h-4 w-4 text-brass-400" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Final Verdict & Roadmap */}
            {currentStep === 4 && result && (
              <div className="space-y-6 animate-civic-rise">
                <div className="border-b border-line pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-brass-700 uppercase tracking-wider">
                      Milestone 5 of 5 • Final Verdict
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-forest-950 mt-1">
                      Statutory Jurisprudence Report
                    </h3>
                    <p className="text-xs text-ink-soft mt-0.5">
                      Ground truth evaluation against The Patents Act 1970 and BDA 2024.
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentStep(0)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-serif text-ink-soft hover:text-ink border border-line hover:bg-surface transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-brass-600" />
                    <span>Re-evaluate</span>
                  </button>
                </div>

                {/* Classical Overlap Meter Component */}
                <ClassicalOverlapMeter
                  overlapScore={result.first_schedule_match?.similarity_score || 0.6}
                  textbookName={result.first_schedule_match?.textbook_name || "Classical Scripture Index"}
                  classicalCitation={result.first_schedule_match?.chapter_verse || "Adhyaya 1"}
                  isVerbatim={result.first_schedule_match?.is_verbatim_match}
                  isNovelRatio={innovationType !== "CLASSICAL_UNMODIFIED"}
                  overlappingHerbs={result.first_schedule_match?.overlapping_ingredients || []}
                />

                {/* Section 3(e) Synergism Recommendation Card */}
                <div className="p-5 rounded-2xl bg-surface border border-line space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-forest-950 flex items-center gap-2">
                      <FlaskConical className="h-4 w-4 text-brass-600" />
                      Section 3(e) Mere Admixture Strategy
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-forest-50 text-forest-900 border border-forest-600/30">
                      {result.section_3e?.risk_level}
                    </span>
                  </div>
                  <p className="text-xs text-ink-soft leading-relaxed font-sans">
                    {result.section_3e?.summary}
                  </p>
                  <p className="text-xs font-serif italic text-forest-900 bg-surface-raised p-2.5 rounded-xl border border-line">
                    Plain Guidance: {result.section_3e?.plain_advice}
                  </p>
                </div>

                {/* BDA 2024 ABS Card */}
                <div className="p-5 rounded-2xl bg-surface border border-line space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-forest-950 flex items-center gap-2">
                      <Scale className="h-4 w-4 text-emerald-700" />
                      Biological Diversity Act 2024 Sourcing Status
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-600/30">
                      {result.bda_2024?.estimated_abs_rate}
                    </span>
                  </div>
                  <p className="text-xs text-ink-soft leading-relaxed font-sans">
                    {result.bda_2024?.plain_summary}
                  </p>
                </div>

                {/* Primary Recommendation Banner */}
                <div className="p-5 rounded-2xl bg-forest-900 text-surface-raised border border-forest-700 shadow-card space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brass-400 block">
                    Institutional Recommendation
                  </span>
                  <p className="text-sm font-serif font-bold leading-snug">
                    {result.primary_recommendation}
                  </p>
                </div>

                {/* Actionable Next Steps */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/synergism"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-bold text-xs bg-brass-700 hover:bg-brass-600 text-surface-raised border border-brass-600 shadow-xs transition-colors"
                  >
                    <Zap className="h-3.5 w-3.5 text-saffron-300" />
                    <span>Prove 1+1=3 in Herbal Booster</span>
                  </Link>

                  <Link
                    href="/bda-abs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-bold text-xs bg-surface border border-line hover:bg-surface-raised text-forest-900 transition-colors"
                  >
                    <Scale className="h-3.5 w-3.5 text-emerald-700" />
                    <span>Map Sourcing & ABS Royalties</span>
                  </Link>

                  <Link
                    href="/dossier"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-bold text-xs bg-surface border border-line hover:bg-surface-raised text-forest-900 transition-colors"
                  >
                    <FileCheck className="h-3.5 w-3.5 text-forest-700" />
                    <span>Generate Ready-to-File Dossier</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Legal "Docket" Summary Panel */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="console-dark p-6 rounded-2xl space-y-5 border border-brass-500/40">
            <div className="flex items-center justify-between pb-3 border-b border-forest-800">
              <div className="flex items-center gap-2">
                <Scroll className="h-4 w-4 text-brass-400" />
                <span className="font-serif font-bold text-sm text-white">
                  Legal Docket Summary
                </span>
              </div>
              <span className="text-[11px] font-mono text-brass-300 font-bold">
                DKT-2026-AYUSH
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-sans">
              <div>
                <span className="text-[11px] font-mono uppercase text-brass-300 font-bold block">
                  Formulation Title
                </span>
                <span className="font-serif font-bold text-white text-sm block mt-0.5">
                  {title || "Untitled Formulation"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-forest-800/80">
                <div>
                  <span className="text-[11px] font-mono uppercase text-brass-300 font-bold block">
                    Health System
                  </span>
                  <span className="font-mono text-emerald-300 font-bold">{system}</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-brass-300 font-bold block">
                    Delivery Form
                  </span>
                  <span className="font-mono text-white font-semibold">{dosageForm || "Unspecified"}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-forest-800/80">
                <span className="text-[11px] font-mono uppercase text-brass-300 font-bold block mb-1.5">
                  Active Botanicals ({ingredients.length})
                </span>
                <div className="flex flex-wrap gap-1">
                  {ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-forest-950 text-brass-300 font-bold border border-forest-800"
                    >
                      {ing.common_name || `Herb ${i + 1}`}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-forest-800/80 space-y-1">
                <span className="text-[11px] font-mono uppercase text-brass-300 font-bold block">
                  Innovation Type
                </span>
                <span className="text-xs font-bold text-white font-serif block">
                  {innovationType === "CLASSICAL_UNMODIFIED"
                    ? "Classical Formulation (Rule 158B I)"
                    : "Proprietary Standardized Ratio (Rule 158B II)"}
                </span>
              </div>

              <div className="pt-2 border-t border-forest-800/80 space-y-1">
                <span className="text-[11px] font-mono uppercase text-brass-300 font-bold block">
                  Sourcing Origin
                </span>
                <span className="text-xs font-bold text-emerald-300 font-serif block">
                  {sourcingOrigin === "CULTIVATED"
                    ? "Certified Farm (0% ABS Royalty)"
                    : "Wild Forest Harvest (SBB Intimation)"}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-forest-950 border border-forest-800 text-[11px] font-mono text-white/90 flex items-center justify-between">
              <span>Intake Progress:</span>
              <span className="font-bold text-brass-400">Step {currentStep + 1} of 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
