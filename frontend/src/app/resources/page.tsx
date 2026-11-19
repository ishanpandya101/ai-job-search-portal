"use client";

import Navbar from "../../components/shared/Navbar";
import { FileText, PlayCircle, ArrowRight, Code2, Cloud } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-20 lg:py-24">
        
        {/* Flat Minimalist Header */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            Resources & Guides
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Expert insights, resume templates, and technical cheat sheets to help you navigate your career and land your next role.
          </p>
        </div>

        {/* Featured Section - Premium White Mode Style */}
        <div className="bg-slate-50 rounded-2xl overflow-hidden mb-16 flex flex-col md:flex-row items-stretch border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
          <div className="p-10 md:p-12 md:w-3/5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span> Featured Guide
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 leading-snug">
              Cracking the MERN Stack Interview in 2026
            </h2>
            <p className="text-slate-600 mb-8 font-semibold leading-relaxed text-sm">
              A comprehensive deep-dive into modern React.js, Express.js architecture, and system design patterns for full-stack developer roles.
            </p>
            <button className="self-start px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
              Read Guide <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="hidden md:flex md:w-2/5 bg-slate-100/40 border-l border-slate-200/80 items-center justify-center p-12">
            <Code2 className="w-24 h-24 text-slate-400" strokeWidth={1} />
          </div>
        </div>

        {/* Grid of Categories - 1px borders, subtle hover state */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Resume */}
          <div className="group bg-slate-50 border border-slate-200 p-8 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer flex flex-col">
            <div className="mb-6">
              <FileText className="h-8 w-8 text-slate-700" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Resume Templates</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">
              Minimalist, ATS-friendly templates designed to parse perfectly in modern tracking systems.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-3 transition-all">
              Download <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Card 2: Certifications */}
          <div className="group bg-slate-50 border border-slate-200 p-8 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer flex flex-col">
            <div className="mb-6">
              <Cloud className="h-8 w-8 text-slate-700" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Cloud Certifications</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">
              Study blueprints and preparation strategies for Microsoft AZ-204 and AWS Developer exams.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-3 transition-all">
              Explore <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Card 3: Interviews */}
          <div className="group bg-slate-50 border border-slate-200 p-8 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer flex flex-col">
            <div className="mb-6">
              <PlayCircle className="h-8 w-8 text-slate-700" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Mock Interviews</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">
              Watch recorded technical and behavioral interviews to understand what recruiters really look for.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-3 transition-all">
              Watch Now <ArrowRight className="h-4 w-4" />
            </div>
          </div>

        </div>

        {/* Minimal Newsletter Section */}
        <div className="mt-16 pt-16 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Get new resources weekly</h3>
            <p className="text-sm text-slate-500 font-medium">No spam. Just high-quality tech guides and career advice.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:outline-none focus:border-slate-900 w-full md:w-64"
            />
            <button className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}