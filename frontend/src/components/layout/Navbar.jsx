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
  BookOpen,
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
    sectionRef: "§ 3(p) TK Bar",
  },
  {
    name: "Herbal Booster",
    attorneyName: "Sec 3(e) Synergy",
    href: "/synergism",
    icon: FlaskConical,
    badge: "1+1=3 Test",
    attorneyBadge: "CI Matrix",
    desc: "Prove combination potency exceeds raw herbs",
    sectionRef: "§ 3(e) Mere Admixture",
  },
  {
    name: "Forest & BDA",
    attorneyName: "BDA 2024 / ABS",
    href: "/bda-abs",
    icon: Scale,
    badge: "Farm vs Forest",
    attorneyBadge: "Sec 7 ABS",
    desc: "Sourcing origin, farmer royalty & SBB clearance",
    sectionRef: "BDA 2024 § 7",
  },
  {
    name: "Statute Inspector",
    attorneyName: "Statute RAG",
    href: "/inspector",
    icon: FileText,
    badge: "Gazette RAG",
    attorneyBadge: "Gazette RAG",
    desc: "Side-by-side law vs plain English explanation",
    sectionRef: "Gazette Citations",
  },
  {
    name: "Export Gateway",
    attorneyName: "Export / PCT",
    href: "/dual-jurisdiction",
    icon: Globe2,
    badge: "US / EU / India",
    attorneyBadge: "PCT / 35 USC",
    desc: "Compare domestic rules vs US/EU patenting",
    sectionRef: "Dual Jurisdiction",
  },
  {
    name: "Alternative IP",
    attorneyName: "IP Pivots",
    href: "/pivot-engine",
    icon: Compass,
    badge: "Trade Secrets",
    attorneyBadge: "Pivots",
    desc: "Brand trademarks, trade secrets & GI protection",
    sectionRef: "Class 5 / Secrets",
  },
  {
    name: "Dossier Hub",
    attorneyName: "Forms Dossier",
    href: "/dossier",
    icon: FileSpreadsheet,
    badge: "Ready-to-File",
    attorneyBadge: "Forms",
    desc: "Generate complete application packet & PDF",
    sectionRef: "IPO Form 1 & 2",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const { mode } = useLanguageStore();
  const isInnovator = mode === "innovator";

  const activeItem = NAV_ITEMS.find((item) => item.href === pathname);

  return (
    <header className="sticky top-0 z-50 w-full print:hidden shadow-floating">
      {/* ── 1. SLIM CIVIC-INSTITUTIONAL IDENTITY BAR ── */}
      <div className="w-full bg-forest-950 text-surface border-b border-forest-800 px-3 sm:px-6 lg:px-8 py-1.5 text-[11px] font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-brass-300 font-bold tracking-wider uppercase text-[11px]">
              National Ayush Jurisprudence Portal
            </span>
            <span className="text-forest-600 hidden md:inline font-bold">|</span>
            <span className="text-white/90 hidden md:inline truncate font-medium">
              Ministry of Ayush & CGPDTM Statutory Co-Pilot
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-brass-300 font-semibold">
              <BookOpen className="h-3.5 w-3.5 text-brass-400" />
              <span>54 Classical Pharmacopeias Indexed</span>
            </span>
            <span className="hidden sm:inline text-forest-600 font-bold">•</span>
            <span className="text-emerald-300 font-bold">BDA 2024 Active</span>
          </div>
        </div>
      </div>

      {/* ── 2. PRIMARY EXECUTIVE FOREST HEADER ── */}
      <div className="w-full bg-forest-900 border-b border-forest-800 text-surface-raised px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-3">
          {/* Brand Logo & Emblem - Crisp border, no diffuse shadow halo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-forest-950 text-brass-400 border border-brass-500/50 group-hover:border-brass-400 transition-all duration-200">
              <ShieldCheck className="h-5 w-5 text-brass-400 group-hover:scale-105 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2 rounded-full bg-saffron-500 border border-forest-950" />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif font-black text-xl tracking-tight text-white leading-none">
                  IP-SAKTI
                </span>
                <span className="font-sans font-bold text-base text-brass-400 tracking-tight leading-none">
                  Sahayak
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[9px] font-mono font-bold tracking-widest text-brass-300 uppercase">
                  SOVEREIGN CIVIC-TECH
                </span>
                <span className="h-1 w-1 rounded-full bg-forest-600" />
                <span className="text-[9px] font-semibold text-emerald-300 bg-forest-950 px-1.5 py-0.2 rounded border border-forest-700">
                  Ayush Jurisprudence AI
                </span>
              </div>
            </div>
          </Link>

          {/* Collapsible Module Bar Toggle (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setIsNavCollapsed((prev) => !prev)}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-xs",
                !isNavCollapsed
                  ? "bg-forest-800 text-surface-raised border-forest-700 hover:bg-forest-700"
                  : "bg-forest-950 text-brass-300 border-brass-600/30 hover:bg-forest-800"
              )}
              title={!isNavCollapsed ? "Collapse navigation corridor" : "Expand navigation corridor"}
              aria-label="Toggle navigation corridor"
            >
              <LayoutGrid className={cn("h-3.5 w-3.5", !isNavCollapsed ? "text-brass-400" : "text-emerald-400")} />
              <span>All Modules (7)</span>
              {!isNavCollapsed ? (
                <span className="flex items-center text-[10px] font-mono opacity-80">
                  <ChevronUp className="h-3 w-3 ml-0.5" />
                  <span className="ml-0.5">Fold</span>
                </span>
              ) : (
                <span className="flex items-center text-[10px] font-mono opacity-80">
                  <ChevronDown className="h-3 w-3 ml-0.5" />
                  <span className="ml-0.5">Open</span>
                </span>
              )}
            </button>
          </div>

          {/* Perspective Toggle & Mobile Triggers */}
          <div className="flex items-center gap-2.5 shrink-0">
            <PlainLanguageToggle compact />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-xl border border-forest-700 bg-forest-800 text-surface-raised hover:bg-forest-700 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── 3. CONTEXTUAL BREADCRUMB STRIP ── */}
      {activeItem && (
        <div className="w-full bg-forest-950 border-b border-forest-800 px-3 sm:px-6 lg:px-8 py-1.5 hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-white/90">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-brass-300 hover:text-white font-medium transition-colors">
                Registry Home
              </Link>
              <ChevronRight className="h-3 w-3 text-forest-500" />
              <span className="text-white font-bold">
                {isInnovator ? activeItem.name : activeItem.attorneyName}
              </span>
              <span className="text-forest-600 font-bold">•</span>
              <span className="text-brass-300 font-medium text-[11px]">
                {activeItem.sectionRef}
              </span>
            </div>

            <span className="text-[11px] text-white/80 font-medium hidden md:inline">
              {activeItem.desc}
            </span>
          </div>
        </div>
      )}

      {/* ── 4. DEDICATED COLLAPSIBLE NAVIGATION CORRIDOR ── */}
      {!isNavCollapsed && (
        <div className="w-full border-b border-line bg-surface-dark px-3 sm:px-6 lg:px-8 py-2 transition-all duration-200">
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
                      "relative inline-flex items-center gap-2 h-8 px-3 text-xs rounded-lg transition-all whitespace-nowrap shrink-0",
                      isActive
                        ? "bg-forest-800 text-white font-bold border border-brass-400 shadow-xs"
                        : "text-white/90 hover:text-white hover:bg-forest-800 font-semibold"
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5 shrink-0", isActive ? "text-brass-400" : "text-brass-400/90")} />
                    <span>{displayName}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-brass-400 ml-0.5" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={() => setIsNavCollapsed(true)}
              className="hidden xl:inline-flex items-center gap-1 text-[11px] font-bold text-brass-300 hover:text-white px-2 py-0.5 rounded hover:bg-forest-800 transition-colors shrink-0 cursor-pointer"
              title="Collapse corridor"
            >
              <ChevronUp className="h-3 w-3" />
              <span>Fold</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 5. MOBILE NAVIGATION DRAWER ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-line bg-surface-raised px-4 py-5 space-y-4 shadow-floating animate-civic-rise text-ink">
          <div className="flex justify-between items-center pb-3 border-b border-line">
            <span className="text-xs font-serif font-bold text-ink-soft">Perspective Lens:</span>
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
                    "flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all border",
                    isActive
                      ? "bg-forest-900 text-surface-raised font-bold border-forest-700 shadow-card"
                      : "bg-surface text-ink hover:bg-surface-raised border-line"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "p-1.5 rounded-lg",
                        isActive ? "bg-forest-800 text-brass-400" : "bg-canvas text-forest-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-serif font-bold leading-tight">{displayName}</span>
                      <span className="text-[10px] text-ink-muted">{item.desc}</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border",
                      isActive
                        ? "bg-forest-950 text-brass-400 border-brass-600/40"
                        : "bg-surface-raised text-ink-muted border-line"
                    )}
                  >
                    {displayBadge}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-line">
            <Link
              href="/diagnostic"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-xs font-bold py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-surface-raised border border-brass-500/40 shadow-card transition-all"
            >
              <Sparkles className="h-4 w-4 text-brass-400" />
              <span>Launch Section 3(p) Patentability Checker</span>
              <ChevronRight className="h-4 w-4 ml-0.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
