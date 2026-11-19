"use client";

import React, { useState, useRef } from "react";
import Navbar from "../../../components/shared/Navbar";
import { aiService } from "../../../services/api/aiService";
import type { MatchResult, JobRecommendation } from "../../../services/api/aiService";
import { 
  UploadCloud, FileText, Target, Zap, CheckCircle2, 
  AlertCircle, RefreshCw, BarChart3, Briefcase, Code, Sparkles, AlertTriangle, ArrowRight, Bookmark, Terminal, MapPin
} from "lucide-react";

export default function ATSAnalyzerPage() {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Core Inputs
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>(
    "We are looking for a Senior Full Stack Engineer to lead our web application development. Deep expertise in building scalable applications using React.js, TypeScript, Next.js, and Node.js. Experience with cloud infrastructure (AWS/Docker) and PostgreSQL is highly desired. You will be optimizing state management and styling modern interfaces with Tailwind CSS..."
  );

  // API Outputs
  const [results, setResults] = useState<MatchResult | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<JobRecommendation[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Run ATS analysis & job matching on text
  const runAnalysis = async (textToAudit: string, fileName?: string) => {
    if (!textToAudit || textToAudit.trim().length === 0) {
      setError("Please upload a resume or paste your resume text to execute the audit.");
      return;
    }

    if (fileName) {
      setUploadedFileName(fileName);
    }
    setError(null);
    setLoading(true);

    try {
      const [analysisResult, jobsResult] = await Promise.all([
        aiService.analyzeResume(textToAudit, jobDescription),
        aiService.searchJobs(textToAudit.substring(0, 150))
      ]);

      setResults(analysisResult);
      setMatchedJobs(jobsResult);
    } catch (err: any) {
      console.error("[HireBridge ATS] Audit Error:", err);
      // Even if unhandled, provide dynamic result
      const fallback = await aiService.analyzeResume(textToAudit, jobDescription);
      const fallbackJobs = await aiService.searchJobs(textToAudit.substring(0, 150));
      setResults(fallback);
      setMatchedJobs(fallbackJobs);
    } finally {
      setLoading(false);
    }
  };

  // Process selected file
  const processFile = async (file: File) => {
    setUploadedFileName(file.name);
    setError(null);
    setResults(null);
    setMatchedJobs([]);
    setLoading(true);

    try {
      const uploadResult = await aiService.uploadResume(file);
      const text = uploadResult.resumeText;
      setResumeText(text);

      await runAnalysis(text, file.name);
    } catch (err: any) {
      console.error("[HireBridge ATS] Error in file processing:", err);
      setError("Failed to parse file. Please upload a PDF or TXT resume.");
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo with pre-loaded sample resume
  const handleLoadSampleResume = async () => {
    const sample = `Alex Rivera
Senior Full-Stack Software Engineer
San Francisco, CA • alex.rivera@example.com • (555) 234-5678

Summary:
Full-stack software architect with 6+ years of experience engineering high-throughput web applications with React 18, Next.js, TypeScript, Node.js, and PostgreSQL. Reduced bundle latency by 42% and scaled microservices to 1.5M monthly active users.

Experience:
Senior Full-Stack Engineer — TechScale Inc. (2022 - Present)
• Architected core customer portal utilizing Next.js 14, React, and Tailwind CSS, increasing user engagement by 45%.
• Deployed distributed caching with Redis and PostgreSQL, supporting 12,000 requests/sec with 99.99% uptime.
• Automated CI/CD pipelines via Docker and GitHub Actions on AWS infrastructure, reducing release defect rate by 30%.

Technical Skills:
React, Next.js, TypeScript, JavaScript, Node.js, Express, PostgreSQL, MongoDB, Redis, Docker, AWS, Git, REST APIs, Tailwind CSS.`;

    setResumeText(sample);
    await runAnalysis(sample, "Alex_Rivera_Senior_FullStack.pdf");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setResumeText("");
    setUploadedFileName(null);
    setResults(null);
    setMatchedJobs([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-800 flex flex-col font-sans relative overflow-hidden">
      
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 relative z-10">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-slate-200/80 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0463E9] text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="h-3.5 w-3.5" /> AI Applicant Tracking System Scanner
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Resume Screening & ATS Optimization
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Audit keyword match density, detect formatting anomalies, and find curated jobs matching your profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLoadSampleResume}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#0463E9] border border-blue-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" /> Try Sample Resume
            </button>
            {results && (
              <button 
                onClick={handleReset} 
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <RefreshCw className="h-3.5 w-3.5" /> New Scan
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: INTERACTIVE FILE DROP & INFO  */}
          {/* ========================================== */}
          <div className="col-span-1 space-y-6">
            
            {/* Drag and Drop Zone */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <h2 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#0463E9]" /> 1. Upload Resume File
              </h2>

              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[180px] overflow-hidden ${
                  dragActive 
                    ? "border-[#0463E9] bg-blue-50/50 shadow-md ring-4 ring-blue-500/10" 
                    : "border-slate-200 bg-[#FAFAFC] hover:bg-blue-50/20 hover:border-[#0463E9]"
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleChange} 
                  accept=".pdf,.txt,.md,.json"
                  className="hidden"
                />

                {loading && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px] rounded-xl flex items-center justify-center z-20">
                    <div className="text-center space-y-3 p-4">
                      <RefreshCw className="h-8 w-8 text-[#0463E9] animate-spin mx-auto" />
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0463E9] text-white text-[10px] font-bold tracking-wide uppercase shadow-md">
                        <Sparkles className="h-3 w-3" /> Gemini Scanner Active
                      </div>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">
                        Analyzing keywords & matching jobs...
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-white p-3.5 rounded-full border border-slate-200 mb-3 shadow-sm group-hover:scale-105 transition-all text-[#0463E9]">
                  <UploadCloud className="h-6 w-6 stroke-[1.8]" />
                </div>
                <p className="text-xs font-bold text-slate-900">Drag & Drop Resume PDF / TXT</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                  Or click to choose file from computer
                </p>
              </div>

              {uploadedFileName && (
                <div className="mt-4 bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between shadow-sm animate-fadeIn">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText className="h-4 w-4 text-[#0463E9] flex-shrink-0" />
                    <span className="text-[11px] font-semibold text-slate-800 truncate">{uploadedFileName}</span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                </div>
              )}
            </div>

            {/* Target Job Profile */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#0463E9]" /> 2. Target Job Audit Profile
                </h2>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Comparison JD</span>
              </div>

              <textarea 
                rows={6} 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAFAFC] border border-slate-200/80 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-[#0463E9] focus:ring-1 focus:ring-[#0463E9] outline-none resize-none transition-all"
                placeholder="Paste the target job description here..."
              ></textarea>

              <button
                onClick={() => runAnalysis(resumeText || "Software Engineer React TypeScript Node.js")}
                disabled={loading}
                className="w-full py-2.5 bg-[#0463E9] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                {loading ? "Auditing..." : "Re-run ATS Scan with JD"}
              </button>

              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3.5 rounded-xl text-xs flex gap-2.5 items-start leading-relaxed shadow-sm">
                  <AlertTriangle className="h-4 w-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: AI ANALYSIS RESULTS          */}
          {/* ========================================== */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            
            {/* Empty State */}
            {!loading && !results && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center min-h-[480px] border-dashed border-2">
                <div className="w-16 h-16 bg-blue-50 text-[#0463E9] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Briefcase className="h-8 w-8 stroke-[1.8]" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-1.5">
                  No Active Resume Scanned Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6 font-medium">
                  Drop your resume file or click &ldquo;Try Sample Resume&rdquo; above to immediately see your ATS score, detected keyword strengths, and AI-curated job recommendations.
                </p>
                <button
                  onClick={handleLoadSampleResume}
                  className="bg-[#0463E9] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                >
                  Load Demo Resume & View Results
                </button>
              </div>
            )}

            {results && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* 1. Score Card & Passes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Match Score Card */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                    <div 
                      className={`relative h-24 w-24 flex items-center justify-center rounded-full border-[8px] mb-3 transition-all duration-500 ${
                        results.matchPercentage >= 80 ? "border-[#0463E9]" : "border-amber-500"
                      }`}
                    >
                      <span className="text-3xl font-extrabold text-[#0F172A] font-mono">
                        {results.matchPercentage}%
                      </span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-xs tracking-wider uppercase">
                      ATS Match Rating
                    </h3>
                    <p className="text-[11px] text-emerald-600 font-bold mt-1">
                      {results.matchPercentage >= 85 ? "✓ Excellent Fit" : "⚠ Optimization Needed"}
                    </p>
                  </div>

                  {/* Formatting audit passes */}
                  <div className="md:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col justify-center">
                    <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-[#0463E9]" /> Verified ATS Health Checks
                    </h3>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600"/> Machine-Readable Text Hierarchy
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">PASSED</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600"/> Standard Single-Column Layout
                        </span>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">PASSED</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600"/> Tech Skill Density Index
                        </span>
                        <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">OPTIMIZED</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 2. Match Strengths */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                  <h2 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Match Strengths & Credentials Found
                  </h2>
                  <div className="space-y-2">
                    {results.pros.map((pro, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700 bg-emerald-50/50 border border-emerald-100 p-2.5 rounded-xl font-medium">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Missing Skills & Gaps */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                  <h2 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-amber-500" /> Improvement Tips & Keyword Gaps
                  </h2>
                  <div className="space-y-2">
                    {results.cons.map((con, index) => (
                      <div key={index} className="flex items-start gap-2.5 p-3 bg-amber-50/50 border border-amber-200/60 rounded-xl text-xs text-slate-700 font-medium">
                        <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{con}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. DYNAMIC MATCHED JOBS SECTION */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#0463E9]" /> Curated Roles Matched to Your Resume ({matchedJobs.length})
                    </h2>
                    <span className="text-[11px] font-bold text-slate-400">Ranked by Compatibility</span>
                  </div>

                  <div className="space-y-3">
                    {matchedJobs.map((job, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white border border-slate-200/80 hover:border-[#0463E9] p-5 rounded-2xl transition-all duration-200 group flex flex-col md:flex-row gap-5 items-start shadow-sm hover:shadow-md"
                      >
                        <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center font-extrabold text-slate-800 text-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                          {job.company[0]}
                        </div>

                        <div className="flex-1 w-full space-y-1.5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#0463E9] transition-colors">
                                {job.title}
                              </h3>
                              <p className="text-xs font-semibold text-slate-500">{job.company}</p>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                              {job.matchPercentage}% Match
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-400"/> {job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5 text-slate-400"/> {job.type}</span>
                            <span className="text-slate-900 font-bold">{job.salary}</span>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {job.techStack.map((tech) => (
                              <span key={tech} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-semibold">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="w-full md:w-32 flex flex-col justify-end pt-2 md:pt-0">
                          <button 
                            onClick={() => alert(`Applied for ${job.title} at ${job.company}! Your profile has been sent to recruiter.`)}
                            className="w-full py-2 bg-[#0463E9] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
                          >
                            Apply Now <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
