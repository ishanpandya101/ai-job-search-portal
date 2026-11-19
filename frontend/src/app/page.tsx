"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/shared/Navbar";
import { 
  ArrowRight, Briefcase, Building2, Users, 
  Search, FileText, ShieldCheck, UserCheck, 
  BarChart3
} from "lucide-react";

import InterviewPrepModal from "../components/home/InterviewPrepModal";
import CareerAdvisorModal from "../components/home/CareerAdvisorModal";
import QuickResumeScanner from "../components/home/QuickResumeScanner";
import FeaturedJobs from "../components/home/FeaturedJobs";
import HiringCompanies from "../components/home/HiringCompanies";
import QuickJobSearch from "../components/home/QuickJobSearch";
import HowItWorks from "../components/home/HowItWorks";
import ResumeComparison from "../components/home/ResumeComparison";
import SalaryCalculator from "../components/home/SalaryCalculator";
import FaqSection from "../components/home/FaqSection";
import LiveActivityTicker from "../components/home/LiveActivityTicker";

export default function HomePage() {
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Precision Header Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col bg-white">
        
        {/* ======================================================== */}
        {/* 2. HERO SECTION - EXACT REPLICATION OF USER MOCKUP        */}
        {/* ======================================================== */}
        <section className="relative w-full bg-white border-b border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12 lg:py-14 grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6 z-10">
              
              {/* Eyebrow */}
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  Your Career, Our Platform
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[52px] font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
                Find Jobs, Build a<br />
                Stronger Resume,<br />
                and Get Hired
              </h1>

              {/* Subheadline */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-md">
                A complete job search platform with resume screening, career tools, and access to top opportunities.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link 
                  href="/jobs" 
                  className="bg-[#0463E9] hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Find Jobs <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="/ats-checker" 
                  className="border-2 border-[#1E293B] hover:bg-slate-50 text-[#0F172A] px-7 py-3 rounded-lg font-semibold text-sm hover:-translate-y-0.5 transition-all duration-200"
                >
                  Analyze Resume
                </Link>
              </div>

              {/* 3 Metric Counters */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="text-[#0463E9] flex-shrink-0">
                    <Briefcase className="h-5 w-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-[#0F172A] leading-tight">10,000+</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Job Opportunities</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-[#0463E9] flex-shrink-0">
                    <Building2 className="h-5 w-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-[#0F172A] leading-tight">2,500+</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Hiring Companies</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-[#0463E9] flex-shrink-0">
                    <Users className="h-5 w-5 stroke-[2]" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-[#0F172A] leading-tight">50,000+</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Active Job Seekers</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: AI Generated Executive Interview Visual + 3 Floating Cards */}
            <div className="lg:col-span-7 relative w-full flex items-center justify-center lg:justify-end select-none">
              <div className="relative w-full max-w-[700px] aspect-[1.78] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/5 border border-slate-100">
                
                {/* AI Generated Photorealistic Interview & Resume Review Image */}
                <Image 
                  src="/hero-ai-interview.png" 
                  alt="HireBridge Executive Interview & Resume Screening" 
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover object-center"
                />

                {/* Subtle soft gradient on the right to make the floating cards pop cleanly */}
                <div className="absolute inset-y-0 right-0 w-3/5 bg-gradient-to-l from-white/30 via-transparent to-transparent pointer-events-none" />

                {/* 3 Floating Interactive Cards on the Right */}
                <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-[230px] sm:w-[265px] space-y-3 z-20">
                  
                  {/* Card 1: Resume Screening */}
                  <Link
                    href="/ats-checker"
                    title="Open Resume Screening (ATS Checker)"
                    className="bg-white/95 backdrop-blur-md border border-slate-100/90 rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 cursor-pointer group block"
                  >
                    <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-blue-50 text-[#0463E9] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0463E9] group-hover:text-white transition-colors">
                      <FileText className="h-4 sm:h-4.5 w-4 sm:w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0463E9] transition-colors leading-tight">
                        Resume Screening
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight mt-0.5">
                        Check your resume for ATS & get improvement tips
                      </p>
                    </div>
                  </Link>

                  {/* Card 2: Job Matching */}
                  <Link
                    href="/jobs"
                    title="Open Job Matching"
                    className="bg-white/95 backdrop-blur-md border border-slate-100/90 rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 cursor-pointer group block"
                  >
                    <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-blue-50 text-[#0463E9] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0463E9] group-hover:text-white transition-colors">
                      <Briefcase className="h-4 sm:h-4.5 w-4 sm:w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0463E9] transition-colors leading-tight">
                        Job Matching
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight mt-0.5">
                        Discover relevant jobs based on your profile
                      </p>
                    </div>
                  </Link>

                  {/* Card 3: Career Insights */}
                  <button
                    type="button"
                    onClick={() => setAdvisorModalOpen(true)}
                    title="Open Career Insights"
                    className="w-full text-left bg-white/95 backdrop-blur-md border border-slate-100/90 rounded-2xl p-3 sm:p-3.5 shadow-lg shadow-slate-900/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-blue-50 text-[#0463E9] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0463E9] group-hover:text-white transition-colors">
                      <BarChart3 className="h-4 sm:h-4.5 w-4 sm:w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0463E9] transition-colors leading-tight">
                        Career Insights
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight mt-0.5">
                        Get skill recommendations and career guidance
                      </p>
                    </div>
                  </button>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. EXPLORE OUR CAREER TOOLS SECTION                       */}
        {/* ======================================================== */}
        <section className="py-14 md:py-18 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Explore Our Career Tools
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-normal">
                Everything you need to search, apply, and grow in your career.
              </p>
            </div>

            {/* 5 High-Fidelity Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              
              {/* Tool 1: Job Search */}
              <Link 
                href="/jobs"
                className="bg-white border border-slate-150 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#EBF3FF] text-[#0463E9] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0463E9] group-hover:text-white transition-all duration-300">
                  <Search className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm sm:text-[15px] mb-1.5 group-hover:text-[#0463E9] transition-colors">
                  Job Search
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[190px]">
                  Find the right job opportunities from top companies.
                </p>
              </Link>

              {/* Tool 2: Resume Builder */}
              <Link 
                href="/resume-builder"
                className="bg-white border border-slate-150 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#EBF3FF] text-[#0463E9] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0463E9] group-hover:text-white transition-all duration-300">
                  <FileText className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm sm:text-[15px] mb-1.5 group-hover:text-[#0463E9] transition-colors">
                  Resume Builder
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[190px]">
                  Create a professional, ATS-friendly resume.
                </p>
              </Link>

              {/* Tool 3: ATS Checker */}
              <Link 
                href="/ats-checker"
                className="bg-white border border-slate-150 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#EBF3FF] text-[#0463E9] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0463E9] group-hover:text-white transition-all duration-300">
                  <ShieldCheck className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm sm:text-[15px] mb-1.5 group-hover:text-[#0463E9] transition-colors">
                  ATS Checker
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[190px]">
                  Analyze your resume and improve your chances.
                </p>
              </Link>

              {/* Tool 4: Interview Prep */}
              <div 
                onClick={() => setInterviewModalOpen(true)}
                className="bg-white border border-slate-150 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#EBF3FF] text-[#0463E9] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0463E9] group-hover:text-white transition-all duration-300">
                  <UserCheck className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm sm:text-[15px] mb-1.5 group-hover:text-[#0463E9] transition-colors">
                  Interview Prep
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[190px]">
                  Practice common questions and get ready for interviews.
                </p>
              </div>

              {/* Tool 5: Career Advisor */}
              <div 
                onClick={() => setAdvisorModalOpen(true)}
                className="bg-white border border-slate-150 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#EBF3FF] text-[#0463E9] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0463E9] group-hover:text-white transition-all duration-300">
                  <BarChart3 className="h-5 w-5 stroke-[2.2]" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm sm:text-[15px] mb-1.5 group-hover:text-[#0463E9] transition-colors">
                  Career Advisor
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[190px]">
                  Get personalized career and skill recommendations.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. FEATURE: INTERACTIVE INSTANT JOB SEARCH BAR           */}
        {/* ======================================================== */}
        <section className="py-6 bg-white max-w-7xl mx-auto px-6 w-full">
          <QuickJobSearch />
        </section>

        {/* ======================================================== */}
        {/* 5. FEATURE: VERIFIED TOP HIRING COMPANIES                */}
        {/* ======================================================== */}
        <HiringCompanies />

        {/* ======================================================== */}
        {/* 6. FEATURE: HOW HIREBRIDGE WORKS (3 STEPS)               */}
        {/* ======================================================== */}
        <HowItWorks />

        {/* ======================================================== */}
        {/* 7. FEATURE: RESUME BEFORE VS AFTER COMPARISON            */}
        {/* ======================================================== */}
        <ResumeComparison />

        {/* ======================================================== */}
        {/* 8. FEATURE: INTERACTIVE TECH SALARY CALCULATOR           */}
        {/* ======================================================== */}
        <SalaryCalculator />

        {/* ======================================================== */}
        {/* 9. FEATURE: LIVE CURATED JOB FEED WITH FAST APPLY        */}
        {/* ======================================================== */}
        <section className="py-14 bg-white max-w-7xl mx-auto px-6 w-full">
          <FeaturedJobs />
        </section>

        {/* ======================================================== */}
        {/* 10. FEATURE: INSTANT RESUME ATS QUICK-SCAN DROPZONE      */}
        {/* ======================================================== */}
        <section className="py-14 bg-slate-50/60 border-t border-slate-150">
          <div className="max-w-7xl mx-auto px-6">
            <QuickResumeScanner />
          </div>
        </section>

        {/* ======================================================== */}
        {/* 11. FEATURE: FREQUENTLY ASKED QUESTIONS ACCORDION        */}
        {/* ======================================================== */}
        <FaqSection />

      </main>

      {/* ======================================================== */}
      {/* 12. REAL-TIME CANDIDATE ACTIVITY TICKER                  */}
      {/* ======================================================== */}
      <LiveActivityTicker />

      {/* ======================================================== */}
      {/* 13. INTERACTIVE MODALS FOR CAREER TOOLS                  */}
      {/* ======================================================== */}
      <InterviewPrepModal 
        isOpen={interviewModalOpen} 
        onClose={() => setInterviewModalOpen(false)} 
      />
      <CareerAdvisorModal 
        isOpen={advisorModalOpen} 
        onClose={() => setAdvisorModalOpen(false)} 
      />

      {/* ======================================================== */}
      {/* 14. COMPREHENSIVE BRAND FOOTER                           */}
      {/* ======================================================== */}
      <footer className="w-full bg-white border-t border-slate-100 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <svg className="h-6 w-6 text-[#0463E9]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="22" r="4.5" fill="#0463E9" />
                  <circle cx="28" cy="22" r="4.5" fill="#0463E9" />
                  <circle cx="18" cy="11" r="5" fill="#0463E9" />
                  <path d="M8 22C8 22 11 15 18 15C25 15 28 22 28 22" stroke="#0463E9" strokeWidth="5" strokeLinecap="round" />
                </svg>
                <span className="font-extrabold text-slate-900 text-lg">HireBridge</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Your Career, Our Platform. Accelerate your career growth with AI-powered resume screening, intelligent job matching, and curated opportunities.
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Career Tools</h5>
              <ul className="space-y-2 text-slate-500 font-medium">
                <li><Link href="/jobs" className="hover:text-[#0463E9] transition-colors">AI Job Search</Link></li>
                <li><Link href="/resume-builder" className="hover:text-[#0463E9] transition-colors">Resume Builder</Link></li>
                <li><Link href="/ats-checker" className="hover:text-[#0463E9] transition-colors">ATS Resume Checker</Link></li>
                <li><button onClick={() => setInterviewModalOpen(true)} className="hover:text-[#0463E9] transition-colors">AI Interview Prep</button></li>
              </ul>
            </div>

            <div className="space-y-2.5 text-xs">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Career Resources</h5>
              <ul className="space-y-2 text-slate-500 font-medium">
                <li><button onClick={() => setAdvisorModalOpen(true)} className="hover:text-[#0463E9] transition-colors">Career Insights & Salary</button></li>
                <li><Link href="/applications" className="hover:text-[#0463E9] transition-colors">Application Tracker</Link></li>
                <li><Link href="/saved-jobs" className="hover:text-[#0463E9] transition-colors">Saved Job Bookmarks</Link></li>
                <li><Link href="/pricing" className="hover:text-[#0463E9] transition-colors">Plans & Pricing</Link></li>
              </ul>
            </div>

            <div className="space-y-2.5 text-xs">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Stay Updated</h5>
              <p className="text-slate-500">Get the top curated remote engineering jobs sent to your inbox weekly.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs w-full outline-none focus:border-[#0463E9]"
                />
                <button className="bg-[#0463E9] hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>© 2026 HireBridge. All rights reserved.</div>
            <div className="flex gap-6 font-medium">
              <Link href="#" className="hover:text-slate-600">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-600">Terms of Service</Link>
              <Link href="#" className="hover:text-slate-600">Security</Link>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
