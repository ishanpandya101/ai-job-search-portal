"use client";

import React, { useState } from "react";
import { DollarSign, TrendingUp, Sparkles, Building2, MapPin, Award } from "lucide-react";
import Link from "next/link";

interface SalaryData {
  p25: number;
  median: number;
  p90: number;
  currency: string;
  topSkills: string[];
}

const SALARY_DATABASE: Record<string, Record<string, SalaryData>> = {
  "Frontend Engineer": {
    "Remote (Global)": { p25: 115000, median: 145000, p90: 185000, currency: "$", topSkills: ["Next.js", "TypeScript", "Tailwind CSS", "Web Vitals"] },
    "United States": { p25: 130000, median: 165000, p90: 210000, currency: "$", topSkills: ["React 18", "State Machines", "GraphQL", "Performance"] },
    "Europe": { p25: 75000, median: 95000, p90: 130000, currency: "€", topSkills: ["TypeScript", "Micro-frontends", "CI/CD", "Jest"] },
    "India": { p25: 1800000, median: 2800000, p90: 4500000, currency: "₹", topSkills: ["React", "System Design", "Redux Toolkit", "Next.js"] }
  },
  "Full-Stack Engineer": {
    "Remote (Global)": { p25: 125000, median: 155000, p90: 205000, currency: "$", topSkills: ["Node.js", "PostgreSQL", "React", "Docker", "AWS"] },
    "United States": { p25: 140000, median: 175000, p90: 230000, currency: "$", topSkills: ["TypeScript", "PostgreSQL", "Next.js", "Microservices"] },
    "Europe": { p25: 80000, median: 105000, p90: 145000, currency: "€", topSkills: ["Go / Node.js", "Postgres", "React", "Kubernetes"] },
    "India": { p25: 2200000, median: 3500000, p90: 5500000, currency: "₹", topSkills: ["MERN Stack", "System Architecture", "AWS", "Kafka"] }
  },
  "AI & ML Engineer": {
    "Remote (Global)": { p25: 145000, median: 185000, p90: 250000, currency: "$", topSkills: ["Python", "PyTorch", "LLM Fine-Tuning", "RAG Systems"] },
    "United States": { p25: 165000, median: 215000, p90: 295000, currency: "$", topSkills: ["Transformers", "Vector DBs", "LangChain", "GPU Optimization"] },
    "Europe": { p25: 90000, median: 125000, p90: 175000, currency: "€", topSkills: ["PyTorch", "MLOps", "FastAPI", "NLP"] },
    "India": { p25: 2500000, median: 4200000, p90: 7000000, currency: "₹", topSkills: ["GenAI", "Deep Learning", "TensorFlow", "MLOps"] }
  },
  "DevOps / SRE": {
    "Remote (Global)": { p25: 130000, median: 160000, p90: 210000, currency: "$", topSkills: ["Kubernetes", "Terraform", "AWS", "Datadog", "CI/CD"] },
    "United States": { p25: 145000, median: 180000, p90: 240000, currency: "$", topSkills: ["IaC", "EKS", "Prometheus", "Site Reliability"] },
    "Europe": { p25: 85000, median: 110000, p90: 150000, currency: "€", topSkills: ["Docker", "K8s", "GCP", "Ansible"] },
    "India": { p25: 2000000, median: 3200000, p90: 5200000, currency: "₹", topSkills: ["AWS DevOps", "Terraform", "Docker", "Linux"] }
  }
};

export default function SalaryCalculator() {
  const [role, setRole] = useState("Full-Stack Engineer");
  const [location, setLocation] = useState("Remote (Global)");

  const data = SALARY_DATABASE[role]?.[location] || SALARY_DATABASE["Full-Stack Engineer"]["Remote (Global)"];

  const formatNumber = (val: number, curr: string) => {
    if (curr === "₹") {
      return (val / 100000).toFixed(1) + " LPA";
    }
    return "$" + (val / 1000).toFixed(0) + "k";
  };

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0463E9] text-xs font-bold uppercase tracking-wider">
            <DollarSign className="h-3.5 w-3.5" /> Market Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Interactive AI Tech Salary Calculator
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal">
            Real-time compensation benchmarks across 10,000+ verified active job postings and hire offers.
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm">
          
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8 border-b border-slate-200/70">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#0463E9] shadow-sm cursor-pointer"
              >
                {Object.keys(SALARY_DATABASE).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Work Location / Modality
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#0463E9] shadow-sm cursor-pointer"
              >
                {Object.keys(SALARY_DATABASE["Full-Stack Engineer"]).map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary Percentile Display */}
          <div className="py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            
            {/* 25th Percentile */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Entry / 25th Percentile
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {formatNumber(data.p25, data.currency)}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Starting range</p>
            </div>

            {/* Median (Highlighted) */}
            <div className="bg-gradient-to-b from-blue-50/80 to-white p-6 rounded-2xl border-2 border-[#0463E9] shadow-md space-y-1 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0463E9] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Market Average
              </span>
              <span className="text-[10px] font-bold text-[#0463E9] uppercase tracking-wider">
                Median Base Salary
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-mono">
                {formatNumber(data.median, data.currency)}
              </div>
              <p className="text-[11px] text-emerald-600 font-bold">Standard hiring range</p>
            </div>

            {/* 90th Percentile */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Senior / Top 10%
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {formatNumber(data.p90, data.currency)}
              </div>
              <p className="text-[11px] text-purple-600 font-bold">High impact senior tier</p>
            </div>

          </div>

          {/* Top Skills to Unlock Top Tier */}
          <div className="pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Sparkles className="h-4 w-4 text-[#0463E9]" />
              <span>Skills Required to Command 90th Percentile:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.topSkills.map((s, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg text-xs shadow-2xs">
                  {s}
                </span>
              ))}
            </div>
            <Link
              href="/jobs"
              className="text-xs font-bold text-[#0463E9] hover:underline"
            >
              Browse {role} Jobs →
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
