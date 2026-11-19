"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "How does the HireBridge ATS Scanner evaluate resumes?",
    a: "Our ATS scanner parses your resume using the exact algorithms utilized by enterprise Applicant Tracking Systems (Greenhouse, Workday, Lever). It evaluates keyword coverage against target job descriptions, section hierarchy, bullet point quantification, and flags complex tables or unreadable elements that cause instant rejections."
  },
  {
    q: "Is HireBridge free for job seekers?",
    a: "Yes! Job searching, automated reverse matching, ATS compatibility audits, and standard AI resume downloads are 100% free for all job candidates. Premium tiers offer expanded daily AI generations and personalized career advisory sessions."
  },
  {
    q: "How does AI Job Matching differ from traditional job boards?",
    a: "Traditional job boards require you to search through hundreds of sponsored or stale listings. HireBridge uses Gemini AI to index your verified technical proficiencies and reverse-matches you with active roles that genuinely fit your seniority, preferred stack, and compensation expectations."
  },
  {
    q: "Can I download my resume in standard PDF and Word formats?",
    a: "Yes. Every resume built or refined in HireBridge exports to single-column, ATS-verified PDF and DOCX formats that are guaranteed to parse cleanly into employer databases."
  },
  {
    q: "How are hiring companies verified on HireBridge?",
    a: "Every company listing jobs on HireBridge undergoes domain verification and direct HR/recruiter identity checks. We have a zero-tolerance policy for ghost jobs or third-party spam listings."
  }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0463E9] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal">
            Clear answers to common questions about our AI career acceleration platform.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200 bg-white shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#0463E9] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-[#0463E9]" : ""
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
