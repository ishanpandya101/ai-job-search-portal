// File path: src/app/(dashboard)/saved-jobs/page.tsx
"use client";

import React, { useState } from "react";
import Navbar from "../../../components/shared/Navbar";
import { Bookmark, MapPin, Briefcase, Terminal, ArrowRight, Trash2 } from "lucide-react";

interface SavedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  matchPercentage: number;
}

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([
    {
      id: 1,
      title: "Senior Full Stack Engineer",
      company: "Innovate AI",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$140,000 - $180,000",
      matchPercentage: 95
    },
    {
      id: 2,
      title: "MERN Stack Developer",
      company: "Novatech Solutions",
      location: "Remote",
      type: "Remote",
      salary: "$90,050 - $120,000",
      matchPercentage: 88
    }
  ]);

  const handleRemove = (id: number) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F9F9FB] dark:bg-[#080710] flex flex-col font-sans text-slate-800 dark:text-slate-200 relative overflow-hidden transition-colors duration-300">
      
      {/* Background accents */}
      <div className="absolute top-[-25%] left-[-15%] w-[450px] h-[450px] rounded-full bg-slate-100/40 dark:bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-50/50 dark:bg-fuchsia-500/5 blur-[100px] pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 relative z-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-200/60 dark:border-[#211f43]/60 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Saved <span className="text-indigo-600 dark:text-cyan-400 font-light">Roles</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-xs font-semibold leading-relaxed">
            Keep track of the opportunities that match your professional goals. Apply anytime with your AI-optimized resume.
          </p>
        </div>

        {/* Saved Jobs List */}
        <div className="space-y-4">
          {savedJobs.length > 0 ? (
            savedJobs.map((job) => (
              <div 
                key={job.id} 
                className="glass-card glass-card-hover p-6 rounded-2xl group flex flex-col md:flex-row gap-6 items-start animate-fadeIn"
              >
                {/* Brand Icon */}
                <div className="h-11 w-11 bg-slate-50 dark:bg-[#131227] border border-slate-200/80 dark:border-[#211f43]/60 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <Terminal className="h-5 w-5 text-slate-800 dark:text-indigo-400" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors font-sans">
                        {job.title}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-550 mt-0.5">
                        {job.company}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => handleRemove(job.id)}
                      className="text-slate-350 dark:text-slate-655 hover:text-rose-500 dark:hover:text-rose-450 transition-colors p-1"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
                </div>

                {/* Match percentage & Actions */}
                <div className="w-full md:w-44 flex flex-col justify-between items-end gap-4 pl-0 md:pl-6 border-l-0 md:border-l border-slate-100/85 dark:border-[#211f43]/60">
                  <div className="w-full text-right md:text-left">
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
            <div className="bg-white dark:bg-[#0f0e1c] border border-dashed border-slate-200 dark:border-[#211f43] rounded-2xl p-16 text-center shadow-sm">
              <Bookmark className="h-8 w-8 text-slate-350 dark:text-slate-655 mx-auto mb-4 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-1.5">No Saved Roles</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto font-semibold">
                Explore matched recommendations on our AI Job Search and bookmark your favorites to see them here!
              </p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
