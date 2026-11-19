"use client";

import React, { useState } from "react";
import { X, TrendingUp, DollarSign, Target, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface CareerAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CAREER_TRACKS = [
  {
    role: "Full-Stack Engineer",
    level: "Mid to Senior",
    salary: "$130,000 - $185,000",
    growth: "+22% YoY Demand",
    topSkills: ["TypeScript", "Next.js / React", "Node.js / Express", "PostgreSQL", "Docker / AWS"],
    recommendedCourses: "Modern Microservices with Docker & Kubernetes",
    nextLevel: "Staff Software Engineer / Engineering Manager"
  },
  {
    role: "AI & Machine Learning Engineer",
    level: "Senior",
    salary: "$165,000 - $240,000",
    growth: "+48% YoY Demand",
    topSkills: ["Python / PyTorch", "LLM Fine-tuning", "RAG Systems", "Vector Databases (Pinecone)", "LangChain"],
    recommendedCourses: "Production Large Language Model Architecture",
    nextLevel: "Principal AI Architect / Head of AI Research"
  },
  {
    role: "Frontend Architect",
    level: "Lead",
    salary: "$145,000 - $205,000",
    growth: "+19% YoY Demand",
    topSkills: ["Design Systems", "Web Vitals & Performance", "React Architecture", "GraphQL", "CI/CD"],
    recommendedCourses: "Enterprise Design Systems & Micro-frontends",
    nextLevel: "Director of Product Engineering"
  },
  {
    role: "Cloud & DevOps Specialist",
    level: "Mid to Senior",
    salary: "$140,000 - $195,000",
    growth: "+28% YoY Demand",
    topSkills: ["Kubernetes", "Terraform / IaC", "AWS / GCP", "CI/CD Pipelines", "Observability (Datadog)"],
    recommendedCourses: "Multi-Cloud Reliability Engineering & SRE",
    nextLevel: "Head of Infrastructure / VP of Platform"
  }
];

export default function CareerAdvisorModal({ isOpen, onClose }: CareerAdvisorModalProps) {
  const [selectedTrack, setSelectedTrack] = useState(0);

  if (!isOpen) return null;

  const current = CAREER_TRACKS[selectedTrack];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0463E9] flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">HireBridge AI Career Advisor</h3>
              <p className="text-xs text-slate-500">Benchmark salaries, growth trends, and required skill roadmaps</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Role Tabs */}
          <div className="flex flex-wrap gap-2">
            {CAREER_TRACKS.map((track, i) => (
              <button
                key={i}
                onClick={() => setSelectedTrack(i)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                  selectedTrack === i
                    ? "bg-[#0463E9] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {track.role}
              </button>
            ))}
          </div>

          {/* Salary & Metrics Banner */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100/80 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5" /> Market Salary Benchmark
              </span>
              <p className="text-xl font-extrabold text-emerald-950 font-mono">
                {current.salary}
              </p>
              <p className="text-[11px] text-emerald-700 font-medium">Based on 2026 tech hiring data</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100/80 space-y-1">
              <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> Industry Growth
              </span>
              <p className="text-xl font-extrabold text-blue-950 font-mono">
                {current.growth}
              </p>
              <p className="text-[11px] text-blue-700 font-medium">High hiring velocity</p>
            </div>
          </div>

          {/* Skills Roadmap */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="h-4 w-4 text-[#0463E9]" /> Top In-Demand Skills for This Track
            </h4>
            <div className="flex flex-wrap gap-2">
              {current.topSkills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="px-3 py-1 bg-slate-100 border border-slate-200/80 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#0463E9]" /> {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Career Path Stepper */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Award className="h-4 w-4 text-amber-500" /> Next Career Progression
            </div>
            <p className="text-xs text-slate-600">
              Achieving mastery in this track typically unlocks promotions into:{" "}
              <strong className="text-slate-900 font-bold">{current.nextLevel}</strong>.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <Link
            href="/jobs"
            onClick={onClose}
            className="text-xs font-bold text-[#0463E9] hover:underline flex items-center gap-1"
          >
            Find {current.role} Jobs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0463E9] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            Close Advisor
          </button>
        </div>

      </div>
    </div>
  );
}
