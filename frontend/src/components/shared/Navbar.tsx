"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Briefcase, FileText, CheckCircle2, BookOpen, Compass, ShieldCheck } from "lucide-react";

export function HireBridgeLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Precision SVG Brand Icon replicating the HireBridge mark */}
      <svg className="h-7 w-7 text-[#0A65EC] flex-shrink-0" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="22" r="4.5" fill="#0A65EC" />
        <circle cx="28" cy="22" r="4.5" fill="#0A65EC" />
        <circle cx="18" cy="11" r="5" fill="#0A65EC" />
        <path d="M8 22C8 22 11 15 18 15C25 15 28 22 28 22" stroke="#0A65EC" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <span className="text-xl font-bold tracking-tight text-[#0F172A] font-sans">
        HireBridge
      </span>
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        
        {/* Brand Logo - HireBridge */}
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <HireBridgeLogo />
        </Link>

        {/* Center Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-[14px] font-medium text-slate-700">
          
          {/* Jobs Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("jobs")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 hover:text-[#0A65EC] transition-colors py-2 font-medium">
              <span>Jobs</span>
              <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            {activeDropdown === "jobs" && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-fadeIn">
                <Link 
                  href="/jobs" 
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-[#0A65EC] transition-colors"
                >
                  <Briefcase className="h-4 w-4 text-[#0A65EC]" />
                  <div>
                    <div>AI Job Search</div>
                    <div className="text-[10px] text-slate-400 font-normal">Explore AI curated job roles</div>
                  </div>
                </Link>
                <Link 
                  href="/saved-jobs" 
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-[#0A65EC] transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#0A65EC]" />
                  <div>
                    <div>Saved Jobs</div>
                    <div className="text-[10px] text-slate-400 font-normal">View your bookmarked roles</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Companies Link */}
          <Link href="/jobs" className="hover:text-[#0A65EC] transition-colors py-2 font-medium">
            Companies
          </Link>

          {/* Resume Tools Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("resume")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 hover:text-[#0A65EC] transition-colors py-2 font-medium">
              <span>Resume Tools</span>
              <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200" />
            </button>
            {activeDropdown === "resume" && (
              <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-fadeIn">
                <Link 
                  href="/resume-builder" 
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-[#0A65EC] transition-colors"
                >
                  <FileText className="h-4 w-4 text-[#0A65EC]" />
                  <div>
                    <div>Resume Builder</div>
                    <div className="text-[10px] text-slate-400 font-normal">Create professional ATS resumes</div>
                  </div>
                </Link>
                <Link 
                  href="/ats-checker" 
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-[#0A65EC] transition-colors"
                >
                  <ShieldCheck className="h-4 w-4 text-[#0A65EC]" />
                  <div>
                    <div>ATS Checker</div>
                    <div className="text-[10px] text-slate-400 font-normal">Scan & score resume compatibility</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Career Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown("resources")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1.5 hover:text-[#0A65EC] transition-colors py-2 font-medium">
              <span>Career Resources</span>
              <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200" />
            </button>
            {activeDropdown === "resources" && (
              <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50 animate-fadeIn">
                <Link 
                  href="/resources" 
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-[#0A65EC] transition-colors"
                >
                  <BookOpen className="h-4 w-4 text-[#0A65EC]" />
                  <div>
                    <div>Career Advisor & Prep</div>
                    <div className="text-[10px] text-slate-400 font-normal">Interview tips & skill roadmaps</div>
                  </div>
                </Link>
                <Link 
                  href="/applications" 
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 hover:text-[#0A65EC] transition-colors"
                >
                  <Compass className="h-4 w-4 text-[#0A65EC]" />
                  <div>
                    <div>Application Tracker</div>
                    <div className="text-[10px] text-slate-400 font-normal">Track status of sent applications</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Auth Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link 
            href="/login" 
            className="border border-slate-200 text-slate-800 hover:bg-slate-50 px-4 py-1.5 rounded-lg font-medium text-sm transition-all"
          >
            Log In
          </Link>
          <Link 
            href="/register" 
            className="bg-[#0A65EC] hover:bg-[#0852be] text-white px-4 py-1.5 rounded-lg font-medium text-sm shadow-sm transition-all"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-3">
          <Link 
            href="/jobs" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-1.5"
          >
            Jobs
          </Link>
          <Link 
            href="/jobs" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-1.5"
          >
            Companies
          </Link>
          <Link 
            href="/resume-builder" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-1.5"
          >
            Resume Tools
          </Link>
          <Link 
            href="/resources" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-700 py-1.5"
          >
            Career Resources
          </Link>
          <div className="pt-2 border-t border-slate-100 flex gap-3">
            <Link 
              href="/login" 
              className="flex-1 text-center border border-slate-200 text-slate-800 py-2 rounded-lg font-medium text-sm"
            >
              Log In
            </Link>
            <Link 
              href="/register" 
              className="flex-1 text-center bg-[#0A65EC] text-white py-2 rounded-lg font-medium text-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
