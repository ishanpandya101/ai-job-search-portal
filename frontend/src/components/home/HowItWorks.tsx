"use client";

import React, { useState } from "react";
import { UploadCloud, Cpu, Send, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    step: "01",
    title: "Upload or Build Your Resume",
    subtitle: "AI ATS Optimization",
    description: "Upload your existing PDF/Word resume or use our AI builder. Our parser audits 30+ ATS parameters, keyword density, and formatting flaws instantly.",
    highlight: "99.2% ATS Pass Rate Guaranteed",
    icon: UploadCloud,
    badgeColor: "bg-blue-50 text-[#0463E9] border-blue-200"
  },
  {
    step: "02",
    title: "AI Matches You to Top Roles",
    subtitle: "Skill-Based Compatibility",
    description: "Instead of searching through thousands of irrelevant listings, our Gemini AI evaluates your exact tech stack and ranks open positions with compatibility scores.",
    highlight: "Instant 90%+ Role Matching",
    icon: Cpu,
    badgeColor: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    step: "03",
    title: "1-Click Direct Application",
    subtitle: "Skip the Black Hole",
    description: "Submit tailored resumes straight to hiring teams and verified recruiters. Track your application status, interview schedules, and offers in real time.",
    highlight: "3x Faster Response Times",
    icon: Send,
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200"
  }
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0463E9] text-xs font-bold uppercase tracking-wider">
            Simple 3-Step Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            How HireBridge Gets You Hired Faster
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal">
            We eliminated recruiter black holes by combining intelligent resume screening with precision job matching.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isHovered = activeTab === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveTab(idx)}
                className={`relative bg-white border rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isHovered 
                    ? "border-[#0463E9] shadow-xl -translate-y-1.5 ring-1 ring-[#0463E9]/20" 
                    : "border-slate-200/80 shadow-sm hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-mono text-slate-200">
                      {s.step}
                    </span>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isHovered ? "bg-[#0463E9] text-white" : "bg-slate-50 text-[#0463E9] border border-slate-100"
                    }`}>
                      <Icon className="h-6 w-6 stroke-[1.8]" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    {s.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    {s.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <CheckCircle2 className="h-4 w-4" /> {s.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold tracking-tight">Ready to boost your interview callback rate?</h4>
            <p className="text-xs sm:text-sm text-slate-400">Join over 50,000+ active candidates landing interviews at top companies.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link 
              href="/ats-checker" 
              className="bg-[#0463E9] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              Scan Resume Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/jobs" 
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-lg border border-slate-700 transition-all"
            >
              Explore Open Roles
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
