"use client";

import Navbar from "../../components/shared/Navbar";
import { 
  Briefcase, Clock, CheckCircle2, XCircle, 
  Search, Filter, Building2, MoreHorizontal, Calendar, 
  ArrowRight, ExternalLink
} from "lucide-react";

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Application Tracker</h1>
            <p className="text-sm text-slate-500 mt-1">Manage and track all your job applications in one place.</p>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Add Application Manually
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Total Applied</p>
              <h3 className="text-2xl font-extrabold text-slate-900">24</h3>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Interviewing</p>
              <h3 className="text-2xl font-extrabold text-slate-900">3</h3>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Offers</p>
              <h3 className="text-2xl font-extrabold text-slate-900">1</h3>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
              <XCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Rejected</p>
              <h3 className="text-2xl font-extrabold text-slate-900">5</h3>
            </div>
          </div>

        </div>

        {/* Toolbar (Search & Filter) */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center px-3 bg-slate-50 rounded-lg border border-slate-100 focus-within:border-blue-300 focus-within:bg-white transition-colors">
            <Search className="h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by company or role..." 
              className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium px-3 py-2.5 outline-none text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" /> Status: All
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 bg-slate-50/50 text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            <div className="col-span-5 md:col-span-4">Company & Role</div>
            <div className="col-span-3 hidden md:block">Date Applied</div>
            <div className="col-span-4 md:col-span-3">Status</div>
            <div className="col-span-3 md:col-span-2 text-right">Actions</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-slate-100">
            
            {/* Item 1 - Interviewing */}
            <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors group">
              <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Full Stack Developer</h4>
                  <p className="text-[13px] font-medium text-slate-500 mt-0.5">TechNova Global</p>
                </div>
              </div>
              <div className="col-span-3 hidden md:flex items-center gap-2 text-sm text-slate-600 font-medium">
                <Calendar className="h-4 w-4 text-slate-400" /> May 28, 2026
              </div>
              <div className="col-span-4 md:col-span-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse"></span> Interviewing
                </span>
              </div>
              <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2">
                <button className="text-slate-400 hover:text-blue-600 transition-colors p-2"><ExternalLink className="h-4 w-4" /></button>
                <button className="text-slate-400 hover:text-slate-900 transition-colors p-2"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Item 2 - Applied */}
            <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors group">
              <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Senior MERN Engineer</h4>
                  <p className="text-[13px] font-medium text-slate-500 mt-0.5">CloudScale Inc.</p>
                </div>
              </div>
              <div className="col-span-3 hidden md:flex items-center gap-2 text-sm text-slate-600 font-medium">
                <Calendar className="h-4 w-4 text-slate-400" /> May 30, 2026
              </div>
              <div className="col-span-4 md:col-span-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> Applied
                </span>
              </div>
              <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2">
                <button className="text-slate-400 hover:text-blue-600 transition-colors p-2"><ExternalLink className="h-4 w-4" /></button>
                <button className="text-slate-400 hover:text-slate-900 transition-colors p-2"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Item 3 - Offer */}
            <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors group">
              <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Frontend Architect (Next.js)</h4>
                  <p className="text-[13px] font-medium text-slate-500 mt-0.5">InnovateTech</p>
                </div>
              </div>
              <div className="col-span-3 hidden md:flex items-center gap-2 text-sm text-slate-600 font-medium">
                <Calendar className="h-4 w-4 text-slate-400" /> May 15, 2026
              </div>
              <div className="col-span-4 md:col-span-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Offer Received
                </span>
              </div>
              <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2">
                <button className="text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center gap-1 transition-colors pr-2">
                  View <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Item 4 - Rejected */}
            <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors group">
              <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">Software Engineer</h4>
                  <p className="text-[13px] font-medium text-slate-500 mt-0.5">Global Systems</p>
                </div>
              </div>
              <div className="col-span-3 hidden md:flex items-center gap-2 text-sm text-slate-600 font-medium">
                <Calendar className="h-4 w-4 text-slate-400" /> May 02, 2026
              </div>
              <div className="col-span-4 md:col-span-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                  <XCircle className="h-3.5 w-3.5" /> Not Selected
                </span>
              </div>
              <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2">
                <button className="text-slate-400 hover:text-slate-900 transition-colors p-2"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}