"use client";

import React from "react";
import { Globe, MapPin, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

export function JurisdictionSwitch({ value, onChange, className }) {
  return (
    <div className={cn("inline-flex p-1 rounded-2xl bg-canvas-deep border border-line shadow-inner", className)}>
      <button
        type="button"
        onClick={() => onChange("IN")}
        className={cn(
          "flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
          value === "IN"
            ? "bg-forest-900 text-surface-raised shadow-xs border border-forest-700"
            : "text-ink-soft hover:text-ink hover:bg-canvas/80"
        )}
      >
        <MapPin className={cn("h-3.5 w-3.5", value === "IN" ? "text-brass-400" : "text-moss-600")} />
        <span className="font-serif font-bold">India (IPO)</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("EXPORT")}
        className={cn(
          "flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
          value === "EXPORT"
            ? "bg-brass-700 text-surface-raised shadow-xs border border-brass-600"
            : "text-ink-soft hover:text-ink hover:bg-canvas/80"
        )}
      >
        <Globe className={cn("h-3.5 w-3.5", value === "EXPORT" ? "text-saffron-300" : "text-ink-muted")} />
        <span className="font-serif font-bold">Export (PCT/US)</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("BOTH")}
        className={cn(
          "flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
          value === "BOTH"
            ? "bg-forest-950 text-brass-300 shadow-xs border border-brass-600/40"
            : "text-ink-soft hover:text-ink hover:bg-canvas/80"
        )}
      >
        <Scale className={cn("h-3.5 w-3.5", value === "BOTH" ? "text-emerald-400" : "text-ink-muted")} />
        <span className="font-serif font-bold">Dual Comparative</span>
      </button>
    </div>
  );
}
