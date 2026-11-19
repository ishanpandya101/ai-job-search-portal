"use client";

import React from "react";
import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";

const COMPANIES = [
  { name: "Google", roles: "142 open jobs", tag: "Tech Giant" },
  { name: "Microsoft", roles: "98 open jobs", tag: "Cloud & AI" },
  { name: "Amazon", roles: "215 open jobs", tag: "E-Commerce" },
  { name: "Meta", roles: "87 open jobs", tag: "AI Research" },
  { name: "Stripe", roles: "45 open jobs", tag: "Fintech" },
  { name: "Airbnb", roles: "38 open jobs", tag: "Travel Tech" }
];

export default function HiringCompanies() {
  return (
    <div className="py-12 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        
        <div className="text-center max-w-xl mx-auto space-y-1">
          <p className="text-xs font-bold text-[#0463E9] uppercase tracking-wider">
            Verified Employer Network
          </p>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Top Companies Hiring Actively on HireBridge
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {COMPANIES.map((company, idx) => (
            <Link
              key={idx}
              href="/jobs"
              className="bg-white border border-slate-200/80 rounded-xl p-4 text-center hover:border-[#0463E9] hover:shadow-md transition-all duration-200 group flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-sm mb-2 group-hover:scale-110 transition-transform">
                {company.name[0]}
              </div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0463E9] transition-colors">
                {company.name}
              </h4>
              <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                {company.roles}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
