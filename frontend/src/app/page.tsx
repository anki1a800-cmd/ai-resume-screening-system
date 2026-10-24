'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Briefcase,
  PlayCircle,
  LogIn,
  CheckCircle2,
  FileCheck,
  Shield,
  BarChart3,
  Cpu,
  ArrowRight,
  Sparkles,
  Building2,
  MapPin,
  Clock,
  Layers,
  ChevronRight,
  Database
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';
import { PLATFORM_STATS } from '@/data/mockData';

export default function HomePage() {
  const router = useRouter();
  const { jobs, loginAsDemo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const publishedJobs = jobs.filter((j) => j.status === 'PUBLISHED');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/jobs');
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-navy-50/40 to-slate-50 pt-12 pb-20 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Full-Stack College Capstone Project • Java Spring Boot & Next.js</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight leading-[1.15]">
              Smarter Hiring Starts Here
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Compare candidate resumes directly against company job requirements with explainable skill matching, secure role-based access, and transparent scoring.
            </p>

            {/* Job Search Field */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-2xl shadow-lg shadow-slate-200/60 border border-slate-200">
                <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by job title, skill (e.g. Java, React, Docker)..."
                    className="w-full py-2 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-semibold rounded-xl transition shadow-sm shrink-0 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search Jobs
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/demo"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <PlayCircle className="w-4 h-4 text-blue-200" />
                Launch Demo Login (NovaTech)
              </Link>

              <Link
                href="/jobs"
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-navy-900 font-semibold text-sm border border-slate-300 transition shadow-sm flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-slate-600" />
                Browse Jobs
              </Link>

              <Link
                href="/login"
                className="px-6 py-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-semibold text-sm transition shadow-sm flex items-center gap-2"
              >
                <LogIn className="w-4 h-4 text-slate-300" />
                Sign In
              </Link>
            </div>

            {/* Backend notice */}
            <div className="max-w-2xl mx-auto pt-4">
              <BackendStatusBadge featureName="Interactive System Status" />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics (Clearly labeled as Demo Data) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-navy-950">Platform Performance & Activity</h3>
              <p className="text-xs text-slate-500">Live operational overview across active organizations</p>
            </div>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200">
              SAMPLE DEMO METRICS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-navy-950">{PLATFORM_STATS.totalCandidates}</div>
              <div className="text-xs font-medium text-slate-500">Candidates Registered</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-blue-600">{PLATFORM_STATS.totalCompanies}</div>
              <div className="text-xs font-medium text-slate-500">Vetted Companies</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-navy-900">{PLATFORM_STATS.totalJobPostings}</div>
              <div className="text-xs font-medium text-slate-500">Active Job Postings</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-extrabold text-emerald-600">{PLATFORM_STATS.totalShortlisted}</div>
              <div className="text-xs font-medium text-slate-500">Candidates Shortlisted</div>
            </div>
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <div className="text-3xl font-extrabold text-indigo-600">{PLATFORM_STATS.screeningAccuracy}</div>
              <div className="text-xs font-medium text-slate-500">Screening Precision</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Transparent Architecture</span>
          <h2 className="text-3xl font-extrabold text-navy-950 mt-1">How The Screening Engine Works</h2>
          <p className="text-sm text-slate-600 mt-2">
            A 4-step explainable workflow using Java text extraction libraries and deterministic skill scoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-blue-300 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-navy-950 mb-2">Resume Ingestion</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Candidate submits PDF or DOCX file with strict validation on MIME type, magic bytes, and file size limits (5 MB max).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-blue-300 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-base mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-navy-950 mb-2">Text Extraction</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Java Apache PDFBox extracts PDF text and Apache POI parses DOCX streams, sanitizing formatting and normalizing case.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-blue-300 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-navy-950 mb-2">Skill Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deterministic skill comparison identifies matched keywords, flags missing skills, and applies the audited match formula.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-blue-300 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-base mb-4">
              04
            </div>
            <h3 className="text-base font-bold text-navy-950 mb-2">Human-in-the-Loop</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Recruiter reviews transparent score breakdown, detailed candidate resume, and makes shortlisted / interview decisions.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/screening"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Launch the Interactive Screening Simulator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Key Feature Cards */}
      <section className="bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Enterprise Foundations</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Full-Stack Security & Compliance</h2>
            <p className="text-sm text-slate-300 mt-2">
              Architected with industry-standard Spring Security, data isolation, and auditable scoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-navy-800/80 border border-navy-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Server-Enforced RBAC</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Role authorization strictly validated by Spring Security on every Java controller. Unauthorized tenant access is prevented at the database entity level.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-800/80 border border-navy-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Explainable Scoring Formula</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                No black-box hallucinated ratings. Match scores calculate strictly as: (Matched Skills / Total Required Skills) × 100 with documented missing skills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-navy-800/80 border border-navy-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Relational Integrity</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Normalized PostgreSQL/MySQL entities connecting Users, Companies, Jobs, Resumes, Applications, and immutable Audit Trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Public Opportunities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950">Featured Job Openings</h2>
            <p className="text-xs sm:text-sm text-slate-600">Sample published openings from NovaTech Solutions and partner companies</p>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-navy-900 text-sm font-semibold transition"
          >
            View All ({publishedJobs.length}) Openings
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedJobs.slice(0, 4).map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs font-semibold text-blue-600">{job.companyName}</span>
                    <h3 className="text-lg font-bold text-navy-950 mt-0.5">{job.title}</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {job.workMode}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4">{job.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.requiredSkills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 5 && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-500">
                      +{job.requiredSkills.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  <span className="font-semibold text-navy-900">{job.salaryRange}</span>
                </div>

                <Link
                  href={`/jobs/${job.id}`}
                  className="px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-medium text-xs transition"
                >
                  View & Apply
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* College Project Viva / Demo Banner Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-navy-900 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30 inline-block">
              For Evaluators & Viva Reviewers
            </span>
            <h3 className="text-2xl font-bold text-white">Need an Instant Walkthrough?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore NovaTech Solutions recruiter dashboard with pre-screened applicants, inspect candidate match calculations, or toggle Superadmin audit views.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => {
                loginAsDemo('COMPANY');
                router.push('/dashboard/company');
              }}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-md"
            >
              Open NovaTech Recruiter Demo
            </button>
            <Link
              href="/about"
              className="px-5 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 font-semibold text-xs border border-navy-600 transition"
            >
              Read College Viva Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
