"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  FlaskConical,
  Scale,
  FileText,
  Compass,
  FileSpreadsheet,
  Globe2,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PlainLanguageToggle } from "./PlainLanguageToggle";
import { useLanguageStore } from "@/lib/language-store";

const NAV_ITEMS = [
  {
    name: "Patent Checker",
    attorneyName: "Sec 3(p) Checker",
    href: "/diagnostic",
    icon: ShieldCheck,
    badge: "Recipe Check",
    attorneyBadge: "Sec 3(p)",
    desc: "Test if ancient recipe or patent-eligible",
  },
  {
    name: "Herbal Booster",
    attorneyName: "Sec 3(e) Synergy",
    href: "/synergism",
    icon: FlaskConical,
    badge: "1+1=3 Test",
    attorneyBadge: "CI Matrix",
    desc: "Prove combination potency exceeds raw herbs",
  },
  {
    name: "Forest & BDA",
    attorneyName: "BDA 2024 / ABS",
    href: "/bda-abs",
    icon: Scale,
    badge: "Farm vs Forest",
    attorneyBadge: "Sec 7 ABS",
    desc: "Sourcing origin, farmer royalty & SBB clearance",
  },
  {
    name: "Statute Inspector",
    attorneyName: "Statute RAG",
    href: "/inspector",
    icon: FileText,
    badge: "Gazette RAG",
    attorneyBadge: "Gazette RAG",
    desc: "Side-by-side law vs plain English explanation",
  },
  {
    name: "Export Gateway",
    attorneyName: "Export / PCT",
    href: "/dual-jurisdiction",
    icon: Globe2,
    badge: "US / EU / India",
    attorneyBadge: "PCT / 35 USC",
    desc: "Compare domestic rules vs US/EU patenting",
  },
  {
    name: "Alternative IP",
    attorneyName: "IP Pivots",
    href: "/pivot-engine",
    icon: Compass,
    badge: "Trade Secrets",
    attorneyBadge: "Pivots",
    desc: "Brand trademarks, trade secrets & GI protection",
  },
  {
    name: "Dossier Hub",
    attorneyName: "Forms Dossier",
    href: "/dossier",
    icon: FileSpreadsheet,
    badge: "Ready-to-File",
    attorneyBadge: "Forms",
    desc: "Generate complete application packet & PDF",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const { mode } = useLanguageStore();
  const isInnovator = mode === "innovator";

  return (
    <header className="sticky top-0 z-50 w-full glass-luxury border-b border-[#e5decb]/80 shadow-xs print:hidden">
      {/* Primary Brand & Actions Header */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo & Emblem */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0b382d] via-[#145a49] to-[#07251e] text-[#f5ecd5] border border-[#2563eb]/50 shadow-md group-hover:scale-105 transition-all duration-300">
            <ShieldCheck className="h-5 w-5 text-[#38bdf8]" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
            </span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-black text-lg tracking-tight text-[#0f2d24] leading-none">
                IP-SAKTI
              </span>
              <span className="font-sans font-bold text-base text-[#2563eb] tracking-tight leading-none">
                Sahayak
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[9px] font-mono font-bold tracking-widest text-stone-500 uppercase">
                PORTAL
              </span>
              <span className="h-1 w-1 rounded-full bg-stone-300" />
              <span className="text-[9px] font-semibold text-[#185547] bg-[#e1efe8] px-1.5 py-0.5 rounded border border-[#2d7f63]/30">
                Ayush Jurisprudence AI
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Collapsible Navigation Bar Control */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => setIsNavCollapsed((prev) => !prev)}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shadow-xs cursor-pointer",
              !isNavCollapsed
                ? "bg-[#103e33] text-white border-[#23584a] hover:bg-[#185546]"
                : "bg-[#eee7d7] text-[#1c3a30] border-[#d6ccb8] hover:bg-[#e4dcce]"
            )}
            title={!isNavCollapsed ? "Collapse navigation tabs" : "Expand navigation tabs"}
            aria-label="Toggle navigation tabs"
          >
            <LayoutGrid className={cn("h-3.5 w-3.5", !isNavCollapsed ? "text-[#38bdf8]" : "text-[#185547]")} />
            <span>All Modules (7)</span>
            {!isNavCollapsed ? (
              <span className="flex items-center text-[11px] font-mono opacity-80">
                <ChevronUp className="h-3.5 w-3.5 ml-0.5" />
                <span className="hidden md:inline ml-0.5">Collapse</span>
              </span>
            ) : (
              <span className="flex items-center text-[11px] font-mono opacity-80">
                <ChevronDown className="h-3.5 w-3.5 ml-0.5" />
                <span className="hidden md:inline ml-0.5">Expand</span>
              </span>
            )}
          </button>
        </div>

        {/* Executive Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          <PlainLanguageToggle compact />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-xl border border-[#d6ccb8] text-[#1c3a30] hover:text-[#0a201b] hover:bg-[#efe8d6] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Dedicated Collapsible Navigation Bar - All 7 Modules Perfectly Visible */}
      {!isNavCollapsed && (
        <div className="w-full border-t border-[#e2d9c4] bg-[#fbf9f4]/95 backdrop-blur-md px-3 sm:px-6 lg:px-8 py-2 transition-all duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 w-full">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const displayName = isInnovator ? item.name : item.attorneyName;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.desc}
                    className={cn(
                      "relative inline-flex items-center gap-2 h-9 px-3 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0",
                      isActive
                        ? "bg-[#103e33] text-[#f7f2e4] shadow-sm font-bold border border-[#23584a]"
                        : "text-[#284037] hover:text-[#0b2b23] hover:bg-[#efe8d5]"
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-[#38bdf8]" : "text-[#476b5e]")} />
                    <span>{displayName}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] ml-0.5 animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Collapse Action */}
            <button
              onClick={() => setIsNavCollapsed(true)}
              className="hidden xl:inline-flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-stone-800 px-2.5 py-1 rounded-lg hover:bg-[#efe8d5] transition-colors shrink-0 cursor-pointer"
              title="Collapse tabs bar"
            >
              <ChevronUp className="h-3.5 w-3.5" />
              <span>Hide</span>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ded5c2] bg-[#fbf9f4]/98 backdrop-blur-2xl px-4 py-5 space-y-4 shadow-2xl animate-in fade-in-50 slide-in-from-top-2">
          <div className="flex justify-between items-center pb-3 border-b border-[#e5decb]">
            <span className="text-xs font-semibold text-stone-600">Language Perspective:</span>
            <PlainLanguageToggle compact />
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const displayName = isInnovator ? item.name : item.attorneyName;
              const displayBadge = isInnovator ? item.badge : item.attorneyBadge;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all",
                    isActive
                      ? "bg-[#103e33] text-white font-bold shadow-sm"
                      : "text-stone-700 hover:text-stone-950 hover:bg-[#f1ebe0]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("p-1.5 rounded-lg", isActive ? "bg-[#1a5547] text-white" : "bg-[#e8e2d3] text-[#185547]")}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold leading-tight">{displayName}</span>
                      <span className="text-[10px] text-stone-500">{item.desc}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ede5d4] text-stone-700 font-mono font-medium">
                    {displayBadge}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#e5decb]">
            <Link
              href="/diagnostic"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-xs font-bold py-3.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white shadow-md transition-all"
            >
              <Sparkles className="h-4 w-4 text-sky-200" />
              Launch Formulation Patentability Checker
              <ChevronRight className="h-4 w-4 ml-0.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

