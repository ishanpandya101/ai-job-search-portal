"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Sparkles, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const LIVE_EVENTS = [
  { text: "Alex R. applied for Senior Full-Stack Engineer at Stripe", metric: "98% Match", time: "2m ago" },
  { text: "Priya M. boosted ATS score from 58% → 96%", metric: "Ready to Apply", time: "4m ago" },
  { text: "David K. landed an interview at Anthropic", metric: "AI Solutions", time: "6m ago" },
  { text: "18 new Remote Next.js roles listed today", metric: "Active Hiring", time: "Just now" }
];

export default function LiveActivityTicker() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const current = LIVE_EVENTS[currentIdx];

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm w-full hidden sm:block animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3.5 shadow-xl shadow-slate-200/50 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 leading-tight truncate max-w-[190px]">
                {current.text}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
              <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                {current.metric}
              </span>
              <span>•</span>
              <span>{current.time}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
