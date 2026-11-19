"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  Briefcase, FileText, Target, Zap, CheckCircle2, 
  Clock, ArrowRight, Sparkles, TrendingUp, Calendar, 
  MapPin, DollarSign, Bookmark, AlertCircle, Plus, 
  ChevronRight, ExternalLink, ShieldCheck, UserCheck, 
  Award, RefreshCw, Filter, Search, Bell, Home, 
  Settings, LogOut, ArrowLeft, MoreHorizontal, User,
  LayoutGrid, UploadCloud, ChevronDown, Check,
  BarChart3, MessageSquare, Video, ArrowUpRight
} from "lucide-react";

import InterviewPrepModal from "../../../components/home/InterviewPrepModal";
import CareerAdvisorModal from "../../../components/home/CareerAdvisorModal";
import { HireBridgeLogo } from "../../../components/shared/Navbar";

interface ApplicationItem {
  id: string;
  company: string;
  logoBg: string;
  role: string;
  location: string;
  appliedDate: string;
  status: "Interviewing" | "Assessment" | "Offer" | "Reviewing";
  salary: string;
  matchScore: number;
  nextStep: string;
}

const APPLICATIONS: ApplicationItem[] = [
  {
    id: "1",
    company: "Stripe",
    logoBg: "bg-[#635BFF]",
    role: "Senior Full-Stack Engineer",
    location: "Remote",
    appliedDate: "Yesterday",
    status: "Interviewing",
    salary: "$175,000",
    matchScore: 98,
    nextStep: "Round 3 System Design • Tomorrow 2:00 PM"
  },
  {
    id: "2",
    company: "Anthropic",
    logoBg: "bg-[#D97706]",
    role: "AI Prompt & Systems Lead",
    location: "San Francisco, CA (Hybrid)",
    appliedDate: "3 days ago",
    status: "Assessment",
    salary: "$190,000",
    matchScore: 96,
    nextStep: "Architecture Take-Home Due Friday"
  },
  {
    id: "3",
    company: "Datadog",
    logoBg: "bg-[#7C3AED]",
    role: "Cloud Systems Lead",
    location: "Austin, TX (Remote)",
    appliedDate: "1 week ago",
    status: "Offer",
    salary: "$165,000",
    matchScore: 92,
    nextStep: "Formal Written Offer • Reviewing Comp"
  },
  {
    id: "4",
    company: "Airbnb",
    logoBg: "bg-[#FF5A5F]",
    role: "Frontend Architect",
    location: "Remote",
    appliedDate: "5 days ago",
    status: "Reviewing",
    salary: "$168,000",
    matchScore: 94,
    nextStep: "Application under Recruiter Review"
  },
  {
    id: "5",
    company: "Figma",
    logoBg: "bg-[#0ACF83]",
    role: "Design Systems Engineer",
    location: "San Francisco, CA",
    appliedDate: "6 days ago",
    status: "Interviewing",
    salary: "$180,000",
    matchScore: 95,
    nextStep: "Screening with Engineering Manager"
  }
];

