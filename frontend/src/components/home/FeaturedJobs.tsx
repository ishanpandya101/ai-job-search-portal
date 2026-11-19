"use client";

import React, { useState } from "react";
import { 
  Briefcase, MapPin, DollarSign, Bookmark, 
  CheckCircle2, ArrowRight, Sparkles, Building2, X 
} from "lucide-react";
import Link from "next/link";

interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  match: number;
  tags: string[];
  featured?: boolean;
}

const FEATURED_JOBS: JobItem[] = [
  {
    id: "1",
    title: "Senior Full-Stack Engineer",
    company: "Stripe",
    location: "San Francisco, CA (Remote)",
    type: "Full-Time",
    salary: "$165,000 - $210,000",
    match: 98,
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Next.js"],
    featured: true
  },
  {
    id: "2",
    title: "AI Solutions & Prompt Engineer",
    company: "Anthropic",
    location: "New York, NY (Hybrid)",
    type: "Full-Time",
    salary: "$180,000 - $245,000",
    match: 96,
    tags: ["Python", "PyTorch", "LLMs", "RAG Systems", "Vector DB"],
    featured: true
  },
  {
    id: "3",
    title: "Frontend Architect (Design Systems)",
    company: "Airbnb",
    location: "Remote (Global)",
    type: "Full-Time",
    salary: "$150,000 - $195,000",
    match: 94,
    tags: ["Design Systems", "Tailwind CSS", "React", "TypeScript", "Web Vitals"]
  },
  {
    id: "4",
    title: "Cloud Infrastructure & DevOps Lead",
    company: "Datadog",
    location: "Austin, TX (Remote)",
    type: "Full-Time",
    salary: "$155,000 - $200,000",
    match: 92,
    tags: ["Kubernetes", "AWS", "Terraform", "Docker", "CI/CD"]
  }
];

export default function FeaturedJobs() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [applyModalJob, setApplyModalJob] = useState<JobItem | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);

  const toggleSave = (id: string) => {
    setSaved(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setApplyModalJob(null);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#0463E9] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3 w-3" /> Live Job Feed
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Curated High-Match Roles
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Top opportunities matched by our intelligent career recommendation engine
          </p>
        </div>

        <Link 
          href="/jobs"
          className="text-xs sm:text-sm font-bold text-[#0463E9] hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          View all 10,000+ jobs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Grid of Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FEATURED_JOBS.map((job) => (
          <div 
            key={job.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-extrabold text-slate-800 text-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                    {job.company[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#0463E9] transition-colors leading-snug">
                      {job.title}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">
                      {job.company}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => toggleSave(job.id)}
                  title="Bookmark Job"
                  className={`p-1.5 rounded-lg border transition-colors ${
                    saved[job.id] 
                      ? "bg-blue-50 border-blue-200 text-[#0463E9]" 
                      : "border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <Bookmark className="h-4 w-4" fill={saved[job.id] ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 my-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" /> {job.type}
                </span>
                <span className="font-bold text-slate-900">
                  {job.salary}
                </span>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {job.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/60 text-slate-600 text-[10px] font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row: Match % and Quick Apply */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Match</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  {job.match}% Compatible
                </span>
              </div>

              <button
                onClick={() => setApplyModalJob(job)}
                className="bg-[#0463E9] hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                Quick Apply <ArrowRight className="h-3 w-3" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Quick Apply Modal */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 p-6 relative">
            <button 
              onClick={() => setApplyModalJob(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            {applySuccess ? (
              <div className="text-center py-6 space-y-3 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
                <p className="text-xs text-slate-500">
                  Your profile and ATS resume were delivered directly to the {applyModalJob.company} hiring team.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">1-Click Fast Apply</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Applying to <strong className="text-slate-800">{applyModalJob.title}</strong> at {applyModalJob.company}
                  </p>
                </div>

                <div className="space-y-3 text-xs font-semibold text-slate-700">
                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-slate-500 uppercase">Your Full Name</label>
                    <input 
                      type="text" 
                      required 
                      defaultValue="Alex Rivera"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-[#0463E9] text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-slate-500 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      defaultValue="alex.rivera@example.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-[#0463E9] text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[11px] font-bold text-slate-500 uppercase">Attach Resume</label>
                    <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                      <span className="text-slate-600">Alex_Rivera_Resume_2026.pdf</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded">98% ATS</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0463E9] hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-xs transition-colors shadow-sm mt-2"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
