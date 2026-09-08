"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, BookOpen, Scale } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="parchment-card max-w-2xl w-full p-8 sm:p-12 text-center space-y-8 relative overflow-hidden shadow-luxury">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-radial from-blue-400/20 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

        {/* Heraldic Shield Emblem */}
        <div className="relative z-10 mx-auto">
          <div className="h-20 w-20 rounded-3xl bg-forest-950 text-blue-300 border-2 border-blue-400/50 flex items-center justify-center mx-auto shadow-luxury">
            <Scale className="h-10 w-10 text-blue-400" />
          </div>
        </div>

        {/* Notice & Gazette Reference */}
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest bg-forest-900/10 text-forest-900 border border-forest-800/20">
            <ShieldAlert className="h-3.5 w-3.5 text-blue-600" />
            404 • Statutory Provision Not in Register
          </span>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 tracking-tight pt-2">
            Requested Gazette Section <span className="gold-foil-text font-serif italic">Uncataloged</span>
          </h1>

          <p className="text-sm text-slateLegal-700 max-w-lg mx-auto font-sans leading-relaxed">
            The requested Ayush compliance module, classical scripture cross-reference, or statutory docket does not exist in the active IP-SAKTI Sahayak registry.
          </p>
        </div>

        {/* Action Routes */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-linear-to-r from-forest-850 to-forest-950 text-parchment-50 hover:from-forest-800 hover:to-forest-900 border border-blue-500/40 transition-all shadow-luxury hover:shadow-emerald-glow cursor-pointer"
          >
            <Home className="h-4 w-4 text-blue-300" />
            <span>Command Dashboard</span>
          </Link>

          <Link
            href="/diagnostic"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-parchment-100 hover:bg-parchment-200 text-forest-950 border border-parchment-300 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-forest-700" />
            <span>Formulation Diagnostic</span>
          </Link>

          <Link
            href="/inspector"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-parchment-100 hover:bg-parchment-200 text-forest-950 border border-parchment-300 transition-all cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-blue-700" />
            <span>Gazette Inspector</span>
          </Link>
        </div>

        {/* Bottom Institutional Seal */}
        <div className="relative z-10 pt-4 border-t border-parchment-200/80 text-[10px] text-slateLegal-500 font-mono">
          <span>IP-SAKTI Sahayak • Official Ayush Jurisprudence Core</span>
        </div>
      </div>
    </div>
  );
}
