'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Building2,
  Briefcase,
  Users,
  FileCheck2,
  FileSearch,
  PlusCircle,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Download,
  Eye,
  Sliders,
  DollarSign,
  MapPin,
  Calendar,
  AlertCircle,
  BarChart3,
  Check,
  X
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';
import { ApplicationStatus, Job } from '@/types';

export default function CompanyDashboardPage() {
  const {
    activeCompany,
    jobs,
    applications,
    createJob,
    updateJobStatus,
    screenApplication,
    updateApplicationStatus,
    candidates,
    isDemoMode
  } = useApp();

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'JOBS' | 'APPLICANTS' | 'SCREENING' | 'REPORTS'>('OVERVIEW');

  // Create Job Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDepartment, setNewDepartment] = useState('Platform Engineering');
  const [newDescription, setNewDescription] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newResponsibilities, setNewResponsibilities] = useState('');
  const [newEducation, setNewEducation] = useState("Bachelor's in Computer Science or related field");
  const [newExperience, setNewExperience] = useState(2);
  const [newEmploymentType, setNewEmploymentType] = useState<Job['employmentType']>('Full-Time');
  const [newLocation, setNewLocation] = useState('Boston, MA');
  const [newWorkMode, setNewWorkMode] = useState<Job['workMode']>('Hybrid');
  const [newSalary, setNewSalary] = useState('$110,000 - $135,000 / yr');
  const [newOpenings, setNewOpenings] = useState(2);
  const [newDeadline, setNewDeadline] = useState('2026-12-31');

  // Filter & Search states
  const [applicantSearch, setApplicantSearch] = useState('');
  const [filterJob, setFilterJob] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Company's own jobs & applications
  const companyJobs = useMemo(() => {
    return jobs.filter((j) => j.companyId === activeCompany.id);
  }, [jobs, activeCompany.id]);

  const companyApplications = useMemo(() => {
    return applications.filter((app) => app.companyId === activeCompany.id);
  }, [applications, activeCompany.id]);

  // Filtering applicants
  const filteredApplicants = useMemo(() => {
    return companyApplications.filter((app) => {
      const matchSearch =
        !applicantSearch ||
        app.candidateName.toLowerCase().includes(applicantSearch.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(applicantSearch.toLowerCase()) ||
        app.candidateHeadline.toLowerCase().includes(applicantSearch.toLowerCase());

      const matchJob = filterJob === 'ALL' || app.jobId === filterJob;
      const matchStatus = filterStatus === 'ALL' || app.status === filterStatus;

      return matchSearch && matchJob && matchStatus;
    });
  }, [companyApplications, applicantSearch, filterJob, filterStatus]);

  // Selected applicant for detailed screening drawer/modal
  const [selectedAppId, setSelectedAppId] = useState<string | null>(companyApplications[0]?.id || null);
  const selectedApp = companyApplications.find((a) => a.id === selectedAppId);

  // Metrics
  const totalJobs = companyJobs.length;
  const activeJobs = companyJobs.filter((j) => j.status === 'PUBLISHED').length;
  const totalApplicants = companyApplications.length;
  const shortlistedCount = companyApplications.filter((a) => a.status === 'SHORTLISTED' || a.status === 'INTERVIEW').length;
  const underReviewCount = companyApplications.filter((a) => a.status === 'UNDER_REVIEW' || a.status === 'APPLIED').length;

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = newSkills.split(',').map((s) => s.trim()).filter(Boolean);
    const respArray = newResponsibilities.split('\n').map((s) => s.trim()).filter(Boolean);

    createJob({
      title: newTitle,
      department: newDepartment,
      description: newDescription,
      requiredSkills: skillsArray.length > 0 ? skillsArray : ['Java', 'Spring Boot', 'SQL'],
      responsibilities: respArray.length > 0 ? respArray : ['Build scalable features.'],
      education: newEducation,
      experienceMinYears: Number(newExperience),
      employmentType: newEmploymentType,
      location: newLocation,
      workMode: newWorkMode,
      salaryRange: newSalary,
      openings: Number(newOpenings),
      deadline: newDeadline,
      status: 'PUBLISHED',
    });

    setShowCreateModal(false);
    // Reset form
    setNewTitle('');
    setNewDescription('');
    setNewSkills('');
    setNewResponsibilities('');
    alert('Job opening published successfully to NovaTech portal!');
  };

  const exportScreeningReport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(companyApplications, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `novatech_screening_report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Company Profile Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-navy-900 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-md shadow-blue-900/10">
            NT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-navy-950">{activeCompany.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                VERIFIED TENANT
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeCompany.industry} • {activeCompany.location} • Recruiter Portal
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition shadow-sm flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Create Job Opening
          </button>

          <button
            onClick={exportScreeningReport}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 transition shadow-sm flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Export Screening Results
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'OVERVIEW'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Dashboard Overview
        </button>

        <button
          onClick={() => setActiveTab('APPLICANTS')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'APPLICANTS'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <Users className="w-4 h-4" />
          Applicants ({companyApplications.length})
        </button>

        <button
          onClick={() => setActiveTab('SCREENING')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'SCREENING'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Resume Screening Engine
        </button>

        <button
          onClick={() => setActiveTab('JOBS')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'JOBS'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Job Postings ({companyJobs.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8">
          {/* Metrics 4 Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Job Postings</span>
              <div className="text-3xl font-extrabold text-navy-950">{activeJobs}</div>
              <span className="text-[11px] text-slate-400">of {totalJobs} total positions</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Received Resumes</span>
              <div className="text-3xl font-extrabold text-blue-600">{totalApplicants}</div>
              <span className="text-[11px] text-slate-400">Parsed via Apache PDFBox / POI</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Shortlisted Candidates</span>
              <div className="text-3xl font-extrabold text-emerald-600">{shortlistedCount}</div>
              <span className="text-[11px] text-slate-400">Match score &gt; 80%</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Under Review / Pending</span>
              <div className="text-3xl font-extrabold text-amber-600">{underReviewCount}</div>
              <span className="text-[11px] text-slate-400">Awaiting recruiter action</span>
            </div>
          </div>

          {/* Quick Screening Summary Table */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-navy-950">Recent Candidate Screenings</h3>
                <p className="text-xs text-slate-500">Latest parsed applicants evaluated against NovaTech criteria</p>
              </div>
              <button
                onClick={() => setActiveTab('SCREENING')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Open Full Screening Tool →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Candidate</th>
                    <th className="py-3 px-4">Target Job</th>
                    <th className="py-3 px-4">Match %</th>
                    <th className="py-3 px-4">Matched Skills</th>
                    <th className="py-3 px-4">Missing Skills</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {companyApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-navy-950">{app.candidateName}</div>
                        <div className="text-[11px] text-slate-400">{app.candidateEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">{app.jobTitle}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full font-bold text-xs ${
                            (app.screeningResult?.matchPercentage || 0) >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : (app.screeningResult?.matchPercentage || 0) >= 50
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {app.screeningResult?.matchPercentage ?? 'N/A'}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {app.screeningResult?.matchedSkills.slice(0, 3).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px]">
                              {s}
                            </span>
                          ))}
                          {(app.screeningResult?.matchedSkills.length || 0) > 3 && (
                            <span className="text-[10px] text-slate-400">
                              +{(app.screeningResult?.matchedSkills.length || 0) - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {app.screeningResult?.missingSkills.slice(0, 2).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-[10px]">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedAppId(app.id);
                            setActiveTab('SCREENING');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-medium text-[11px]"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPLICANTS LIST */}
      {activeTab === 'APPLICANTS' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={applicantSearch}
                onChange={(e) => setApplicantSearch(e.target.value)}
                placeholder="Search applicants by name, title, or skills..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto text-xs">
              <select
                value={filterJob}
                onChange={(e) => setFilterJob(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="ALL">All Jobs</option>
                {companyJobs.map((j) => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
              >
                <option value="ALL">All Statuses</option>
                <option value="APPLIED">Applied</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="SHORTLISTED">Shortlisted</option>
                <option value="INTERVIEW">Interview</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Applied Job</th>
                  <th className="py-3 px-4">Resume File</th>
                  <th className="py-3 px-4">Match %</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Update Decision</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-950">{app.candidateName}</div>
                      <div className="text-[11px] text-slate-400">{app.candidateHeadline}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{app.jobTitle}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{app.resumeFileName}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-navy-950">
                        {app.screeningResult?.matchPercentage ?? 'N/A'}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        app.status === 'SHORTLISTED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'INTERVIEW'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'REJECTED'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                        className="py-1 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
                      >
                        <option value="APPLIED">Applied</option>
                        <option value="UNDER_REVIEW">Under Review</option>
                        <option value="SHORTLISTED">Shortlisted</option>
                        <option value="INTERVIEW">Interview</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedAppId(app.id);
                          setActiveTab('SCREENING');
                        }}
                        className="px-2.5 py-1 bg-navy-900 text-white rounded-lg text-[11px] font-semibold hover:bg-navy-800"
                      >
                        Inspect Breakdown
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RESUME SCREENING ENGINE */}
      {activeTab === 'SCREENING' && selectedApp && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  Automated Screening Inspection
                </span>
                <h2 className="text-xl font-bold text-navy-950 mt-0.5">
                  {selectedApp.candidateName} — {selectedApp.jobTitle}
                </h2>
                <p className="text-xs text-slate-500">
                  Application ID: {selectedApp.id} • Attached: {selectedApp.resumeFileName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    await screenApplication(selectedApp.id);
                    alert(`Re-screened ${selectedApp.candidateName}! Results refreshed.`);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
                >
                  Re-Run Skill Matcher
                </button>

                <select
                  value={selectedApp.status}
                  onChange={(e) => updateApplicationStatus(selectedApp.id, e.target.value as ApplicationStatus)}
                  className="py-1.5 px-3 rounded-lg border border-slate-300 text-xs font-semibold text-navy-950"
                >
                  <option value="APPLIED">Applied</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>

            {selectedApp.screeningResult ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Score & Formula Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 text-white space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                      Evaluated Score
                    </span>
                    <div className="text-5xl font-extrabold mt-1">
                      {selectedApp.screeningResult.matchPercentage}%
                    </div>
                    <span className="text-xs text-slate-300 mt-1 block">
                      {selectedApp.screeningResult.matchedCount} of {selectedApp.screeningResult.totalRequiredSkills} Skills Verified
                    </span>
                  </div>

                  <div className="pt-3 border-t border-navy-800 space-y-1">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Scoring Formula</span>
                    <p className="text-xs font-mono text-emerald-300">
                      {selectedApp.screeningResult.scoringFormula}
                    </p>
                  </div>

                  <div className="text-[11px] text-slate-400">
                    Screened: {selectedApp.screeningResult.screenedAt}
                  </div>
                </div>

                {/* Matched & Missing Skills */}
                <div className="md:col-span-2 space-y-5">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Matched Skills ({selectedApp.screeningResult.matchedSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedApp.screeningResult.matchedSkills.map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      Missing Mandatory Skills ({selectedApp.screeningResult.missingSkills.length})
                    </h4>
                    {selectedApp.screeningResult.missingSkills.length === 0 ? (
                      <p className="text-xs text-emerald-700 font-medium">None! Full skill coverage.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedApp.screeningResult.missingSkills.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-md text-xs font-medium bg-rose-100 text-rose-800">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
                    <span className="font-bold">Recruiter Screening Explanation:</span>
                    <p className="leading-relaxed">{selectedApp.screeningResult.explanation}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <button
                  onClick={() => screenApplication(selectedApp.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
                >
                  Execute Screening on {selectedApp.candidateName}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: JOB POSTINGS */}
      {activeTab === 'JOBS' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-navy-950">Published & Draft Postings</h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              Add New Job
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {companyJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-blue-600 font-semibold">{job.department}</span>
                    <h4 className="text-lg font-bold text-navy-950 mt-0.5">{job.title}</h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    job.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {job.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{job.description}</p>

                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{job.salaryRange}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateJobStatus(job.id, job.status === 'PUBLISHED' ? 'CLOSED' : 'PUBLISHED')
                      }
                      className="text-xs text-blue-600 font-medium hover:underline"
                    >
                      {job.status === 'PUBLISHED' ? 'Close Job' : 'Publish Job'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-navy-950">Create New Job Posting</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lead Microservices Architect"
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Work Mode</label>
                  <select
                    value={newWorkMode}
                    onChange={(e) => setNewWorkMode(e.target.value as any)}
                    className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mandatory Skills (Comma separated — used for automated screening)
                </label>
                <input
                  type="text"
                  required
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="Java, Spring Boot, REST APIs, PostgreSQL, Docker, Kubernetes"
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Summarize the core expectations and company mission..."
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  value={newResponsibilities}
                  onChange={(e) => setNewResponsibilities(e.target.value)}
                  placeholder="Design microservice architectures&#10;Optimize SQL persistence queries&#10;Implement Spring Security JWT auth"
                  className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                >
                  Publish Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <BackendStatusBadge featureName="NovaTech Recruiter Scope" />
    </div>
  );
}
