"use client";

import React from "react";
import { Sparkles, Scale } from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { cn } from "@/lib/utils";

export function PlainLanguageToggle({ className, compact = false }) {
  const { mode, toggleMode, setMode } = useLanguageStore();
  const isInnovator = mode === "innovator";

  if (compact) {
    return (
      <button
        onClick={toggleMode}
        type="button"
        title={
          isInnovator
            ? "Switch to Patent Attorney Mode (Statutory Citations)"
            : "Switch to Innovator Mode (Plain English)"
        }
        className={cn(
          "relative inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl text-xs font-bold transition-all border shadow-xs select-none cursor-pointer",
          isInnovator
            ? "bg-surface-raised border-line text-forest-900 hover:bg-surface hover:border-forest-700/50"
            : "bg-forest-950 border-forest-700 text-brass-300 hover:bg-forest-900",
          className
        )}
      >
        {isInnovator ? (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <Sparkles className="h-3.5 w-3.5 text-forest-700 shrink-0" />
            <span className="hidden sm:inline font-serif font-bold">Vaidya Mode</span>
            <span className="sm:hidden font-serif">Plain</span>
          </>
        ) : (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-brass-400 animate-pulse" />
            <Scale className="h-3.5 w-3.5 text-brass-400 shrink-0" />
            <span className="hidden sm:inline font-serif font-bold">Counsel Mode</span>
            <span className="sm:hidden font-serif">Statute</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-2xl bg-canvas-deep border border-line shadow-inner",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setMode("innovator")}
        className={cn(
          "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
          isInnovator
            ? "bg-forest-900 text-surface-raised shadow-xs font-extrabold border border-forest-700"
            : "text-ink-soft hover:text-ink hover:bg-canvas/80"
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", isInnovator ? "bg-emerald-400" : "bg-transparent")} />
        <span className="font-serif">Vaidya (Plain)</span>
      </button>

      <button
        type="button"
        onClick={() => setMode("attorney")}
        className={cn(
          "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
          !isInnovator
            ? "bg-forest-900 text-brass-300 shadow-xs font-extrabold border border-brass-600/40"
            : "text-ink-soft hover:text-ink hover:bg-canvas/80"
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", !isInnovator ? "bg-brass-400" : "bg-transparent")} />
        <span className="font-serif">Attorney (Statute)</span>
      </button>
    </div>
  );
}
