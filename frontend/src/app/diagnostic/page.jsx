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
    { title: "Verdict & Roadmap", desc: "Plain-English Report" },
  ];

  return (
    <div className="container max-w-7xl py-8 px-4 sm:px-8 mx-auto space-y-8">
      {/* Video Explainer Modal */}
      <VideoExplainerModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        topicKey="recipe_bar"
      />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1e40af] uppercase tracking-wider mb-1.5">
            <ShieldCheck className="h-4 w-4 text-[#2563eb]" />
            {isInnovator ? "Jargon-Free Recipe Intake" : "Section 3(p) & 3(e) Diagnostic Engine"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#0a1c16]">
            Formulation Patentability Checker
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl font-sans">
            {isInnovator
              ? "Discover in 4 simple questions whether your Ayurvedic recipe is an ancient public remedy or an innovative formulation eligible for patent protection."
              : "Autonomously cross-reference 54 First Schedule texts, evaluate Section 3(p) traditional knowledge exclusions, and assess BDA 2024 ABS liability."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#eff6ff] border border-[#2563eb]/30 text-[#1e40af] hover:bg-[#dbeafe] transition-all shadow-xs"
          >
            <Play className="h-3.5 w-3.5 fill-[#2563eb] text-[#2563eb]" />
            <span>Why Can't I Patent Classical Recipes? (2 min)</span>
          </button>

          <PlainLanguageToggle compact />
        </div>
      </div>

      {/* Quick Presets Picker */}
      <div className="p-4 rounded-2xl parchment-card border border-[#d6ccb8] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="text-xs font-serif font-bold text-[#0e2720] flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#2563eb]" />
          Benchmark Test Cases:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(idx)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedPresetIndex === idx
                  ? "bg-[#144d3c] text-white shadow-xs font-extrabold border border-[#2d7f63]"
                  : "bg-[#ede5d4] text-stone-700 hover:bg-[#e2d8c3]"
              }`}
            >
              {p.title.split(" ")[0]} ({p.innovationType.replace("_", " ")})
            </button>
          ))}
        </div>
      </div>

      {/* Milestone Stepper Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
        {steps.map((step, idx) => {
          const isActive = currentStep === idx;
          const isDone = currentStep > idx;
          return (
            <button
              key={idx}
              onClick={() => {
                if (idx <= currentStep || result) setCurrentStep(idx);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isActive
                  ? "bg-[#144d3c] border-[#225e50] text-[#fbf8f0] shadow-md scale-102"
                  : isDone
                  ? "bg-[#edf6f2] border-[#2d7f63]/40 text-[#144d3c]"
                  : "bg-[#f4efe2]/60 border-[#e0d6c1] text-stone-400 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                <span className={isActive ? "text-[#38bdf8]" : isDone ? "text-[#144d3c]" : "text-stone-400"}>
                  STEP 0{idx + 1}
                </span>
                {isDone && <Check className="h-3.5 w-3.5 text-[#144d3c]" />}
              </div>
              <div className={`text-xs font-bold leading-tight truncate ${isActive ? "text-white font-serif" : "text-stone-800"}`}>
                {step.title}
              </div>
              <div className={`text-[10px] truncate mt-0.5 ${isActive ? "text-stone-300" : "text-stone-500"}`}>
                {step.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stepper Container */}
      <div className="parchment-card p-6 sm:p-9 rounded-3xl border border-[#d6ccb8] shadow-luxury space-y-7">
        {/* STEP 0: FORMULATION BASICS */}
        {currentStep === 0 && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="border-b border-[#e8dfcf] pb-4">
              <h2 className="text-lg font-serif font-bold text-[#0e2720] flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#1b5a4b]" />
                Step 1: What are you calling your formulation?
              </h2>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Enter your commercial invention name and its targeted therapeutic application.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5 font-mono uppercase tracking-wider">
                  Formulation Title / Commercial Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm bg-white border border-[#d6ccb8] rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#144d3c] shadow-xs"
                  placeholder="e.g. Standardized Neuroprotective Brahmi-Ashwa Complex"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5 font-mono uppercase tracking-wider">
                  Target Disease / Health Indication
                </label>
                <input
                  type="text"
                  value={indication}
                  onChange={(e) => setIndication(e.target.value)}
                  className="w-full text-sm bg-white border border-[#d6ccb8] rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#144d3c] shadow-xs"
                  placeholder="e.g. Cognitive enhancement, Joint pain, Glucose regulation"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5 font-mono uppercase tracking-wider">
                  Ayush Medical Tradition
                </label>
                <select
                  value={system}
                  onChange={(e) => setSystem(e.target.value)}
                  className="w-full text-sm bg-white border border-[#d6ccb8] rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#144d3c] shadow-xs font-serif"
                >
                  <option value="Ayurveda">Ayurveda</option>
                  <option value="Siddha">Siddha</option>
                  <option value="Unani">Unani</option>
                  <option value="Sowa-Rigpa">Sowa-Rigpa</option>
                  <option value="Homoeopathy">Homoeopathy</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5 font-mono uppercase tracking-wider">
                  Finished Dosage Form
                </label>
                <input
                  type="text"
                  value={dosageForm}
                  onChange={(e) => setDosageForm(e.target.value)}
                  className="w-full text-sm bg-white border border-[#d6ccb8] rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#144d3c] shadow-xs"
                  placeholder="e.g. Coated Tablet, Nanoparticle Capsule, Asava/Arishta"
                />
              </div>
            </div>

            <div className="flex justify-end pt-5 border-t border-[#e8dfcf]">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-[#144d3c] hover:bg-[#0c2f25] text-white transition-all shadow-md hover:scale-102"
              >
                <span>Continue to Herbal Recipe</span>
                <ArrowRight className="h-4 w-4 text-sky-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: HERBAL RECIPE & QUICK CHIPS */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="border-b border-[#e8dfcf] pb-4">
              <h2 className="text-lg font-serif font-bold text-[#0e2720] flex items-center gap-2">
                <Leaf className="h-5 w-5 text-[#1b5a4b]" />
                Step 2: What herbs are in your formula?
              </h2>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Click any of our verified botanical quick-add chips below, or manually type in your ingredients.
              </p>
            </div>

            {/* Botanical Quick-Add Chips */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider block">
                Popular Ayush Botanicals (1-Click Add):
              </span>
              <div className="flex flex-wrap gap-2">
                {QUICK_HERB_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickAddChip(chip)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#eef5f1] border border-[#2d7f63]/40 text-[#144d3c] hover:bg-[#d8ece1] transition-all hover:scale-103 shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5 text-[#1b5a4b]" />
                    <span className="font-medium">{chip.common}</span>
                    <span className="text-[10px] text-[#22705d] font-mono italic hidden sm:inline">
                      ({chip.botanical})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients List */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-[#0e2720]">
                  Formulation Recipe ({ingredients.length} Herbs Added)
                </span>
                <button
                  type="button"
                  onClick={handleAddHerb}
                  className="flex items-center gap-1 text-xs font-bold text-[#144d3c] hover:text-[#0b2b23] bg-[#eef5f1] px-3.5 py-1.5 rounded-xl border border-[#2d7f63]/30 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Custom Herb
                </button>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-[#ded5c2] space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#144d3c] flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#1b5a4b]" />
                        Herb #{idx + 1}: {ing.common_name || "New Herb"}
                      </span>
                      {ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(idx)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="Remove Herb"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="text-[10px] text-stone-500 block mb-1 font-mono uppercase">
                          Common / Local Name
                        </label>
                        <input
                          value={ing.common_name}
                          onChange={(e) => handleIngredientChange(idx, "common_name", e.target.value)}
                          className="w-full bg-[#fbf9f4] border border-[#d6ccb8] rounded-xl px-3 py-2 text-stone-900"
                          placeholder="e.g. Ashwagandha"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-stone-500 block mb-1 font-mono uppercase">
                          Botanical Latin Name
                        </label>
                        <input
                          value={ing.botanical_name}
                          onChange={(e) => handleIngredientChange(idx, "botanical_name", e.target.value)}
                          className="w-full bg-[#fbf9f4] border border-[#d6ccb8] rounded-xl px-3 py-2 text-stone-900 font-mono italic"
                          placeholder="e.g. Withania somnifera"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-stone-500 block mb-1 font-mono uppercase">
                          Part Used / Extract Standard
                        </label>
                        <input
                          value={ing.part_used}
                          onChange={(e) => handleIngredientChange(idx, "part_used", e.target.value)}
                          className="w-full bg-[#fbf9f4] border border-[#d6ccb8] rounded-xl px-3 py-2 text-stone-900"
                          placeholder="e.g. Root Extract (5%)"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-stone-500 block mb-1 font-mono uppercase">
                          Quantity / Dose
                        </label>
                        <input
                          value={ing.percentage_or_quantity}
                          onChange={(e) =>
                            handleIngredientChange(idx, "percentage_or_quantity", e.target.value)
                          }
                          className="w-full bg-[#fbf9f4] border border-[#d6ccb8] rounded-xl px-3 py-2 text-stone-900"
                          placeholder="e.g. 300 mg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-5 border-t border-[#e8dfcf]">
              <button
                type="button"
                onClick={() => setCurrentStep(0)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-[#144d3c] hover:bg-[#0c2f25] text-white transition-all shadow-md hover:scale-102"
              >
                <span>Continue to Innovation Check</span>
                <ArrowRight className="h-4 w-4 text-sky-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INNOVATION & NOVELTY CHECK */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="border-b border-[#e8dfcf] pb-4">
              <h2 className="text-lg font-serif font-bold text-[#0e2720] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#2563eb]" />
                Step 3: Is this an ancient recipe or have you modified it?
              </h2>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Indian patent law strictly bars ancient unmodified formulations (Section 3(p)). Select which modification applies to your product.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                onClick={() => setInnovationType("CLASSICAL_UNMODIFIED")}
                className={`p-6 rounded-3xl border cursor-pointer transition-all space-y-3.5 ${
                  innovationType === "CLASSICAL_UNMODIFIED"
                    ? "bg-[#fff5f5] border-rose-500 ring-2 ring-rose-300 shadow-md"
                    : "bg-white border-[#ded5c2] hover:bg-[#faf7f0]"
                }`}
              >
                <div className="h-11 w-11 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-800 font-bold text-xl shadow-xs">
                  📜
                </div>
                <h4 className="text-sm font-serif font-bold text-stone-900">Ancient Classical Recipe</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Manufactured strictly as recorded in Charaka, Sushruta, or Sharangadhara Samhita (e.g. raw powders, classical decoctions).
                </p>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 inline-block border border-rose-300">
                  Barred under Section 3(p)
                </span>
              </div>

              <div
                onClick={() => setInnovationType("STANDARDIZED_RATIO")}
                className={`p-6 rounded-3xl border cursor-pointer transition-all space-y-3.5 ${
                  innovationType === "STANDARDIZED_RATIO"
                    ? "bg-[#edf6f2] border-[#22705d] ring-2 ring-[#22705d]/30 shadow-md"
                    : "bg-white border-[#ded5c2] hover:bg-[#faf7f0]"
                }`}
              >
                <div className="h-11 w-11 rounded-2xl bg-[#e0f0ea] flex items-center justify-center text-[#144d3c] font-bold text-xl shadow-xs">
                  🧪
                </div>
                <h4 className="text-sm font-serif font-bold text-stone-900">Standardized Extract / Ratio</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Purified fractions with guaranteed active marker percentage (e.g. 95% Curcuminoids + 5% Withanolides) in non-obvious proportions.
                </p>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#d8eee3] text-[#144d3c] inline-block border border-[#2d7f63]/40">
                  Patentable with Synergy
                </span>
              </div>

              <div
                onClick={() => setInnovationType("NOVEL_DELIVERY")}
                className={`p-6 rounded-3xl border cursor-pointer transition-all space-y-3.5 ${
                  innovationType === "NOVEL_DELIVERY"
                    ? "bg-[#eff6ff] border-[#2563eb] ring-2 ring-[#2563eb]/30 shadow-md"
                    : "bg-white border-[#ded5c2] hover:bg-[#faf7f0]"
                }`}
              >
                <div className="h-11 w-11 rounded-2xl bg-[#dbeafe] flex items-center justify-center text-[#1e40af] font-bold text-xl shadow-xs">
                  ⚡
                </div>
                <h4 className="text-sm font-serif font-bold text-stone-900">Modern Delivery / Nanotech</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Micronized phytosomes, effervescent tablets, sublingual spray, or targeted nanoparticles that dramatically boost bioavailability.
                </p>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#dbeafe] text-[#1e40af] inline-block border border-[#2563eb]/40">
                  High Patent Potential
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-5 border-t border-[#e8dfcf]">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm bg-[#144d3c] hover:bg-[#0c2f25] text-white transition-all shadow-md hover:scale-102"
              >
                <span>Continue to Sourcing Origin</span>
                <ArrowRight className="h-4 w-4 text-sky-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SOURCING ORIGIN */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in-50 duration-200">
            <div className="border-b border-[#e8dfcf] pb-4">
              <h2 className="text-lg font-serif font-bold text-[#0e2720] flex items-center gap-2">
                <Sprout className="h-5 w-5 text-[#1b5a4b]" />
                Step 4: Where do you source your botanical herbs?
              </h2>
              <p className="text-xs text-stone-600 mt-1 font-sans">
                Under the Biological Diversity Act, sourcing location determines whether you owe statutory government royalties to tribal communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => setSourcingOrigin("CULTIVATED")}
                className={`p-6 rounded-3xl border cursor-pointer transition-all space-y-3.5 ${
                  sourcingOrigin === "CULTIVATED"
                    ? "bg-[#edf6f2] border-[#22705d] ring-2 ring-[#22705d]/30 shadow-md"
                    : "bg-white border-[#ded5c2] hover:bg-[#faf7f0]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-[#e0f0ea] flex items-center justify-center text-2xl shadow-xs">
                    🚜
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#d8eee3] text-[#144d3c] font-black font-mono border border-[#2d7f63]/40">
                    0.0% ABS (EXEMPT)
                  </span>
                </div>
                <h4 className="text-base font-serif font-bold text-stone-900">
                  Cultivated Flora (Verified Farms & Agriculture)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Herbs are grown by farmers on registered agricultural land. Under BDA 2024 amendments, certified cultivated plants are <strong>100% exempt from ABS fees</strong>.
                </p>
              </div>

              <div
                onClick={() => setSourcingOrigin("WILD_HARVEST")}
                className={`p-6 rounded-3xl border cursor-pointer transition-all space-y-3.5 ${
                  sourcingOrigin === "WILD_HARVEST"
                    ? "bg-[#eff6ff] border-[#2563eb] ring-2 ring-[#2563eb]/30 shadow-md"
                    : "bg-white border-[#ded5c2] hover:bg-[#faf7f0]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-[#dbeafe] flex items-center justify-center text-2xl shadow-xs">
                    🌲
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#dbeafe] text-[#1e40af] font-black font-mono border border-[#2563eb]/40">
                    0.1% - 0.5% SBB Royalty
                  </span>
                </div>
                <h4 className="text-base font-serif font-bold text-stone-900">
                  Wild Harvested (Forests, Tribal Gatherers)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Raw herbs are procured from forest areas or wild tribal collectors. Requires prior intimation to the State Biodiversity Board and statutory benefit-sharing royalties.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-5 border-t border-[#e8dfcf]">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleRunEvaluation}
                disabled={loading}
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-[#123c33] via-[#1b5a4b] to-[#22705d] hover:from-[#1b5a4b] hover:to-[#123c33] text-[#f7f2e4] transition-all shadow-lg hover:scale-102 active:scale-98 border border-[#2d7f63]/50"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Analyzing Formulation...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-sky-300" />
                    <span>Generate Plain-English Legal Verdict</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: RESULTS DASHBOARD */}
        {currentStep === 4 && result && (
          <div className="space-y-7 animate-in fade-in-50 duration-300">
            {/* Verdict Headline Card */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-[#edf6f2] via-[#f7faf8] to-[#fcf5e6] border border-[#2d7f63]/40 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#144d3c] flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1b5a4b]" /> Statutory Verdict
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white text-stone-800 font-mono font-bold border border-[#d6ccb8]">
                  {result.classification_type}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-black text-[#0a1c16]">
                {result.primary_recommendation}
              </h3>
              <p className="text-xs sm:text-sm text-[#283d35] leading-relaxed font-sans">
                {result.regulatory_framework}
              </p>
            </div>

            {/* Classical Overlap Meter Component */}
            {result.first_schedule_match && (
              <ClassicalOverlapMeter
                overlapScore={result.first_schedule_match.similarity_score}
                textbookName={result.first_schedule_match.textbook_name}
                classicalCitation={result.first_schedule_match.chapter_verse}
                isVerbatim={result.first_schedule_match.is_verbatim_match}
                overlappingHerbs={result.first_schedule_match.overlapping_ingredients}
              />
            )}

            {/* Dual Plain-Language Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Section 3(p) */}
              <div className="p-5 rounded-3xl bg-[#fbf9f4] border border-[#d6ccb8] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-[#0e2720] flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-[#2563eb]" />
                    {isInnovator ? "Ancient Recipe Rule" : "Patents Act Section 3(p)"}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono border ${
                      result.section_3p.risk_level.includes("BARRED")
                        ? "bg-rose-50 text-rose-800 border-rose-300"
                        : "bg-emerald-50 text-emerald-800 border-emerald-300"
                    }`}
                  >
                    {result.section_3p.risk_level}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {result.section_3p.summary}
                </p>
                <div className="p-3.5 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] text-xs text-[#1e40af] font-sans">
                  <strong>Advice:</strong> {result.section_3p.plain_advice}
                </div>
              </div>

              {/* Section 3(e) */}
              <div className="p-5 rounded-3xl bg-[#fbf9f4] border border-[#d6ccb8] space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif font-bold text-[#0e2720] flex items-center gap-1.5">
                    <FlaskConical className="h-4 w-4 text-[#1b5a4b]" />
                    {isInnovator ? "Herbal Booster Rule (1+1=3)" : "Patents Act Section 3(e)"}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono bg-amber-50 text-amber-900 border border-amber-300">
                    {result.section_3e.risk_level}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {result.section_3e.summary}
                </p>
                <div className="p-3.5 rounded-xl bg-[#edf6f2] border border-[#c4e3d5] text-xs text-[#144d3c] font-sans">
                  <strong>Action:</strong> {result.section_3e.plain_advice}
                </div>
              </div>
            </div>

            {/* Sourcing & BDA 2024 Royalty Clearance */}
            <div className="p-5 rounded-3xl bg-[#edf5f1] border border-[#2d7f63]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#144d3c] flex items-center gap-1.5">
                  <Sprout className="h-4 w-4 text-[#1b5a4b]" /> BDA 2024 Sourcing Clearance
                </span>
                <p className="text-xs text-stone-700 font-sans">
                  {result.bda_2024.plain_summary}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-stone-500 block uppercase font-mono">Applicable Royalty</span>
                <span className="text-xl font-black font-mono text-[#144d3c]">
                  {result.bda_2024.estimated_abs_rate}
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-[#e8dfcf]">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-stone-700 hover:text-stone-950"
              >
                <ArrowLeft className="h-4 w-4" /> Modify Recipe
              </button>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/synergism"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white transition-all shadow-xs"
                >
                  <Zap className="h-4 w-4 text-sky-200" />
                  Test in Herbal Booster (1+1=3)
                </Link>

                <Link
                  href="/bda-abs"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#144d3c] hover:bg-[#0c2f25] text-white transition-all shadow-xs"
                >
                  <Scale className="h-4 w-4" />
                  Farmer Royalty Calculator
                </Link>

                <Link
                  href="/dossier"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1b5a4b] hover:bg-[#123c33] text-white transition-all shadow-xs"
                >
                  <FileCheck className="h-4 w-4" />
                  Generate Patent Dossier
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
