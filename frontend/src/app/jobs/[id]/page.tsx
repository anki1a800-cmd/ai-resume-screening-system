'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2,
  Send,
  FileText,
  AlertCircle,
  Sparkles,
  UserCheck
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.id as string;

  const { jobs, currentUser, activeCandidate, applyForJob } = useApp();

  const [applying, setApplying] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy-950">Job Not Found</h2>
        <p className="text-xs text-slate-500">The job listing you are looking for does not exist or has expired.</p>
        <Link href="/jobs" className="inline-block px-4 py-2 bg-navy-900 text-white rounded-lg text-xs font-semibold">
          Back to Browse Jobs
        </Link>
      </div>
    );
  }

  const handleApply = async () => {
    setErrorMessage('');
    setApplying(true);

    try {
      await new Promise((res) => setTimeout(res, 800)); // simulated submission
      await applyForJob(job.id);
      setAppliedSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not submit application.');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all jobs
        </Link>
      </div>

      {/* Main Job Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {job.companyName}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">{job.department}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1 font-semibold text-navy-900">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {job.location} ({job.workMode})
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-700">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                {job.salaryRange}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                {job.employmentType}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Apply by: {job.deadline}
              </span>
            </div>
          </div>

          {/* Quick Apply CTA in header */}
          <div className="shrink-0 pt-2 sm:pt-0">
            {appliedSuccess ? (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Application Submitted!
              </div>
            ) : (
              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {applying ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Apply for Position</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {appliedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-2">
            <p className="font-semibold">
              Thank you! Your resume ({activeCandidate.resumeFileName || 'Alex_Morgan_Resume.pdf'}) was submitted for automated parsing.
            </p>
            <p className="text-emerald-700">
              You can track your screening status, review matched skills, and see feedback inside your Candidate Dashboard.
            </p>
            <Link
              href="/dashboard/candidate"
              className="inline-flex items-center gap-1 text-emerald-800 font-bold hover:underline"
            >
              Go to Candidate Dashboard <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left 2 Cols: Description, Responsibilities, Skills */}
        <div className="md:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-navy-950">About The Role</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-navy-950">Key Responsibilities</h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Skills & Qualifications */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-navy-950">Required Technical Skills</h2>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Screened by Engine
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Our automated parsing engine will match these mandatory qualifications against your submitted PDF or DOCX resume:
            </p>

            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-navy-900 border border-slate-200 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Job Overview Details Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-navy-950 pb-3 border-b border-slate-100">
              Job Overview
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <span className="block text-slate-400 font-medium">Hiring Organization</span>
                <span className="font-semibold text-navy-950">{job.companyName}</span>
              </div>

              <div>
                <span className="block text-slate-400 font-medium">Minimum Experience</span>
                <span className="font-semibold text-navy-950">{job.experienceMinYears}+ years required</span>
              </div>

              <div>
                <span className="block text-slate-400 font-medium">Education / Qualifications</span>
                <span className="font-semibold text-navy-950">{job.education}</span>
              </div>

              <div>
                <span className="block text-slate-400 font-medium">Available Openings</span>
                <span className="font-semibold text-navy-950">{job.openings} Position(s)</span>
              </div>

              <div>
                <span className="block text-slate-400 font-medium">Application Deadline</span>
                <span className="font-semibold text-navy-950">{job.deadline}</span>
              </div>

              <div>
                <span className="block text-slate-400 font-medium">Screening Mode</span>
                <span className="font-semibold text-blue-700">Deterministic Keyword Parser (PDFBox / POI)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleApply}
                disabled={applying || appliedSuccess}
                className="w-full py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {appliedSuccess ? 'Application Received' : 'Submit Application'}
              </button>
            </div>
          </div>

          {/* Candidate Profile Preview indicator */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <UserCheck className="w-4 h-4 text-blue-600" />
              Active Candidate Persona
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Applying as: <strong>{activeCandidate.name}</strong> ({activeCandidate.headline})
            </p>
            <p className="text-slate-400 text-[10px]">
              Attached Resume: {activeCandidate.resumeFileName} ({activeCandidate.resumeFileSize})
            </p>
          </div>
        </div>
      </div>

      <BackendStatusBadge featureName="Application Dispatcher" />
    </div>
  );
}
