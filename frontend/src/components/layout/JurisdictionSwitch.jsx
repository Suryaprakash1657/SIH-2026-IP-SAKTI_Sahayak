"use client";

import React from "react";
import { Globe, MapPin, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

export function JurisdictionSwitch({ value, onChange, className }) {
  return (
    <div className={cn("inline-flex p-1 rounded-2xl bg-[#eee7d7] border border-[#d6ccb8] shadow-inner", className)}>
      <button
        type="button"
        onClick={() => onChange("IN")}
        className={cn(
          "flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
          value === "IN"
            ? "bg-[#123c33] text-[#fbf8f0] shadow-sm border border-[#225e50]"
            : "text-stone-700 hover:text-stone-950 hover:bg-[#e4dcce]/60"
        )}
      >
        <MapPin className={cn("h-3.5 w-3.5", value === "IN" ? "text-[#38bdf8]" : "text-stone-500")} />
        <span>India (IPO)</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("EXPORT")}
        className={cn(
          "flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
          value === "EXPORT"
            ? "bg-[#1e40af] text-white shadow-sm border border-[#3b82f6]"
            : "text-stone-700 hover:text-stone-950 hover:bg-[#e4dcce]/60"
        )}
      >
        <Globe className={cn("h-3.5 w-3.5", value === "EXPORT" ? "text-blue-200" : "text-stone-500")} />
        <span>Export (PCT/USPTO)</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("BOTH")}
        className={cn(
          "flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer",
          value === "BOTH"
            ? "bg-[#0f172a] text-[#f8fafc] shadow-sm border border-[#334155]"
            : "text-stone-700 hover:text-stone-950 hover:bg-[#e4dcce]/60"
        )}
      >
        <Scale className={cn("h-3.5 w-3.5", value === "BOTH" ? "text-[#60a5fa]" : "text-stone-500")} />
        <span>Dual Comparative</span>
      </button>
    </div>
  );
}
