"use client";

import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, RefreshCw, MessageSquare, ArrowRight, Award } from "lucide-react";

interface InterviewPrepModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_QUESTIONS = [
  {
    role: "Frontend / Full-Stack Engineer",
    question: "How would you optimize performance in a large-scale React / Next.js web application?",
    tips: [
      "Mention Code Splitting, dynamic imports (next/dynamic), and route-based lazy loading.",
      "Discuss image optimization via Next.js Image component and modern WebP/AVIF formats.",
      "Explain state management best practices and avoiding unnecessary re-renders with useMemo/useCallback."
    ],
    sampleAnswer: "In a production Next.js app, I prioritize three pillars: bundle size optimization (tree shaking, dynamic imports), runtime performance (virtualization for long lists, memoized selectors), and network caching (SSR/ISR strategies and asset compression via CDN)."
  },
  {
    role: "Backend & Systems Engineer",
    question: "Explain the tradeoffs between SQL and NoSQL databases when designing high-concurrency systems.",
    tips: [
      "Highlight ACID compliance vs. eventual consistency.",
      "Discuss horizontal scaling (sharding in NoSQL) vs. vertical scaling / read-replicas in SQL.",
      "Give concrete examples: financial transactions (PostgreSQL) vs. high-throughput session/activity logs (MongoDB/Redis)."
    ],
    sampleAnswer: "SQL databases excel at complex relational queries and transactional integrity where consistency is non-negotiable. NoSQL solutions offer schema flexibility and frictionless horizontal partitioning for high-velocity unstructured payloads."
  },
  {
    role: "Behavioral & Leadership",
    question: "Tell me about a situation where a critical production bug occurred. How did you resolve it and prevent recurrence?",
    tips: [
      "Use the STAR method (Situation, Task, Action, Result).",
      "Emphasize blameless post-mortem culture and immediate containment before root cause analysis.",
      "Explain preventive engineering: automated regression tests, alerting dashboards, and staged canary deployments."
    ],
    sampleAnswer: "When an unexpected API latency spike impacted checkout conversions, my first step was rolling back to the last stable release within 4 minutes. We then identified an unindexed database query in staging, added the index with regression benchmarks, and instituted automated query performance checks in our CI/CD pipeline."
  }
];

export default function InterviewPrepModal({ isOpen, onClose }: InterviewPrepModalProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  if (!isOpen) return null;

  const activeQ = SAMPLE_QUESTIONS[selectedIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0463E9] flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">HireBridge AI Interview Prep</h3>
              <p className="text-xs text-slate-500">Practice real interview questions with instant AI evaluation</p>
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
          
          {/* Question Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {SAMPLE_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedIdx(idx);
                  setShowAnswer(false);
                  setFeedbackGiven(false);
                }}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                  selectedIdx === idx 
                    ? "bg-[#0463E9] text-white shadow-sm" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {q.role}
              </button>
            ))}
          </div>

          {/* Current Question Card */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0463E9] uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Interview Prompt
            </div>
            <p className="text-base font-bold text-slate-900 leading-snug">
              &ldquo;{activeQ.question}&rdquo;
            </p>
          </div>

          {/* Key Topics to Cover */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Key Evaluation Criteria & Tips
            </h4>
            <div className="space-y-1.5">
              {activeQ.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Answer Preview */}
          {showAnswer ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Award className="h-4 w-4 text-amber-500" /> Model Exemplary Answer
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                &ldquo;{activeQ.sampleAnswer}&rdquo;
              </p>
            </div>
          ) : (
            <button
              onClick={() => setShowAnswer(true)}
              className="text-xs font-bold text-[#0463E9] hover:text-blue-800 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" /> Reveal Model Answer & Evaluation Rubric
            </button>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs text-slate-400">Question {selectedIdx + 1} of {SAMPLE_QUESTIONS.length}</span>
          <div className="flex gap-2.5">
            <button
              onClick={() => {
                setSelectedIdx((selectedIdx + 1) % SAMPLE_QUESTIONS.length);
                setShowAnswer(false);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Next Question
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#0463E9] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
            >
              Done Practicing
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
