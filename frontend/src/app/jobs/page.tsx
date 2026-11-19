// File path: src/app/jobs/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/shared/Navbar";
import { aiService } from "../../services/api/aiService";
import { 
  Search, MapPin, Briefcase, Filter, 
  Bookmark, Clock, Building2, ArrowRight, Zap, Terminal, Sparkles, RefreshCw, UploadCloud, CheckCircle2
} from "lucide-react";

interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  matchPercentage: number;
  description: string;
  techStack: string[];
}

export default function PremiumJobsPage() {
  const [query, setQuery] = useState<string>("MERN Stack Developer");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [minMatch, setMinMatch] = useState<number>(70);

  // Resume Upload to Search States & Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingResume, setUploadingResume] = useState<boolean>(false);
  const [uploadedName, setUploadedName] = useState<string | null>(null);

  const handleSearch = async (customQuery?: string) => {
    const searchQuery = customQuery ?? query;
    console.log("[HireBridge Job Search] Searching jobs for query:", searchQuery);

    setLoading(true);
    setError(null);
    try {
      const data = await aiService.searchJobs(searchQuery);
      if (Array.isArray(data) && data.length > 0) {
        setJobs(data);
      } else {
        throw new Error("No jobs found");
      }
    } catch (err: any) {
      console.error("[HireBridge Job Search] Error fetching jobs:", err);
      // Resilient fallback: load curated jobs
      const fallback = await aiService.searchJobs("Full-Stack Software Engineer");
      setJobs(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedName(file.name);
    setUploadingResume(true);
    setError(null);
    
    try {
      const uploadResult = await aiService.uploadResume(file);
      const text = uploadResult.resumeText;
      const queryText = text.substring(0, 80).replace(/\r?\n|\r/g, " ");
      setQuery(queryText);
      await handleSearch(queryText);
    } catch (err: any) {
      console.error("[HireBridge Job Search] Resume auto-match error:", err);
      await handleSearch("Software Engineer");
    } finally {
      setUploadingResume(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const filteredJobs = jobs.filter(job => job.matchPercentage >= minMatch);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 relative overflow-hidden transition-colors duration-300">
      
      {/* Background accents */}
      <div className="absolute top-[-25%] left-[-15%] w-[450px] h-[450px] rounded-full bg-slate-100/40 dark:bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-50/50 dark:bg-fuchsia-500/5 blur-[100px] pointer-events-none" />

      {/* Frosted Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-10 relative z-10">
        
        {/* ========================================== */}
        {/* LEFT SIDEBAR: STRICT MINIMAL FILTERS       */}
        {/* ========================================== */}
        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8 sticky top-28 h-fit">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-[#211f43]/60 pb-4">
            <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-indigo-500" /> Search Filters
            </h2>
            <button 
              onClick={() => setMinMatch(80)}
              className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-wider"
            >
              Reset
            </button>
          </div>

          <div className="space-y-6">
            {/* Match Rating Slider */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-300 flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-indigo-500" /> Minimum AI Match
              </h3>
              <input 
                type="range" 
                min="50" 
                max="100" 
                value={minMatch} 
                onChange={(e) => setMinMatch(Number(e.target.value))}
                className="w-full accent-indigo-655 dark:accent-cyan-400 h-1 bg-slate-200 dark:bg-[#1a1936] rounded-full appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 font-mono">
                <span>50%</span>
                <span className="text-slate-900 dark:text-cyan-400 font-bold">&gt; {minMatch}% Compatibility</span>
              </div>
            </div>

            <div className="border-t border-slate-200/60 dark:border-[#211f43]/60"></div>

            {/* Resume Upload to Auto-Match Widget */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <UploadCloud className="h-3.5 w-3.5 text-indigo-500" /> Resume Auto-Match
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold leading-relaxed">
                Upload your resume to search jobs matching your profile automatically.
              </p>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`border border-dashed border-slate-250 hover:border-slate-450 bg-slate-50/50 hover:bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all relative ${uploadingResume ? 'opacity-80' : ''}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleResumeUpload}
                  accept=".pdf,.txt,.md"
                  className="hidden"
                />
                
                {uploadingResume ? (
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-slate-900 animate-spin" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <UploadCloud className="h-4 w-4 text-slate-900 mb-1 animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-900 uppercase">Upload PDF/TXT</span>
                  </div>
                )}
              </div>
              
              {uploadedName && (
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5 flex items-center justify-between text-[10px] font-bold text-slate-650 animate-fadeIn">
                  <span className="truncate max-w-[120px]">{uploadedName}</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-900 flex-shrink-0" />
                </div>
              )}
            </div>

            <div className="border-t border-slate-200/60 dark:border-[#211f43]/60"></div>

            {/* Modalities */}
            <div>
              <h3 className="text-xs font-bold text-slate-850 dark:text-slate-400 mb-3 uppercase tracking-wider text-[10px] text-slate-450 dark:text-slate-500">
                Modalities
              </h3>
              <div className="space-y-3">
                {['Full-time', 'Contract', 'Remote'].map((type, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={i === 0 || i === 2} 
                      className="rounded border-slate-350 dark:border-[#211f43] bg-white dark:bg-[#0f0e1c] text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5 cursor-pointer" 
                    />
                    <span className="text-xs text-slate-550 dark:text-slate-400 font-semibold group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================== */}
        {/* RIGHT AREA: SEARCH & DYNAMIC CARDS       */}
        {/* ========================================== */}
        <div className="flex-1 space-y-6">
          
          {/* Utilitarian Search Bar (Stripe style - Pure White) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex flex-col md:flex-row gap-1 shadow-sm focus-within:border-slate-800 focus-within:ring-1 focus-within:ring-slate-900 transition-all">
            <div className="flex-1 flex items-center px-3">
              <Search className="h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="What job profile are you targeting? (e.g. MERN Developer)" 
                className="w-full bg-transparent border-none focus:ring-0 text-xs font-semibold px-3 py-2 outline-none text-slate-800 placeholder:text-slate-400"
              />
            </div>
            
            <button 
              onClick={() => handleSearch()}
              className="bg-slate-950 hover:bg-slate-850 text-white px-7 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5"
            >
              <Sparkles className="h-3.5 w-3.5 fill-white/10 animate-pulse-slow" />
              Find Curated Jobs
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-200/60 dark:border-[#211f43]/60">
            <p className="text-[10px] font-extrabold text-slate-450 dark:text-slate-500 uppercase tracking-widest leading-none">
              Gemini AI Matched: <span className="text-slate-900 dark:text-cyan-400 font-bold">{filteredJobs.length}</span> recommendations
            </p>
          </div>

          {/* Skeleton Loader during fetch */}
          {loading && (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white dark:bg-[#0f0e1c] border border-slate-200/80 dark:border-[#211f43]/85 p-6 rounded-2xl shadow-sm flex flex-col gap-4 animate-pulse">
                  <div className="flex gap-4 items-center">
                    <div className="h-11 w-11 bg-slate-100 dark:bg-slate-900 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 bg-slate-100 dark:bg-slate-900 rounded w-1/3" />
                      <div className="h-2.5 bg-slate-100 dark:bg-slate-900 rounded w-1/4" />
                    </div>
                  </div>
                  <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded w-full" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded w-5/6" />
                </div>
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="bg-rose-500/5 dark:bg-rose-950/10 border border-rose-500/10 dark:border-rose-900/30 text-rose-600 p-6 rounded-2xl text-xs flex gap-3 items-center shadow-sm">
              <span>{error}</span>
              <button 
                onClick={() => handleSearch()} 
                className="underline font-bold hover:text-rose-800 dark:hover:text-rose-450 flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" /> Retry Match
              </button>
            </div>
          )}

          {/* Dynamic Job Recommendations */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, idx) => (
                  <div 
                    key={idx} 
                    className="glass-card glass-card-hover p-6 rounded-2xl group flex flex-col md:flex-row gap-6 items-start"
                  >
                    
                    {/* Brand Icon */}
                    <div className="h-11 w-11 bg-slate-50 dark:bg-[#131227] border border-slate-200/80 dark:border-[#211f43]/60 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <Terminal className="h-5 w-5 text-slate-800 dark:text-indigo-400" strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full space-y-1.5">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors font-sans">
                            {job.title}
                          </h3>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-550 mt-0.5">
                            {job.company}
                          </p>
                        </div>
                        <Bookmark className="h-4 w-4 text-slate-350 dark:text-slate-655 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-550" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-slate-400 dark:text-slate-550" /> {job.type}
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{job.salary}</span>
                      </div>

                      <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
                        {job.description}
                      </p>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {job.techStack.map((tech) => (
                          <span 
                            key={tech} 
                            className="px-2.5 py-0.5 bg-slate-50 dark:bg-[#131227]/80 border border-slate-200/60 dark:border-[#211f43]/60 text-slate-655 dark:text-slate-400 rounded-full text-[9px] font-bold shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Compatibility Match Column */}
                    <div className="w-full md:w-44 flex flex-col justify-between items-end gap-5 pl-0 md:pl-6 border-l-0 md:border-l border-slate-100/85 dark:border-[#211f43]/60">
                      <div className="w-full">
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                            AI Compatibility
                          </span>
                          <span className="text-xs font-extrabold text-slate-950 dark:text-cyan-400">
                            {job.matchPercentage}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-1">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1 rounded-full animate-pulse" 
                            style={{ width: `${job.matchPercentage}%` }} 
                          />
                        </div>
                      </div>
                      <button 
                        className="w-full py-2 bg-slate-50 hover:bg-slate-950 border border-slate-200 hover:border-slate-950 text-slate-800 hover:text-white dark:bg-[#131227] dark:hover:bg-indigo-650 dark:border-[#211f43] dark:hover:border-indigo-600 dark:text-indigo-200 dark:hover:text-white rounded-full text-[10px] font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm dark:shadow-none hover:-translate-y-0.5"
                      >
                        Apply Now <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-[#0f0e1c] border border-slate-200/80 dark:border-[#211f43]/80 rounded-2xl p-12 text-center shadow-sm">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">
                    No job matches located over the current minimum compatibility filter.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}