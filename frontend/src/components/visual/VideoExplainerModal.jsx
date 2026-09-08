"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";

export const VIDEO_TOPICS = {
  recipe_bar: {
    id: "recipe_bar",
    title: "Why Ancient Ayurvedic Recipes Can't Be Patented (Section 3p)",
    duration: "2 min 15 sec",
    category: "Section 3(p) Demystified",
    summary:
      "Understand why ancient formulas like Triphala or Chyawanprash cannot be owned by any one person, and discover what modifications (extracts, nanotech, novel ratios) unlock patent protection.",
    takeaways: [
      "Centuries-old recipes belong to the public domain in India's Traditional Knowledge Digital Library (TKDL).",
      "Simply mixing ancient herbs in traditional proportions triggers an automatic Section 3(p) patent refusal.",
      "To qualify for a patent, you must prove non-obvious technical intervention (e.g. standardized 10:1 extract, targeted nanoparticle carrier, or novel synergistic bio-enhancement).",
    ],
    transcript: [
      { time: "0:00", text: "Welcome to IP-SAKTI Sahayak. Many Ayurvedic doctors ask: 'I made a wonderful Triphala mix, why did the patent examiner reject my application?'" },
      { time: "0:30", text: "Under Section 3(p) of the Indian Patents Act, traditional knowledge known for generations cannot be monopolized by any private individual." },
      { time: "1:05", text: "The government has indexed 54 classical texts into the TKDL database. If your ingredients match these scriptures verbatim, your recipe is barred." },
      { time: "1:40", text: "However, if you extract isolated active withanolides at a specific novel ratio, or develop a micro-encapsulation delivery system, you have created a patentable invention!" },
    ],
  },
  synergy_booster: {
    id: "synergy_booster",
    title: "The 1 + 1 = 3 Rule: Proving Herbal Synergy (Section 3e)",
    duration: "2 min 40 sec",
    category: "Section 3(e) Rebuttal",
    summary:
      "Learn how to mathematically prove that combining two herbs produces an unexpected supercharged effect, clearing the notorious 'mere admixture' patent hurdle.",
    takeaways: [
      "Section 3(e) prohibits patenting a 'mere mix' where herbs only do what they normally do separately.",
      "The legal standard requires proving synergy: the combined effect must mathematically exceed the sum of individual herbs.",
      "Using the Chou-Talalay Combination Index (CI < 0.9) provides ironclad laboratory proof accepted by Indian patent controllers.",
    ],
    transcript: [
      { time: "0:00", text: "When you brew Ginger and Tulsi tea, you get the benefits of Ginger plus Tulsi. In patent law, that is called a 'mere admixture' (1 + 1 = 2)." },
      { time: "0:45", text: "Patent examiners will cite Section 3(e) and reject the application because mixing two known herbs is considered obvious." },
      { time: "1:20", text: "To win your patent, you must demonstrate biological synergy (1 + 1 = 5). For example, Piperine boosting Curcumin absorption by 2000%." },
      { time: "2:05", text: "By plotting your lab assay in our Synergy Evaluator, you get a Combination Index score and ready-to-file patent claims that defeat Section 3(e)." },
    ],
  },
  forest_rules: {
    id: "forest_rules",
    title: "Forest vs Farm: Herbal Sourcing & Biodiversity Royalties",
    duration: "2 min 20 sec",
    category: "BDA 2024 Compliance",
    summary:
      "A quick guide to navigating the Biological Diversity Act: how wild forest harvesting triggers farmer royalties, and how certified farm cultivation grants full exemptions.",
    takeaways: [
      "Gathering wild medicinal plants from forests triggers mandatory Benefit Sharing (0.1% to 0.5% royalty) to local tribal panchayats (BMCs).",
      "Under the 2024 Biological Diversity Amendment Act, certified cultivated plants from farmers are 100% exempt from ABS fees!",
      "Registered traditional Ayush Vaidyas enjoy statutory exemptions for dispensing herbal remedies.",
    ],
    transcript: [
      { time: "0:00", text: "Did you know that where you harvest your herbs determines whether you owe statutory government royalties?" },
      { time: "0:40", text: "If raw drugs are harvested from wild forests, Indian biodiversity laws require prior intimation to the State Biodiversity Board." },
      { time: "1:15", text: "A portion of commercial revenues goes back to local forest-dwelling communities who conserve these habitats." },
      { time: "1:50", text: "Good news under BDA 2024: If you source from verified cultivated farms and obtain a cultivation certificate, your royalty is 0.0%!" },
    ],
  },
};

