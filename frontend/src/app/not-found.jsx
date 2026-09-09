"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, BookOpen, Scale } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 text-ink">
      <div className="parchment-card max-w-2xl w-full p-8 sm:p-12 text-center space-y-7 relative overflow-hidden border border-line shadow-card">
        {/* Heraldic Shield Emblem */}
        <div className="mx-auto">
          <div className="h-16 w-16 rounded-2xl bg-forest-900 text-brass-400 border border-brass-500/40 flex items-center justify-center mx-auto shadow-card">
            <Scale className="h-8 w-8 text-brass-400" />
          </div>
        </div>

        {/* Notice & Gazette Reference */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-forest-50 text-forest-900 border border-forest-600/30">
            <ShieldAlert className="h-3.5 w-3.5 text-brass-700" />
            404 • Statutory Provision Not in Active Register
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif font-black text-forest-950 tracking-tight pt-1">
            Requested Gazette Section <span className="text-brass-700 italic font-serif">Uncataloged</span>
          </h1>

          <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto font-sans leading-relaxed">
            The requested Ayush compliance module, classical scripture cross-reference, or statutory docket does not exist in the active IP-SAKTI Sahayak registry.
          </p>
        </div>

        {/* Action Routes */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-serif font-bold bg-forest-900 hover:bg-forest-800 text-surface-raised border border-forest-700 transition-all shadow-xs cursor-pointer"
          >
            <Home className="h-4 w-4 text-brass-400" />
            <span>Command Dashboard</span>
          </Link>

          <Link
            href="/diagnostic"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-serif font-bold bg-surface hover:bg-surface-raised text-forest-950 border border-line transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-brass-600" />
            <span>Formulation Diagnostic</span>
          </Link>

          <Link
            href="/inspector"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-serif font-bold bg-surface hover:bg-surface-raised text-forest-950 border border-line transition-all cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-brass-600" />
            <span>Gazette Inspector</span>
          </Link>
        </div>

        {/* Bottom Institutional Seal */}
        <div className="pt-4 border-t border-line text-[10px] text-ink-muted font-mono">
          <span>IP-SAKTI Sahayak • Official Ayush Jurisprudence Core Registry</span>
        </div>
      </div>
    </div>
  );
}
