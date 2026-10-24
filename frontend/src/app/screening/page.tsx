'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Play,
  RotateCcw,
  Sliders,
  Cpu,
  Layers,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';
import { ScreeningResult } from '@/types';

export default function ScreeningLabPage() {
  const { jobs, candidates, screenCustomResume } = useApp();

  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '');
  const [selectedCandidateId, setSelectedCandidateId] = useState(candidates[0]?.id || '');
  const [customCandidateName, setCustomCandidateName] = useState('Alex Morgan');
  const [customResumeText, setCustomResumeText] = useState(candidates[0]?.resumeExtractedText || '');
  const [screeningResult, setScreeningResult] = useState<ScreeningResult | null>(null);
  const [isScreening, setIsScreening] = useState(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const handleCandidateChange = (candId: string) => {
    setSelectedCandidateId(candId);
    const cand = candidates.find((c) => c.id === candId);
    if (cand) {
      setCustomCandidateName(cand.name);
      setCustomResumeText(cand.resumeExtractedText || cand.skills.join(', '));
      setScreeningResult(null);
    }
  };

  const handleRunScreening = async () => {
    setIsScreening(true);
    setScreeningResult(null);

    // Simulated parsing delay mimicking Apache PDFBox / Apache POI extraction
    await new Promise((res) => setTimeout(res, 600));

    const result = screenCustomResume(
      selectedJobId,
      customResumeText,
      customCandidateName,
      'Resume_Input.pdf'
    );

    setScreeningResult(result);
    setIsScreening(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5" />
            Interactive Engine Simulator
          </div>
          <h1 className="text-3xl font-extrabold text-navy-950 tracking-tight">
            Resume Screening & Skill Matching Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Test deterministic keyword token parsing against job criteria using explainable scoring
          </p>
        </div>

        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-navy-900 text-xs font-semibold hover:bg-slate-50 transition shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-blue-600" />
          Scoring Formula Documentation
        </Link>
      </div>

      {/* Main interactive workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Inputs): Job Selection + Resume Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                Step 1: Select Target Job Opening
              </h2>
              <span className="text-xs font-medium text-slate-400">NovaTech Solutions</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Role Criteria
              </label>
              <select
                value={selectedJobId}
                onChange={(e) => {
                  setSelectedJobId(e.target.value);
                  setScreeningResult(null);
                }}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-navy-950 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} ({j.companyName} — {j.requiredSkills.length} required skills)
                  </option>
                ))}
              </select>
            </div>

            {/* Required Skills Chips */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">
                  Target Required Skills ({selectedJob?.requiredSkills.length}):
                </span>
                <span className="text-[11px] text-slate-500">Must appear in resume</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedJob?.requiredSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100/70 text-blue-900 border border-blue-200/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Candidate Resume Text */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Step 2: Resume Content (PDF/DOCX Extraction)
              </h2>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Sample Candidate:</span>
                <select
                  value={selectedCandidateId}
                  onChange={(e) => handleCandidateChange(e.target.value)}
                  className="py-1 px-2 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700"
                >
                  {candidates.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.headline.slice(0, 24)}...)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={customCandidateName}
                  onChange={(e) => setCustomCandidateName(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Extracted Document Stream
                </label>
                <div className="text-xs text-slate-500 py-2 px-3 bg-slate-100 rounded-lg border border-slate-200">
                  Simulating Apache PDFBox 3.0 / POI 5.2 Text Stripper
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Parsed Plain Text Buffer
                </label>
                <button
                  type="button"
                  onClick={() => setCustomResumeText('')}
                  className="text-[11px] text-slate-400 hover:text-rose-600"
                >
                  Clear text
                </button>
              </div>
              <textarea
                rows={9}
                value={customResumeText}
                onChange={(e) => setCustomResumeText(e.target.value)}
                placeholder="Paste or edit resume text here to test keyword matching..."
                className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleRunScreening}
              disabled={isScreening || !customResumeText.trim()}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isScreening ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Tokens & Matching Skills...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Execute Explainable Resume Screening</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column (Results): Screening Score, Matched & Missing Skills, Formula */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-navy-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Screening Audit Report
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Rule-Based Output
              </span>
            </div>

            {screeningResult ? (
              <div className="space-y-6">
                {/* Score Dial / Badge */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Overall Match Score
                    </span>
                    <div className="text-4xl font-extrabold text-navy-950 mt-1">
                      {screeningResult.matchPercentage}%
                    </div>
                    <span className="text-xs font-semibold mt-1 inline-block text-slate-600">
                      {screeningResult.matchedCount} of {screeningResult.totalRequiredSkills} Skills Matched
                    </span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        screeningResult.matchPercentage >= 80
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : screeningResult.matchPercentage >= 50
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {screeningResult.matchPercentage >= 80
                        ? 'Shortlist Recommended'
                        : screeningResult.matchPercentage >= 50
                        ? 'Manual Review Required'
                        : 'Low Match Profile'}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Screened: {screeningResult.screenedAt.slice(11, 19)}
                    </div>
                  </div>
                </div>

                {/* Mathematical Formula Breakdown */}
                <div className="p-3.5 rounded-xl bg-navy-900 text-white space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
                    Documented Mathematical Formula:
                  </span>
                  <code className="text-xs font-mono text-emerald-300 block">
                    {screeningResult.scoringFormula}
                  </code>
                  <p className="text-[11px] text-slate-300 leading-tight">
                    Formula: (Matched Skills / Total Required Skills) × 100
                  </p>
                </div>

                {/* Matched Skills */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Matched Skills ({screeningResult.matchedSkills.length})
                    </span>
                    <span className="text-[11px] text-slate-400">Found in resume</span>
                  </div>

                  {screeningResult.matchedSkills.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No matching keywords found in document.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {screeningResult.matchedSkills.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Missing Skills */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-700 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      Missing Skills ({screeningResult.missingSkills.length})
                    </span>
                    <span className="text-[11px] text-slate-400">Required by job</span>
                  </div>

                  {screeningResult.missingSkills.length === 0 ? (
                    <p className="text-xs text-emerald-600 font-medium">Full skill coverage! No missing requirements.</p>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {screeningResult.missingSkills.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3 text-rose-500" />
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Plain-English Explanation */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-navy-950 block">Auditable Explanation:</span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {screeningResult.explanation}
                  </p>
                </div>

                {/* Suggestions for Candidate */}
                {screeningResult.suggestionsForCandidate.length > 0 && (
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-1.5">
                    <span className="text-xs font-bold text-blue-900 block">Resume Optimization Advice:</span>
                    <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                      {screeningResult.suggestionsForCandidate.map((sug, i) => (
                        <li key={i}>{sug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center space-y-3">
                <Cpu className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-navy-950">Screening Engine Ready</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Select a job and candidate resume on the left, then click &quot;Execute Explainable Resume Screening&quot; to review the real-time breakdown.
                </p>
              </div>
            )}
          </div>

          <BackendStatusBadge featureName="Java PDFBox & POI Integration" />
        </div>
      </div>
    </div>
  );
}
