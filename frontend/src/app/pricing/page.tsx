"use client";

import { useState } from "react";
import Navbar from "../../components/shared/Navbar";
import { Check } from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-24">
        
        {/* Utilitarian Header - No marketing buzzwords, just plain truth */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900">
              Simple pricing.
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Start for free. Upgrade when you need advanced ATS tools and AI matching.
            </p>
          </div>
          
          {/* Functional Flat Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1.5 rounded-xl">
            <button 
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${!isAnnual ? 'bg-white shadow-sm border border-slate-200/50 text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isAnnual ? 'bg-white shadow-sm border border-slate-200/50 text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Yearly <span className="text-[10px] bg-slate-900 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Flat Grid Pricing - 1px Borders, No Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
          
          {/* Free Tier */}
          <div className="bg-white p-10 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Basic</h3>
            <p className="text-sm text-slate-500 mb-10 h-10 font-medium">Essential features for building a standard resume.</p>
            
            <div className="mb-10">
              <span className="text-5xl font-extrabold tracking-tight">$0</span>
            </div>
            
            <button className="w-full py-3.5 px-4 bg-white border-2 border-slate-200 text-slate-900 rounded-xl text-sm font-bold hover:border-slate-900 transition-colors mb-10">
              Create Free Account
            </button>
            
            <div className="space-y-4 flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Included</p>
              {[
                '1 Standard Template',
                'Basic Job Search Filters',
                'TXT & Basic PDF Export',
                'Community Support'
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-slate-900 shrink-0" strokeWidth={2.5} />
                  <span className="text-[15px] text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tier */}
          <div className="bg-slate-50 p-10 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold">Pro</h3>
              <span className="text-[11px] font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md uppercase tracking-wider">Recommended</span>
            </div>
            <p className="text-sm text-slate-500 mb-10 h-10 font-medium">Advanced AI matching and unlimited ATS optimization.</p>
            
            <div className="mb-10 flex items-end gap-1">
              <span className="text-5xl font-extrabold tracking-tight">${isAnnual ? '12' : '15'}</span>
              <span className="text-sm text-slate-500 font-bold mb-1.5">/ mo</span>
            </div>
            
            <button className="w-full py-3.5 px-4 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-sm transition-colors mb-10">
              Upgrade to Pro
            </button>
            
            <div className="space-y-4 flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Everything in Basic, plus</p>
              {[
                'Unlimited Premium Templates',
                'Advanced AI Match Scores',
                'Unlimited ATS Scans',
                'Cover Letter Generation',
                'Priority Email Support'
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-blue-600 shrink-0" strokeWidth={3} />
                  <span className="text-[15px] text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        {/* Simple Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm font-medium text-slate-500">
            Need a custom plan for your team? <a href="#" className="text-blue-600 hover:underline">Contact Sales</a>
          </p>
        </div>

      </main>
    </div>
  );
}