"use client";

import React, { useState } from "react";
import { Search, MapPin, Sparkles, ArrowRight, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

const POPULAR_TAGS = [
  "React", "Python", "Remote", "AI Engineer", "Product Manager", 
  "Full Stack", "Data Analyst", "Next.js"
];

export default function QuickJobSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = encodeURIComponent(keyword || "Software Engineer");
    router.push(`/jobs?q=${query}`);
  };

  const handleTagClick = (tag: string) => {
    setKeyword(tag);
    router.push(`/jobs?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-lg shadow-slate-200/40">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        
        {/* Keyword Input */}
        <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-[#0463E9] focus-within:bg-white transition-all">
          <Search className="h-5 w-5 text-slate-400 flex-shrink-0" />
          <input 
            type="text" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, skills, or company (e.g. Frontend Engineer)" 
            className="w-full bg-transparent border-none text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none"
          />
        </div>

        {/* Location Input */}
        <div className="md:w-64 flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 focus-within:border-[#0463E9] focus-within:bg-white transition-all">
          <MapPin className="h-5 w-5 text-slate-400 flex-shrink-0" />
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location or 'Remote'" 
            className="w-full bg-transparent border-none text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none"
          />
        </div>

        {/* Search CTA */}
        <button 
          type="submit"
          className="bg-[#0463E9] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5 flex-shrink-0"
        >
          <Sparkles className="h-4 w-4" />
          Find Jobs
        </button>

      </form>

      {/* Popular Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-3.5 mt-3 border-t border-slate-100 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Trending:</span>
        {POPULAR_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#0463E9] text-slate-600 font-medium transition-colors text-[11px]"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
