"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Sparkles, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ResumeComparison() {
  const [activeView, setActiveView] = useState<"after" | "before">("after");

  return (
    <section className="py-20 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" /> Proven Results
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            See the Difference: Before vs. After HireBridge
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal">
            90% of resumes fail automated applicant tracking systems due to invisible formatting traps and missing semantic keywords.
          </p>

          {/* Toggle Button */}
          <div className="inline-flex p-1.5 rounded-xl bg-white border border-slate-200 shadow-sm mt-4">
            <button
              onClick={() => setActiveView("before")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeView === "before" 
                  ? "bg-rose-50 text-rose-700 shadow-sm border border-rose-200" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Standard Generic Resume
            </button>
            <button
              onClick={() => setActiveView("after")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === "after" 
                  ? "bg-[#0463E9] text-white shadow-sm" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" /> HireBridge AI-Optimized
            </button>
          </div>
        </div>

        {/* Comparison Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Score Card & Breakdown */}
          <div className="lg:col-span-5 space-y-6 bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {activeView === "after" ? "Optimized Performance" : "Typical Rejection Pattern"}
              </span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className={`text-5xl font-extrabold font-mono ${activeView === "after" ? "text-emerald-600" : "text-rose-600"}`}>
                  {activeView === "after" ? "96%" : "48%"}
                </span>
                <span className="text-xs font-bold text-slate-500">ATS Pass Rating</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
              {activeView === "after" ? (
                <>
                  <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Keyword density matches enterprise job descriptions</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Quantified achievements with % growth and latency reductions</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Standard single-column ATS parsable layout with clean headers</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Targeted tech stack indexing (React 18, Next.js, Node.js, AWS)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                    <span>Missing critical tech keywords required by job filters</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                    <span>Vague responsibilities (&ldquo;Responsible for fixing bugs&rdquo;)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                    <span>Complex multi-column tables unreadable by Workday / Greenhouse</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600">
                    <XCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                    <span>No measurable metrics or quantified engineering impact</span>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/ats-checker"
              className="w-full bg-[#0463E9] hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm block text-center"
            >
              Analyze Your Resume Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: Mock Resume Document Preview */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md relative overflow-hidden font-sans">
            
            {/* Top Indicator Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="text-xs font-mono font-bold text-slate-400 ml-2">resume_preview.pdf</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                activeView === "after" 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}>
                {activeView === "after" ? "✓ 96% Match with Staff Full-Stack JD" : "⚠ 48% Match (High Rejection Probability)"}
              </span>
            </div>

            {/* Document Content */}
            <div className="space-y-4 text-slate-800 text-xs">
              <div>
                <h4 className="text-base font-extrabold text-slate-900 tracking-tight">ALEX RIVERA</h4>
                <p className="text-slate-500 text-[11px]">San Francisco, CA • alex.rivera@example.com • linkedin.com/in/alexrivera</p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  Professional Experience
                </h5>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Senior Software Engineer — TechScale Inc.</span>
                      <span className="text-slate-400 font-normal">2023 – Present</span>
                    </div>

                    {activeView === "after" ? (
                      <ul className="list-disc pl-4 space-y-1 text-slate-700 mt-1 leading-relaxed">
                        <li>
                          Architected micro-frontend portal using <strong className="text-slate-900">Next.js 14 and React</strong>, decreasing initial bundle load time by <strong className="text-emerald-700">42% (from 3.8s to 2.2s)</strong> across 1.2M monthly users.
                        </li>
                        <li>
                          Implemented distributed caching with <strong className="text-slate-900">Redis and PostgreSQL</strong>, handling 15,000 requests/sec with 99.99% uptime during peak product releases.
                        </li>
                        <li>
                          Automated CI/CD pipelines via <strong className="text-slate-900">GitHub Actions & Docker</strong>, accelerating release cycles from bi-weekly to continuous daily deployments.
                        </li>
                      </ul>
                    ) : (
                      <ul className="list-disc pl-4 space-y-1 text-slate-500 mt-1 leading-relaxed">
                        <li>Worked on front-end web development with React and JavaScript for customer website.</li>
                        <li>Assisted with backend APIs, database bug fixes, and maintaining server stability.</li>
                        <li>Collaborated with design team and attended daily standup agile meetings.</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills section */}
              <div>
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b border-slate-200 pb-1 mb-2">
                  Technical Proficiencies
                </h5>
                <p className="text-slate-700 leading-relaxed">
                  {activeView === "after" ? (
                    <span><strong>Languages & Frameworks:</strong> TypeScript, JavaScript (ES6+), React 18, Next.js, Node.js, Python, PostgreSQL, Redis, Docker, AWS, GraphQL, REST APIs.</span>
                  ) : (
                    <span><strong>Skills:</strong> HTML, CSS, JavaScript, React, Computers, Problem Solving, Communication, Microsoft Word.</span>
                  )}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
