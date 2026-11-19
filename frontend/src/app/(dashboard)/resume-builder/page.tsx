"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/shared/Navbar";
import { aiService } from "../../../services/api/aiService";
import { 
  Sparkles, Download, User, Briefcase, LayoutTemplate, 
  Settings, ChevronDown, CheckCircle2, GripVertical, Plus,
  ZoomIn, ZoomOut, RefreshCw, AlertCircle
} from "lucide-react";

interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  date: string;
  location: string;
  bullets: string[];
}

export default function ResumeBuilderPro() {
  const [title, setTitle] = useState<string>("Untitled Resume");
  const [firstName, setFirstName] = useState<string>("John");
  const [lastName, setLastName] = useState<string>("Doe");
  const [profTitle, setProfTitle] = useState<string>("Senior Product Designer");
  const [skills, setSkills] = useState<string>("UI/UX Design, Figma, Design Systems, React.js");
  const [summary, setSummary] = useState<string>(
    "Award-winning Product Designer with 6+ years of experience transforming complex problems into elegant, user-centric solutions. Proven track record in scaling design systems and leading cross-functional teams to deliver enterprise-grade applications."
  );
  const [email, setEmail] = useState<string>("john.doe@example.com");
  const [phone, setPhone] = useState<string>("+1 (555) 123-4567");
  const [location, setLocation] = useState<string>("San Francisco, CA");
  const [linkedin, setLinkedin] = useState<string>("linkedin.com/in/johndoe");

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      jobTitle: "Senior Product Designer",
      company: "Google",
      date: "Jan 2021 - Present",
      location: "San Francisco, CA",
      bullets: [
        "Spearheaded the redesign of the core enterprise dashboard, increasing daily active user engagement by 45%.",
        "Established and scaled a unified design system adopted by 12 cross-functional engineering teams.",
        "Mentored 4 junior designers and facilitated weekly UI/UX critique sessions."
      ]
    }
  ]);

  const [loadingSummary, setLoadingSummary] = useState<boolean>(false);
  const [loadingBulletsId, setLoadingBulletsId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // AI Summary Auto-Write
  const handleAutoWriteSummary = async () => {
    if (!profTitle.trim()) {
      setError("Please fill in your Professional Title first.");
      return;
    }
    console.log("[HireNova AI Builder] Requesting professional summary via centralized service...");
    
    setLoadingSummary(true);
    setError(null);
    try {
      const data = await aiService.generateSummary(profTitle, skills);
      
      console.log("[HireNova AI Builder] Received summary response:", data);

      if (data?.summary) {
        setSummary(data.summary);
      }
    } catch (err: any) {
      console.error("[HireNova AI Builder] Summary Error:", err);
      setError("AI Summary generation failed. Verify backend connections.");
    } finally {
      setLoadingSummary(false);
    }
  };

  // AI Experience Bullets Generator
  const handleGenerateBullets = async (expId: number, jobTitle: string, company: string) => {
    if (!jobTitle.trim() || !company.trim()) {
      setError("Please fill in both Job Title and Company to generate achievements.");
      return;
    }
    console.log("[HireNova AI Builder] Requesting experience bullets via centralized service...");

    setLoadingBulletsId(expId);
    setError(null);
    try {
      const data = await aiService.generateBullets(jobTitle, company);
      
      console.log("[HireNova AI Builder] Received bullets response:", data);

      if (data?.bullets) {
        setExperiences(prev => prev.map(exp => {
          if (exp.id === expId) {
            return { ...exp, bullets: data.bullets };
          }
          return exp;
        }));
      }
    } catch (err: any) {
      console.error("[HireNova AI Builder] Bullets Error:", err);
      setError("AI bullet generation failed. Fallback default bullets loaded.");
    } finally {
      setLoadingBulletsId(null);
    }
  };

  const handleAddExperience = () => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
    setExperiences(prev => [
      ...prev,
      {
        id: newId,
        jobTitle: "Software Engineer",
        company: "AI Job Portal Technologies",
        date: "Jun 2024 - Present",
        location: "New York, NY",
        bullets: [
          "Developed high-velocity microservices using Spring Boot and connected to Gemini API portals.",
          "Refactored front-end modules with Next.js and pure CSS layouts in record compile speeds.",
          "Reduced code-redundancy in layout components by 30%."
        ]
      }
    ]);
  };

  const handleUpdateExp = (id: number, field: keyof Experience, value: any) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  };

  const handleUpdateBullet = (expId: number, bulletIdx: number, value: string) => {
    setExperiences(prev => prev.map(exp => {
      if (exp.id === expId) {
        const newBullets = [...exp.bullets];
        newBullets[bulletIdx] = value;
        return { ...exp, bullets: newBullets };
      }
      return exp;
    }));
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="h-screen bg-[#FAFAFC] flex flex-col font-sans overflow-hidden text-slate-800 relative">
      <Navbar />

      <main className="flex-1 flex w-full overflow-hidden relative z-10">
        
        {/* ========================================== */}
        {/* LEFT PANEL: SMART EDITOR                  */}
        {/* ========================================== */}
        <div className="w-full lg:w-[45%] xl:w-[40%] bg-white border-r border-slate-200 flex flex-col h-full z-10 shadow-sm">
          
          {/* Editor Header & Score */}
          <div className="p-6 border-b border-slate-100 bg-white">
            <div className="flex items-center justify-between mb-4">
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="text-base font-extrabold text-slate-900 border-none outline-none focus:bg-slate-50 rounded px-2 py-1 font-sans tracking-tight"
              />
              <button className="text-slate-400 hover:text-slate-650 transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
            
            {/* Resume Score Bar */}
            <div className="bg-[#FAFAFC] p-4 rounded-2xl border border-slate-200/60 flex items-center gap-4 shadow-sm">
              <div className="relative h-11 w-11 flex items-center justify-center rounded-full border-4 border-slate-950 border-r-slate-200">
                <span className="text-[10px] font-bold text-slate-800">80%</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  Resume ATS Strength <CheckCircle2 className="h-3.5 w-3.5 text-slate-950" />
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">Gemini dynamic generation active</p>
              </div>
            </div>

            {error && (
              <div className="mt-3 bg-rose-500/5 border border-rose-500/10 text-rose-600 p-3 rounded-xl text-xs flex gap-2 items-center leading-relaxed">
                <AlertCircle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Form Sections */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            
            {/* PERSONAL INFO CARD */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-[#FAFAFC] px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-slate-200/80 p-2 rounded-xl text-slate-800 shadow-sm"><User className="h-4 w-4" /></div>
                  <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">1. Personal Info</h2>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
              
              <div className="p-5 grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">First Name</label>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAFC] border border-slate-200/80 rounded-xl focus:bg-white focus:ring-1 focus:ring-slate-900 outline-none text-xs" />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Last Name</label>
                  <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAFC] border border-slate-200/80 rounded-xl focus:bg-white focus:ring-1 focus:ring-slate-900 outline-none text-xs" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Professional Title</label>
                  <input type="text" value={profTitle} onChange={(e) => setProfTitle(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAFC] border border-slate-200/80 rounded-xl focus:bg-white focus:ring-1 focus:ring-slate-900 outline-none text-xs" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Tech Skills (comma separated)</label>
                  <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAFC] border border-slate-200/80 rounded-xl focus:bg-white focus:ring-1 focus:ring-slate-900 outline-none text-xs" placeholder="React, Node, Java, etc." />
                </div>
                <div className="col-span-2 relative">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Professional Summary</label>
                    <button 
                      onClick={handleAutoWriteSummary}
                      disabled={loadingSummary}
                      className="flex items-center gap-1.5 text-[9px] font-bold text-slate-800 bg-[#FAFAFC] border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 hover:border-slate-350 transition-all shadow-sm"
                    >
                      {loadingSummary ? (
                        <>
                          <RefreshCw className="h-3 w-3 animate-spin" />
                          <span>Writing...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3" />
                          <span>AI Summary</span>
                        </>
                      )}
                    </button>
                  </div>
                  <textarea rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAFC] border border-slate-200/80 rounded-xl focus:bg-white focus:ring-1 focus:ring-slate-900 outline-none text-xs resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* EXPERIENCE CARD */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="bg-[#FAFAFC] px-5 py-4 border-b border-slate-200 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="bg-white border border-slate-200/80 p-2 rounded-xl text-slate-800 shadow-sm"><Briefcase className="h-4 w-4" /></div>
                  <h2 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">2. Experience Profile</h2>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
              
              <div className="p-5 space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="group relative border border-slate-200 rounded-2xl p-4 bg-[#FAFAFC]/50 hover:bg-white transition-all shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Job Title</label>
                        <input type="text" value={exp.jobTitle} onChange={(e) => handleUpdateExp(exp.id, "jobTitle", e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-xs text-slate-850" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Company</label>
                        <input type="text" value={exp.company} onChange={(e) => handleUpdateExp(exp.id, "company", e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date</label>
                        <input type="text" value={exp.date} onChange={(e) => handleUpdateExp(exp.id, "date", e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-500" />
                      </div>
                      
                      {/* Bullet point fields */}
                      <div className="col-span-2 space-y-2 mt-2">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Experience Bullet Points</label>
                        {exp.bullets.map((bullet, idx) => (
                          <input 
                            key={idx} 
                            type="text" 
                            value={bullet} 
                            onChange={(e) => handleUpdateBullet(exp.id, idx, e.target.value)} 
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-650"
                          />
                        ))}
                      </div>

                      <div className="col-span-2 mt-2">
                        <button 
                          onClick={() => handleGenerateBullets(exp.id, exp.jobTitle, exp.company)}
                          disabled={loadingBulletsId === exp.id}
                          className="w-full py-2.5 border border-slate-250 bg-white hover:bg-slate-50 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                        >
                          {loadingBulletsId === exp.id ? (
                            <>
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              <span>AI Generating bullet points...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-3.5 w-3.5 text-slate-950" />
                              <span>AI achievement bullet points</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={handleAddExperience}
                  className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <Plus className="h-4 w-4 bg-slate-100 rounded-full p-0.5" /> Add Employment Entry
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT PANEL: LIVE PREVIEW & TOOLBAR        */}
        {/* ========================================== */}
        <div className="hidden lg:flex flex-1 bg-slate-50 flex-col h-full relative">
          
          {/* Toolbar */}
          <div className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-10 shadow-sm">
            <div className="flex items-center gap-2 bg-[#FAFAFC] rounded-full p-1 border border-slate-200">
              <button className="p-1.5 text-slate-400 hover:bg-white hover:shadow-sm rounded-full transition-all"><ZoomOut className="h-4 w-4" /></button>
              <span className="text-[10px] font-bold text-slate-500 px-2 font-mono">100%</span>
              <button className="p-1.5 text-slate-400 hover:bg-white hover:shadow-sm rounded-full transition-all"><ZoomIn className="h-4 w-4" /></button>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-xs font-bold text-slate-700 flex items-center gap-2 hover:bg-[#FAFAFC] transition-all">
                <LayoutTemplate className="h-3.5 w-3.5 text-slate-400" /> Apple Classic <ChevronDown className="h-3 w-3 ml-1" />
              </button>
              <button 
                onClick={handleExportPDF}
                className="px-5 py-2.5 bg-slate-950 text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:bg-slate-850 text-xs font-bold flex items-center gap-2 transition-all"
              >
                <Download className="h-3.5 w-3.5" /> Print / Export PDF
              </button>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 overflow-y-auto p-8 flex justify-center pb-24 items-start scrollbar-hide">
            
            {/* The A4 Paper Document */}
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-200/60 p-12 transition-all font-serif leading-relaxed text-slate-900 printable-resume">
              
              {/* Luxury Header */}
              <div className="border-b-[1.5px] border-slate-900 pb-5 mb-5 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-2 font-sans">{firstName} {lastName}</h1>
                  <p className="text-sm text-slate-500 tracking-wide font-sans font-medium">{profTitle}</p>
                </div>
                <div className="text-right text-[11px] text-slate-500 space-y-1 font-sans font-medium">
                  <p>{email}</p>
                  <p>{phone}</p>
                  <p>{location}</p>
                  <p className="text-slate-900 font-bold">{linkedin}</p>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <p className="text-[13px] text-slate-700 leading-relaxed text-justify font-sans">
                  {summary}
                </p>
              </div>

              {/* Skills Area */}
              <div className="mb-6">
                <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-3 font-sans">Skills</h3>
                <p className="text-[12.5px] text-slate-700 font-sans font-medium leading-relaxed">
                  {skills}
                </p>
              </div>

              {/* Work Experience */}
              <div className="mb-6">
                <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1.5 mb-4 font-sans">Experience</h3>
                
                {experiences.map((exp) => (
                  <div key={exp.id} className="mb-6 font-sans">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-[13px] font-extrabold text-slate-900">{exp.jobTitle}</h4>
                      <span className="text-[11px] font-bold text-slate-400">{exp.date}</span>
                    </div>
                    <p className="text-[12px] text-slate-500 font-semibold mb-2">{exp.company} • {exp.location}</p>
                    <ul className="list-outside ml-4 list-disc text-[12px] text-slate-650 space-y-1.5">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="pl-1 leading-relaxed text-justify">{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}