export function VideoExplainerModal({ topicKey = "recipe_bar", isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState("takeaways");

  const topic = VIDEO_TOPICS[topicKey] || VIDEO_TOPICS.recipe_bar;

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1c16]/70 backdrop-blur-md animate-in fade-in-50 duration-200">
      <div className="relative w-full max-w-3xl bg-[#fbf9f4] border border-[#2563eb]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Top Bar with Prestige Heraldry */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#e5decb] bg-[#0c1f38] text-white">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">
              {topic.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
              <Clock className="h-3 w-3 text-[#38bdf8]" /> {topic.duration}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player & Visual Animation Frame */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-[#0c1f38] via-[#102d4f] to-[#071728] flex flex-col items-center justify-center overflow-hidden border-b border-[#2563eb]/30 group">
          <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4 max-w-lg">
            {topicKey === "recipe_bar" && (
              <div className="flex items-center justify-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[#2563eb]/15 border border-[#2563eb]/40 text-blue-200 text-center shadow-md">
                  <BookOpen className="h-7 w-7 mx-auto mb-1 text-[#60a5fa]" />
                  <span className="text-[11px] font-bold block text-white">Classical Recipe</span>
                  <span className="text-[9px] text-blue-300 font-mono">Public Heritage (3p)</span>
                </div>
                <div className="text-[#38bdf8] font-black text-xl animate-pulse">➔</div>
                <div className="p-3.5 rounded-2xl bg-emerald-600/20 border border-emerald-400/40 text-emerald-200 text-center shadow-md">
                  <Sparkles className="h-7 w-7 mx-auto mb-1 text-emerald-400" />
                  <span className="text-[11px] font-bold block text-white">Novel Formulation</span>
                  <span className="text-[9px] text-emerald-300 font-mono">Patent Eligible</span>
                </div>
              </div>
            )}

            {topicKey === "synergy_booster" && (
              <div className="flex items-center justify-center gap-3">
                <div className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-xs font-mono text-stone-200">
                  Herb A: 25%
                </div>
                <span className="text-[#38bdf8] font-bold text-base">+</span>
                <div className="px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-xs font-mono text-stone-200">
                  Herb B: 25%
                </div>
                <span className="text-emerald-400 font-extrabold text-base">=</span>
                <div className="px-4 py-2 rounded-xl bg-emerald-500/30 border border-emerald-400 text-xs font-mono text-emerald-300 font-black animate-pulse shadow-md">
                  89% Supercharge (CI &lt; 0.9)
                </div>
              </div>
            )}

            {topicKey === "forest_rules" && (
              <div className="flex items-center justify-center gap-4">
                <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-center shadow-md">
                  <span className="text-2xl">🌲</span>
                  <span className="text-[10px] font-bold block text-rose-200">Wild Forest</span>
                  <span className="text-[9px] text-rose-300 font-mono">0.2% SBB Fee</span>
                </div>
                <div className="text-[#38bdf8] font-bold text-xs font-mono">VS</div>
                <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center shadow-md">
                  <span className="text-2xl">🚜</span>
                  <span className="text-[10px] font-bold block text-emerald-200">Certified Farm</span>
                  <span className="text-[9px] text-emerald-300 font-mono font-bold">0.0% EXEMPT</span>
                </div>
              </div>
            )}

            <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
              {topic.title}
            </h3>

            {/* Play/Pause Button with Sovereign Blue Glow */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-12 w-12 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#3b82f6] hover:to-[#2563eb] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all border border-blue-300 cursor-pointer"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5 fill-white" />}
            </button>
          </div>

          {/* Bottom Scrub Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col space-y-2">
            <div
              className="w-full bg-white/20 h-1.5 rounded-full cursor-pointer relative overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.round(pos * 100));
              }}
            >
              <div
                className="bg-gradient-to-r from-[#38bdf8] to-emerald-400 h-full rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-300 pt-1">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white cursor-pointer">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                </button>
                <button onClick={() => setProgress(0)} className="hover:text-white cursor-pointer">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <span className="font-mono text-[11px] text-[#38bdf8]">
                  {Math.floor((progress / 100) * 140)}s / 140s
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white cursor-pointer">
                  {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#2563eb]/20 text-[#93c5fd] font-mono font-bold border border-[#2563eb]/40">
                  Ayush Jurisprudence Masterclass
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Notes Tabs with Parchment Card Styling */}
        <div className="p-6 overflow-y-auto space-y-4 bg-[#fbf9f4]">
          <div className="flex items-center gap-2 border-b border-[#e5decb] pb-2">
            <button
              onClick={() => setActiveTab("takeaways")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "takeaways"
                  ? "bg-[#144d3c] text-[#f7f2e4] shadow-xs font-black border border-[#225e50]"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Key Legal Takeaways
            </button>
            <button
              onClick={() => setActiveTab("transcript")}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "transcript"
                  ? "bg-[#144d3c] text-[#f7f2e4] shadow-xs font-black border border-[#225e50]"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Interactive Transcript
            </button>
          </div>

          {activeTab === "takeaways" && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600 leading-relaxed font-sans">{topic.summary}</p>
              <div className="space-y-2">
                {topic.takeaways.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f4ede0] border border-[#e0d6c1] text-xs text-[#1f382f]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#1b5a4b] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "transcript" && (
            <div className="space-y-2.5">
              {topic.transcript.map((line, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#e5decb] text-xs"
                >
                  <span className="font-mono text-[10px] text-[#1e40af] font-bold shrink-0 mt-0.5 bg-[#eff6ff] px-2 py-0.5 rounded border border-[#2563eb]/30">
                    {line.time}
                  </span>
                  <p className="text-stone-700 leading-relaxed font-sans">{line.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
