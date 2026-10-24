'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  UserCheck,
  FileText,
  Upload,
  Briefcase,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  AlertCircle,
  FileCheck,
  Edit3,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';

export default function CandidateDashboardPage() {
  const {
    activeCandidate,
    applications,
    jobs,
    updateCandidateProfile,
    uploadCandidateResume,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'APPLICATIONS' | 'RESUME' | 'PROFILE'>('APPLICATIONS');

  // Candidate applications
  const myApplications = useMemo(() => {
    return applications.filter((a) => a.candidateId === activeCandidate.id);
  }, [applications, activeCandidate.id]);

  // Upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Profile edit states
  const [headline, setHeadline] = useState(activeCandidate.headline);
  const [phone, setPhone] = useState(activeCandidate.phone);
  const [skillsStr, setSkillsStr] = useState(activeCandidate.skills.join(', '));
  const [profileSaved, setProfileSaved] = useState(false);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadSuccess(false);

    // Validate type
    const isPdf = file.name.endsWith('.pdf') || file.type === 'application/pdf';
    const isDocx = file.name.endsWith('.docx') || file.type.includes('wordprocessingml');

    if (!isPdf && !isDocx) {
      setUploadError('Invalid file type. Only PDF and DOCX documents are supported.');
      return;
    }

    // Validate size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds the 5 MB maximum limit.');
      return;
    }

    setSelectedFile(file);
    setUploadProgress(15);

    // Simulated parsing progress
    setTimeout(() => setUploadProgress(65), 300);
    setTimeout(() => {
      setUploadProgress(100);
      const simulatedText = `${activeCandidate.name.toUpperCase()}\nSkills: ${activeCandidate.skills.join(', ')}\nExperience: 4 years building Java Spring Boot microservices and REST APIs with PostgreSQL and Docker.`;
      uploadCandidateResume(
        file.name,
        `${(file.size / 1024).toFixed(0)} KB`,
        simulatedText,
        isPdf ? 'pdf' : 'docx'
      );
      setUploadSuccess(true);
      setUploadProgress(0);
    }, 800);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsStr.split(',').map((s) => s.trim()).filter(Boolean);
    updateCandidateProfile({
      headline,
      phone,
      skills,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Summary */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-2xl font-black shadow-md shadow-emerald-600/10">
            {activeCandidate.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-navy-950">{activeCandidate.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                ACTIVE CANDIDATE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeCandidate.headline} • {activeCandidate.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/jobs"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-sm flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Browse New Openings
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('APPLICATIONS')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'APPLICATIONS'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          My Applications ({myApplications.length})
        </button>

        <button
          onClick={() => setActiveTab('RESUME')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'RESUME'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <FileText className="w-4 h-4" />
          Resume Management
        </button>

        <button
          onClick={() => setActiveTab('PROFILE')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'PROFILE'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Candidate Profile & Skills
        </button>
      </div>

      {/* TAB 1: APPLICATIONS & SCREENING FEEDBACK */}
      {activeTab === 'APPLICATIONS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-navy-950">Application Status & Screening Reports</h3>
              <p className="text-xs text-slate-500">Track company reviews and inspect released skill matching feedback</p>
            </div>
          </div>

          {myApplications.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-navy-950">No applications submitted yet</h4>
              <p className="text-xs text-slate-500">Browse published job openings to submit your first application.</p>
              <Link href="/jobs" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold">
                Explore Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                          {app.companyName}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">Applied on {app.appliedAt}</span>
                      </div>
                      <h4 className="text-lg font-bold text-navy-950 mt-1">{app.jobTitle}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'SHORTLISTED'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : app.status === 'INTERVIEW'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : app.status === 'REJECTED'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        Status: {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Screening Feedback details */}
                  {app.screeningResult ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                            Screening Match Score
                          </span>
                          <div className="text-3xl font-black text-navy-950 mt-1">
                            {app.screeningResult.matchPercentage}%
                          </div>
                          <span className="text-xs text-slate-600 mt-1 block">
                            {app.screeningResult.matchedCount} of {app.screeningResult.totalRequiredSkills} Skills Verified
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200 mt-3">
                          {app.screeningResult.scoringFormula}
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-3">
                        <div>
                          <span className="text-xs font-semibold text-emerald-700 block mb-1">
                            Verified Skills in Resume:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {app.screeningResult.matchedSkills.map((s) => (
                              <span key={s} className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {app.screeningResult.missingSkills.length > 0 && (
                          <div>
                            <span className="text-xs font-semibold text-amber-800 block mb-1">
                              Missing Target Skills:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {app.screeningResult.missingSkills.map((s) => (
                                <span key={s} className="px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {app.screeningResult.suggestionsForCandidate.length > 0 && (
                          <div className="p-3 rounded-lg bg-blue-50/70 text-xs text-blue-900 border border-blue-200/70">
                            <span className="font-bold block mb-1">Resume Improvement Advice:</span>
                            <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                              {app.screeningResult.suggestionsForCandidate.map((sug, i) => (
                                <li key={i}>{sug}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic">
                      Resume screening evaluation in progress by recruiter.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RESUME UPLOAD & MANAGEMENT */}
      {activeTab === 'RESUME' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-navy-950">Active Document on File</h3>
              <p className="text-xs text-slate-500">Your primary resume parsed for all automated job applications</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  {activeCandidate.resumeFileType?.toUpperCase() || 'PDF'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">{activeCandidate.resumeFileName}</h4>
                  <p className="text-xs text-slate-500">
                    Size: {activeCandidate.resumeFileSize} • Last updated: {activeCandidate.uploadedAt || 'Recently'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Ready for Screening
                </span>
              </div>
            </div>

            {/* Upload or Replace Box */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-400 transition text-center space-y-3">
              <Upload className="w-8 h-8 text-blue-600 mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-navy-950">Upload or Replace Resume</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Supports PDF and DOCX files (Up to 5 MB). Validated via Apache PDFBox / POI parser.
                </p>
              </div>

              <label className="inline-block cursor-pointer px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold rounded-lg shadow-sm transition">
                Select File
                <input
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleSimulatedFileUpload}
                  className="hidden"
                />
              </label>

              {uploadProgress > 0 && (
                <div className="max-w-xs mx-auto space-y-1">
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <span className="text-[11px] text-slate-500">Simulating Java extraction: {uploadProgress}%</span>
                </div>
              )}

              {uploadSuccess && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold">
                  File uploaded and parsed successfully into plain text tokens!
                </div>
              )}

              {uploadError && (
                <div className="p-2.5 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold">
                  {uploadError}
                </div>
              )}
            </div>

            {/* Extracted Text Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                Extracted Text Stream Preview (Internal Buffer):
              </span>
              <pre className="p-4 bg-slate-100 rounded-xl text-[11px] font-mono text-slate-700 whitespace-pre-wrap max-h-48 overflow-y-auto border border-slate-200">
                {activeCandidate.resumeExtractedText || 'No text extracted yet.'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CANDIDATE PROFILE */}
      {activeTab === 'PROFILE' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-navy-950">Candidate Information</h3>
            <p className="text-xs text-slate-500">Update your career details and technical skill profile</p>
          </div>

          {profileSaved && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  disabled
                  value={activeCandidate.name}
                  className="w-full py-2 px-3 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={activeCandidate.email}
                  className="w-full py-2 px-3 text-xs bg-slate-100 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Technical Skills (Comma separated)
              </label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      <BackendStatusBadge featureName="Candidate Security Scope" />
    </div>
  );
}
