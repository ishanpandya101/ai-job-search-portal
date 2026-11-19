"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowLeft, Github, CheckCircle2 } from "lucide-react";
import { HireBridgeLogo } from "../../../components/shared/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/jobs");
      }, 800);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white flex font-sans">
      
      {/* LEFT SIDE: AUTH FORM */}
      <div className="w-full lg:w-1/2 flex flex-col px-6 py-8 sm:px-12 md:px-16 lg:px-24 justify-center relative text-slate-900">
        
        {/* Minimal Back Button */}
        <div className="absolute top-8 left-6 sm:left-12 lg:left-24">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>

        <div className="max-w-sm w-full mx-auto mt-12 lg:mt-0">
          
          {/* HireBridge Logo */}
          <div className="mb-8">
            <HireBridgeLogo />
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-[#0F172A]">Welcome back</h1>
          <p className="text-slate-500 font-medium text-sm mb-8">
            Sign in to access your saved jobs, ATS reports, and applications.
          </p>

          {success ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>Signed in successfully! Redirecting to jobs...</span>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com" 
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0463E9] focus:border-[#0463E9] transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-bold text-slate-700">Password</label>
                  <Link href="#" className="text-xs font-bold text-[#0463E9] hover:underline">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0463E9] focus:border-[#0463E9] transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-[#0463E9] hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Signing in..." : "Sign in to HireBridge"}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Or continue with</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <button 
                type="button" 
                onClick={() => router.push("/jobs")}
                className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
              >
                <Github className="h-4 w-4" /> GitHub
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-slate-500 font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-[#0463E9] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: HERO BRAND SHOWCASE */}
      <div className="hidden lg:flex w-1/2 bg-slate-50 border-l border-slate-200 p-12 flex-col justify-between relative overflow-hidden">
        <div className="max-w-md my-auto space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0463E9] text-xs font-bold uppercase tracking-wider">
            Your Career, Our Platform
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Find Jobs, Build a Stronger Resume, and Get Hired.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Join over 50,000+ active candidates landing interviews at Google, Stripe, Microsoft, and top enterprise tech teams.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          © 2026 HireBridge. All rights reserved.
        </div>
      </div>

    </div>
  );
}
