"use client";

import React from "react";
import { cn } from "@/lib/utils";

const VARIANT_COLORS = {
  forest: {
    stroke: "#29745e",
    text: "text-forest-900",
    badge: "bg-forest-50 text-forest-900 border-forest-600/40 font-bold",
    darkBadge: "bg-forest-950 text-emerald-300 border-emerald-500/60 font-bold",
  },
  brass: {
    stroke: "#bd8b4a",
    text: "text-brass-700",
    badge: "bg-brass-50 text-brass-900 border-brass-600/40 font-bold",
    darkBadge: "bg-forest-950 text-brass-300 border-brass-500/60 font-bold",
  },
  saffron: {
    stroke: "#d39736",
    text: "text-saffron-600",
    badge: "bg-saffron-50 text-saffron-950 border-saffron-600/40 font-bold",
    darkBadge: "bg-forest-950 text-saffron-300 border-saffron-500/60 font-bold",
  },
  emerald: {
    stroke: "#1f6b47",
    text: "text-emerald-900",
    badge: "bg-emerald-50 text-emerald-950 border-emerald-600/40 font-bold",
    darkBadge: "bg-forest-950 text-emerald-300 border-emerald-500/60 font-bold",
  },
  crimson: {
    stroke: "#9c3c2e",
    text: "text-rose-900",
    badge: "bg-rose-50 text-rose-950 border-rose-600/40 font-bold",
    darkBadge: "bg-forest-950 text-rose-300 border-rose-500/60 font-bold",
  },
};

const SIZES = {
  sm: {
    dim: 72,
    strokeWidth: 6,
    valueText: "text-base font-bold",
    labelText: "text-[10px]",
  },
  md: {
    dim: 108,
    strokeWidth: 8,
    valueText: "text-2xl font-black",
    labelText: "text-xs",
  },
  lg: {
    dim: 144,
    strokeWidth: 10,
    valueText: "text-3xl font-black",
    labelText: "text-sm",
  },
};

export function MetricGauge({
  value = 0,
  max = 100,
  unit = "%",
  label = "",
  sublabel = "",
  variant = "forest",
  statusLabel = "",
  size = "md",
  className = "",
  dark = false,
}) {
  const cfg = SIZES[size] || SIZES.md;
  const col = VARIANT_COLORS[variant] || VARIANT_COLORS.forest;

  const pct = Math.min(Math.max((Number(value) / Number(max)) * 100, 0), 100);
  const gaugeAngle = `${Math.round((pct / 100) * 360)}deg`;

  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      {/* Conic Ring Wrapper - Crisp, no blurry shadow halo */}
      <div
        className="metric-gauge-ring"
        style={{
          width: cfg.dim,
          height: cfg.dim,
          "--gauge-angle": gaugeAngle,
          "--gauge-color": col.stroke,
        }}
      >
        {/* Inner Tactile Dial Core */}
        <div
          className={cn(
            "rounded-full flex flex-col items-center justify-center transition-colors",
            dark
              ? "bg-forest-950 text-surface border border-line-dark"
              : "bg-surface-raised text-ink border border-line shadow-xs"
          )}
          style={{
            width: cfg.dim - cfg.strokeWidth * 2,
            height: cfg.dim - cfg.strokeWidth * 2,
          }}
        >
          <div className="flex items-baseline justify-center">
            <span className={cn("font-mono tracking-tight", cfg.valueText, dark ? "text-white font-black" : col.text)}>
              {value}
            </span>
            {unit && (
              <span className={cn("text-[10px] font-mono font-bold ml-0.5", dark ? "text-white/80" : "text-ink-soft")}>
                {unit}
              </span>
            )}
          </div>
          {sublabel && (
            <span className={cn(
              "text-[9px] font-mono uppercase tracking-wider leading-none mt-0.5",
              dark ? "text-brass-300 font-semibold" : "text-ink-muted"
            )}>
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {/* Label and Status */}
      {label && (
        <span className={cn(
          "font-serif mt-2 block",
          cfg.labelText,
          dark ? "text-white font-bold" : "text-forest-950 font-bold"
        )}>
          {label}
        </span>
      )}

      {statusLabel && (
        <span
          className={cn(
            "inline-block mt-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border shadow-xs",
            dark ? col.darkBadge : col.badge
          )}
        >
          {statusLabel}
        </span>
      )}
    </div>
  );
}
