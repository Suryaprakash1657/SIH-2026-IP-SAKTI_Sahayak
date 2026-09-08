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
          "relative inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl text-xs font-bold transition-all border shadow-xs select-none hover:scale-102 active:scale-98",
          isInnovator
            ? "bg-[#edf6f2] border-[#256550]/40 text-[#144d3c] hover:bg-[#e0f0ea]"
            : "bg-[#eff6ff] border-[#2563eb]/40 text-[#1e40af] hover:bg-[#dbeafe]",
          className
        )}
      >
        {isInnovator ? (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-[#1b5a4b] animate-pulse" />
            <Sparkles className="h-3.5 w-3.5 text-[#1b5a4b] shrink-0" />
            <span className="hidden sm:inline">Vaidya Mode</span>
            <span className="sm:hidden">Plain</span>
          </>
        ) : (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb] animate-pulse" />
            <Scale className="h-3.5 w-3.5 text-[#2563eb] shrink-0" />
            <span className="hidden sm:inline">Counsel Mode</span>
            <span className="sm:hidden">Statute</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-2xl bg-[#efe8d8] border border-[#d6ccb8] shadow-inner",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setMode("innovator")}
        className={cn(
          "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
          isInnovator
            ? "bg-[#123c33] text-[#f7f2e4] shadow-sm font-extrabold border border-[#225e50]"
            : "text-stone-700 hover:text-stone-950 hover:bg-[#e6ddc9]/60"
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", isInnovator ? "bg-emerald-400" : "bg-transparent")} />
        <span>Vaidya (Plain)</span>
      </button>

      <button
        type="button"
        onClick={() => setMode("attorney")}
        className={cn(
          "flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
          !isInnovator
            ? "bg-[#1e40af] text-white shadow-sm font-extrabold border border-[#3b82f6]"
            : "text-stone-700 hover:text-stone-950 hover:bg-[#e6ddc9]/60"
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", !isInnovator ? "bg-blue-300" : "bg-transparent")} />
        <span>Attorney (Legal)</span>
      </button>
    </div>
  );
}