export default function SleekCandidateDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "pipeline" | "ats" | "interview">("overview");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [quickUploadSuccess, setQuickUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredApps = APPLICATIONS.filter(app => {
    const matchesFilter = filterStatus === "All" || app.status === filterStatus;
    const matchesSearch = searchQuery === "" || 
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: ApplicationItem["status"]) => {
    switch (status) {
      case "Offer":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/20";
      case "Interviewing":
        return "bg-blue-50 text-[#0463E9] border-blue-200 ring-1 ring-blue-500/20";
      case "Assessment":
        return "bg-purple-50 text-purple-700 border-purple-200 ring-1 ring-purple-500/20";
      case "Reviewing":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/20";
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText("https://meet.google.com/hbg-stripe-sysdesign");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleQuickUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQuickUploadSuccess(true);
      setTimeout(() => setQuickUploadSuccess(false), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex font-sans">
      
      {/* ======================================================== */}
      {/* 1. ULTRA-SLEEK CANDIDATE SIDEBAR                          */}
      {/* ======================================================== */}
      <aside className="w-64 bg-white border-r border-slate-200/80 flex-shrink-0 hidden lg:flex flex-col justify-between p-5 select-none sticky top-0 h-screen">
        <div className="space-y-6">
          
          {/* Brand Logo & Back to Portal */}
          <div>
            <Link href="/" className="px-2 block group">
              <HireBridgeLogo />
            </Link>
            <div className="mt-2 px-2 flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Candidate Command Center</span>
            </div>
          </div>

          {/* Nav Navigation */}
          <div className="space-y-1">
            <div className="px-2 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Workspace
            </div>

            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === "overview"
                  ? "bg-blue-50 text-[#0463E9] shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <LayoutGrid className="h-4 w-4" />
                <span>Overview</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-[#0463E9] font-bold">Live</span>
            </button>

            <button
              onClick={() => setActiveTab("pipeline")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === "pipeline"
                  ? "bg-blue-50 text-[#0463E9] shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Clock className="h-4 w-4" />
                <span>Applications</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">5</span>
            </button>

            <Link
              href="/jobs"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs transition-all"
            >
              <Briefcase className="h-4 w-4 text-slate-400" />
              <span>Browse Jobs</span>
            </Link>

            <Link
              href="/ats-checker"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs transition-all"
            >
              <span className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>ATS Scanner</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">94%</span>
            </Link>

            <Link
              href="/resume-builder"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs transition-all"
            >
              <FileText className="h-4 w-4 text-slate-400" />
              <span>Resume Maker</span>
            </Link>

            <Link
              href="/saved-jobs"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-bold text-xs transition-all"
            >
              <Bookmark className="h-4 w-4 text-slate-400" />
              <span>Saved Jobs</span>
            </Link>
          </div>

          {/* AI Tools Shortcuts */}
          <div className="space-y-1 pt-4 border-t border-slate-100">
            <div className="px-2 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              AI Career Copilot
            </div>
            
            <button
              onClick={() => setInterviewModalOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-[#0463E9] hover:bg-blue-50 font-bold text-xs transition-all text-left group"
            >
              <span className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-[#0463E9] group-hover:scale-110 transition-transform" />
                <span>AI Interview Simulator</span>
              </span>
              <span className="text-[9px] bg-blue-100 text-[#0463E9] font-bold px-1.5 py-0.5 rounded">NEW</span>
            </button>

            <button
              onClick={() => setAdvisorModalOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 font-bold text-xs transition-all text-left group"
            >
              <span className="flex items-center gap-2.5">
                <DollarSign className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Salary Benchmark 2026</span>
              </span>
              <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">AI</span>
            </button>
          </div>

        </div>

        {/* User Card at bottom of sidebar */}
        <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0463E9] to-blue-400 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
              AR
            </div>
            <div className="truncate">
              <h5 className="font-bold text-slate-900 text-xs truncate">Alex Rivera</h5>
              <p className="text-[10px] text-slate-400 truncate">Senior Full-Stack</p>
            </div>
          </div>
          <Link 
            href="/profile" 
            title="Account Settings" 
            className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-white transition-colors"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>

      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN APPLICATION WORKSPACE                             */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0463E9] transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-50 border border-slate-200/60"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to HireBridge Home
            </Link>
            
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span>/</span>
              <span className="text-slate-900 font-bold">Alex Rivera</span>
              <span>/</span>
              <span className="text-[#0463E9] font-bold capitalize">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Quick Search Bar */}
            <div className="relative hidden md:block w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, roles, companies..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:border-[#0463E9] outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative border border-slate-200/60"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#0463E9] ring-2 ring-white" />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 text-xs space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-slate-900">Notifications</span>
                    <span className="text-[10px] font-bold text-[#0463E9] bg-blue-50 px-2 py-0.5 rounded-full">3 New</span>
                  </div>
                  
                  <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-slate-700 leading-tight space-y-1">
                    <div className="flex items-center justify-between font-bold text-[#0463E9]">
                      <span>Stripe Recruiter View</span>
                      <span className="text-[9px] text-slate-400">1h ago</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Technical recruiter Elena M. viewed your ATS Verified Profile & GitHub projects.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-slate-700 leading-tight space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-700">
                      <span>Interview Tomorrow</span>
                      <span className="text-[9px] text-slate-400">Tomorrow 2 PM</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Round 3: Distributed Micro-frontends with Stripe Staff Architect.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Nav Links */}
            <div className="lg:hidden flex items-center gap-1">
              <Link href="/jobs" className="p-2 text-slate-600 hover:text-[#0463E9]">
                <Briefcase className="h-4 w-4" />
              </Link>
              <Link href="/ats-checker" className="p-2 text-slate-600 hover:text-[#0463E9]">
                <ShieldCheck className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </header>

        {/* Dashboard Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 space-y-7 overflow-y-auto max-w-7xl w-full mx-auto">
          
          {/* Executive Greeting Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-[#0463E9] to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-500/15 relative overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute right-40 -top-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white/95">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Candidate Status: Actively Interviewing</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Welcome back, Alex Rivera 👋
                </h1>
                
                <p className="text-sm text-blue-100 font-medium leading-relaxed">
                  You have <strong className="text-white underline">1 interview tomorrow with Stripe</strong> and <strong className="text-white underline">1 pending offer from Datadog</strong>. Your ATS resume score is currently in the <strong className="text-emerald-300">top 5%</strong> of applicants.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setInterviewModalOpen(true)}
                  className="px-5 py-2.5 bg-white text-[#0463E9] hover:bg-blue-50 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="h-4 w-4" /> Practice Interview AI
                </button>
                <Link
                  href="/ats-checker"
                  className="px-5 py-2.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <ShieldCheck className="h-4 w-4" /> Scan New Resume
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Interactive Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: ATS Resume Score with Circular SVG Progress Ring */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  ATS Resume Health
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">
                  94<span className="text-lg font-bold text-slate-400">/100</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold mt-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> High enterprise pass
                </div>
              </div>

              {/* Circular SVG Gauge */}
              <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
                <svg className="w-16 h-16 -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="stroke-slate-100"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="stroke-emerald-500 transition-all duration-1000 ease-out"
                    strokeWidth="5"
                    strokeDasharray={163.3}
                    strokeDashoffset={163.3 * (1 - 0.94)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-xs font-extrabold text-slate-800">94%</span>
              </div>
            </div>

            {/* Card 2: Active Pipeline */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Pipeline</span>
                <span className="text-[10px] font-bold text-[#0463E9] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  5 Tracked
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">14</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-[25%]" title="Offer" />
                <div className="bg-[#0463E9] h-full w-[45%]" title="Interviewing" />
                <div className="bg-purple-500 h-full w-[15%]" title="Assessment" />
                <div className="bg-amber-400 h-full w-[15%]" title="Reviewing" />
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center justify-between">
                <span>1 Offer • 2 Final Rounds</span>
                <span className="font-bold text-emerald-600">Hot 🔥</span>
              </p>
            </div>

            {/* Card 3: Profile Visibility */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recruiter Views</span>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                  +34% this week
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">128</div>
              <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                Viewed by Stripe, Anthropic, Datadog
              </p>
            </div>

            {/* Card 4: Target Compensation */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Benchmark</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  Verified
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">$175k<span className="text-sm font-semibold text-slate-400">/yr</span></div>
              <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                <span>94th percentile for Senior Full-Stack</span>
              </p>
            </div>

          </div>

          {/* Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            
            {/* Left 7 Columns: Active Applications Pipeline & Tomorrow's Interview */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Upcoming Stripe Interview Card */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0463E9] flex items-center justify-center font-bold">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Next Scheduled Interview</h3>
                      <p className="text-xs text-slate-500">Tomorrow at 2:00 PM EST • Round 3</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0463E9] border border-blue-200 text-xs font-bold self-start sm:self-auto">
                    Stripe • Senior Full-Stack
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">
                      System Design: Distributed Micro-frontend Architecture
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">60 Mins</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Panel: Staff Infrastructure Architect & Engineering Director. Core topics: Cache invalidation, Next.js Edge SSR performance, and resilient API gateways.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setInterviewModalOpen(true)}
                    className="flex-1 min-w-[200px] py-2.5 bg-[#0463E9] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/15"
                  >
                    <Sparkles className="h-4 w-4" /> Practice Stripe Technical Questions
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied Meet Link!
                      </>
                    ) : (
                      <>
                        <Video className="h-3.5 w-3.5" /> Copy Meeting Room
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Applications Pipeline List */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base">Active Job Applications</h3>
                    <p className="text-xs text-slate-500">Live stages across your active submissions</p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap gap-1 bg-slate-100/80 p-1 rounded-xl">
                    {["All", "Interviewing", "Assessment", "Offer", "Reviewing"].map((st) => (
                      <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          filterStatus === st 
                            ? "bg-white text-[#0463E9] shadow-2xs" 
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Applications Table */}
                <div className="space-y-3">
                  {filteredApps.map((app) => (
                    <div 
                      key={app.id}
                      className="p-4 rounded-2xl border border-slate-200/70 hover:border-[#0463E9] bg-white hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-11 h-11 rounded-2xl ${app.logoBg} text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                          {app.company[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#0463E9] transition-colors leading-tight">
                              {app.role}
                            </h4>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {app.matchScore}% Match
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span className="font-bold text-slate-800">{app.company}</span>
                            <span>•</span>
                            <span>{app.location}</span>
                            <span>•</span>
                            <span className="font-extrabold text-slate-900">{app.salary}</span>
                          </div>
                          
                          <div className="text-[11px] text-[#0463E9] font-medium mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {app.nextStep}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 justify-between sm:justify-end self-end sm:self-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}

                  {filteredApps.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No applications match the selected filter.
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Showing {filteredApps.length} active roles</span>
                  <Link href="/jobs" className="font-bold text-[#0463E9] hover:underline flex items-center gap-1">
                    Apply for More Roles <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>

            </div>

            {/* Right 5 Columns: Resume Health, Drag-Drop Uploader & Top Matched Roles */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Active ATS Resume Diagnostic Card */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#0463E9]" /> Active ATS Resume
                  </h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    94% Verified
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                      Alex_Rivera_Senior_FullStack.pdf
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Updated 2d ago</span>
                  </div>
                  
                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["React 18", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker", "System Design"].map((k) => (
                      <span key={k} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Instant Drag-and-Drop Resume Re-audit */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-[#0463E9] rounded-2xl p-4 text-center cursor-pointer transition-colors group bg-slate-50/50 hover:bg-blue-50/20"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleQuickUpload} 
                    accept=".pdf,.docx,.txt" 
                    className="hidden" 
                  />
                  <UploadCloud className="h-6 w-6 text-slate-400 group-hover:text-[#0463E9] mx-auto mb-1 transition-colors" />
                  <p className="text-xs font-bold text-slate-700 group-hover:text-[#0463E9]">
                    Drop updated resume here to re-scan
                  </p>
                  <p className="text-[10px] text-slate-400">PDF, DOCX up to 10MB</p>
                </div>

                {quickUploadSuccess && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span>Resume uploaded! ATS score re-computed to 96%.</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link
                    href="/ats-checker"
                    className="flex-1 text-center py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0463E9] border border-blue-200 rounded-xl text-xs font-bold transition-colors"
                  >
                    View Full Audit
                  </Link>
                  <Link
                    href="/resume-builder"
                    className="flex-1 text-center py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    Edit Resume Maker
                  </Link>
                </div>
              </div>

              {/* Top AI Matched Jobs Card */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#0463E9]" /> Top Matched Roles
                    </h4>
                    <p className="text-[11px] text-slate-500">Based on your skills & salary range</p>
                  </div>
                  <Link href="/jobs" className="text-xs font-bold text-[#0463E9] hover:underline flex items-center gap-0.5">
                    View All →
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {[
                    { company: "Anthropic", title: "AI Prompt & Systems Engineer", match: 96, salary: "$190,000", tag: "Hot" },
                    { company: "Stripe", title: "Senior Full-Stack Engineer", match: 98, salary: "$175,000", tag: "Urgent" },
                    { company: "Datadog", title: "Cloud Systems Lead", match: 92, salary: "$160,000", tag: "New" }
                  ].map((job, i) => (
                    <div key={i} className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-[#0463E9] transition-all flex items-center justify-between gap-3 group">
                      <div>
                        <h5 className="font-bold text-slate-900 text-xs group-hover:text-[#0463E9] transition-colors">
                          {job.title}
                        </h5>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span className="font-semibold text-slate-800">{job.company}</span>
                          <span>•</span>
                          <span className="font-bold text-slate-900">{job.salary}</span>
                        </div>
                      </div>
                      
                      <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex-shrink-0">
                        {job.match}% Match
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/jobs"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm block text-center"
                >
                  Explore 10,000+ Verified Jobs <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* Interactive AI Modals */}
      <InterviewPrepModal 
        isOpen={interviewModalOpen} 
        onClose={() => setInterviewModalOpen(false)} 
      />
      <CareerAdvisorModal 
        isOpen={advisorModalOpen} 
        onClose={() => setAdvisorModalOpen(false)} 
      />

    </div>
  );
}
