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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/80 backdrop-blur-md animate-civic-rise">
      <div className="relative w-full max-w-3xl bg-surface-raised border border-brass-500/40 rounded-3xl overflow-hidden shadow-floating flex flex-col max-h-[92vh] text-ink">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-forest-900 text-surface-raised border-b border-forest-800">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brass-300">
              {topic.category}
            </span>
            <span className="text-forest-700">•</span>
            <span className="text-xs font-mono text-ink-inverse/70 flex items-center gap-1">
              <Clock className="h-3 w-3 text-brass-400" /> {topic.duration}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-forest-800 text-ink-inverse/80 hover:text-surface-raised transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative aspect-video w-full bg-forest-950 flex flex-col items-center justify-center overflow-hidden border-b border-line">
          <div className="text-center space-y-3 z-10 px-6 max-w-lg">
            <div className="inline-flex p-4 rounded-3xl bg-forest-900/80 border border-brass-500/30 text-brass-400 shadow-card">
              <Sparkles className="h-8 w-8 text-brass-400" />
            </div>
            <h4 className="text-lg sm:text-xl font-serif font-bold text-surface-raised leading-snug">
              {topic.title}
            </h4>
            <p className="text-xs text-ink-inverse/75 font-sans leading-relaxed">
              {topic.summary}
            </p>
          </div>

          {/* Video Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-forest-950 via-forest-950/80 to-transparent flex items-center justify-between gap-3 text-surface-raised z-20">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-8 w-8 rounded-lg bg-brass-600 hover:bg-brass-500 text-forest-950 flex items-center justify-center transition-all cursor-pointer font-bold"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>
              <button
                onClick={() => setProgress(0)}
                className="h-8 w-8 rounded-lg hover:bg-forest-800 text-ink-inverse/70 flex items-center justify-center transition-colors cursor-pointer"
                title="Restart"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Scrubber Bar */}
            <div className="flex-1 mx-2">
              <div className="w-full bg-forest-800 h-2 rounded-full overflow-hidden border border-forest-700">
                <div
                  className="bg-brass-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="h-8 w-8 rounded-lg hover:bg-forest-800 text-ink-inverse/70 flex items-center justify-center transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-line bg-surface px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab("takeaways")}
            className={`pb-2.5 text-xs font-serif font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === "takeaways"
                ? "border-forest-900 text-forest-900"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            Key Takeaways
          </button>
          <button
            onClick={() => setActiveTab("transcript")}
            className={`pb-2.5 text-xs font-serif font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === "transcript"
                ? "border-forest-900 text-forest-900"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            Plain-Language Script
          </button>
        </div>

        {/* Scrollable Content Pane */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-64 font-sans text-xs leading-relaxed">
          {activeTab === "takeaways" && (
            <ul className="space-y-2.5">
              {topic.takeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface border border-line">
                  <CheckCircle2 className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                  <span className="text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "transcript" && (
            <div className="space-y-3 font-mono">
              {topic.transcript.map((line, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-surface border border-line">
                  <span className="text-brass-700 font-bold shrink-0">{line.time}</span>
                  <span className="text-ink-soft font-sans">{line.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
