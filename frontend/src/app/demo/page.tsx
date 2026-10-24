'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck2,
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';

export default function DemoPage() {
  const router = useRouter();
  const { loginAsDemo, resetDemoData, applications, jobs, companies } = useApp();

  const handleSelectRole = (role: 'COMPANY' | 'CANDIDATE' | 'SUPERADMIN', destination: string) => {
    loginAsDemo(role);
    router.push(destination);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Interactive Evaluation Sandbox
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
          Select a Demo Role to Explore
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Test the complete recruitment lifecycle with our fictional enterprise company{' '}
          <strong className="text-navy-950 font-bold">NovaTech Solutions</strong>. All sample data is isolated from production systems and safe for college evaluation.
        </p>
      </div>

      {/* 3 Main Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* NovaTech Company / Recruiter Card */}
        <div className="bg-white rounded-2xl border-2 border-blue-500/30 p-6 shadow-lg shadow-blue-500/5 hover:border-blue-500 transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Recommended
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-navy-950">Company / Recruiter</h3>
              <p className="text-xs font-semibold text-blue-600 mt-0.5">NovaTech Solutions Dashboard</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Experience the core recruiter workflow. Screen candidates against job requirements, inspect calculated match scores (88%, 100%, 50%), view matched vs missing skills, and update hiring statuses.
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Manage NovaTech job postings & criteria</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Run automated skill matching on resumes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Review Shortlisted, Interview & Rejected files</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => handleSelectRole('COMPANY', '/dashboard/company')}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 group-hover:shadow"
            >
              <span>Explore NovaTech Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Candidate Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Applicant View
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-navy-950">Candidate Portal</h3>
              <p className="text-xs font-semibold text-emerald-600 mt-0.5">Alex Morgan (Senior Java Engineer)</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Explore the applicant experience. Upload PDF/DOCX resumes, browse published jobs, submit 1-click applications, and inspect released screening feedback with keyword suggestions.
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Test simulated PDF/DOCX upload & preview</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Track submitted applications in real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Inspect feedback on missing technical skills</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => handleSelectRole('CANDIDATE', '/dashboard/candidate')}
              className="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 group-hover:shadow"
            >
              <span>Explore Candidate Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Superadmin Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                Restricted Sample
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-navy-950">Superadmin Control</h3>
              <p className="text-xs font-semibold text-amber-700 mt-0.5">System Audit & Governance</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Explore platform-wide governance. Review pending company registrations (e.g. BioHealth Cloud), monitor audit logs, manage user accounts, and inspect platform analytics.
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Approve / Suspend company tenant accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>View platform-wide screening statistics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Inspect immutable security audit logs</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => handleSelectRole('SUPERADMIN', '/dashboard/superadmin')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 group-hover:shadow"
            >
              <span>Explore Superadmin Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Isolation & Safety Guarantees Notice */}
      <div className="p-6 rounded-2xl bg-slate-100/80 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-navy-950 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Demo Security & Data Isolation Guarantees
          </div>
          <button
            onClick={() => {
              resetDemoData();
              alert('Demo state reset to initial pristine dataset!');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-200 rounded-lg text-xs font-medium text-slate-700 border border-slate-300 transition"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Demo Dataset
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Demo data operates entirely within an isolated sandbox containing realistic fictional entities (NovaTech Solutions, Alex Morgan, Priya Sharma). No production credentials or real candidate resumes are exposed. Any changes you make during the session can be instantly reverted.
        </p>

        <div className="pt-2">
          <BackendStatusBadge featureName="Backend Integration Lifecycle" />
        </div>
      </div>
    </div>
  );
}
