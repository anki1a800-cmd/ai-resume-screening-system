'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  ShieldCheck,
  Building,
  Users,
  Briefcase,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Sliders,
  BarChart3,
  Terminal,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';
import { PLATFORM_STATS } from '@/data/mockData';

export default function SuperadminDashboardPage() {
  const {
    companies,
    jobs,
    candidates,
    applications,
    auditLogs,
    approveCompany,
    suspendCompany,
    updateJobStatus,
    resetDemoData,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'COMPANIES' | 'CANDIDATES' | 'JOBS' | 'AUDIT'>('OVERVIEW');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingCompanies = companies.filter((c) => c.status === 'PENDING_APPROVAL');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-navy-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              RESTRICTED SAMPLE EXPERIENCE
            </span>
            <span className="text-xs text-slate-400">• Role: Platform Superadmin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Superadmin Governance Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Platform-wide governance, company tenant verification, and immutable security audit logs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              resetDemoData();
              alert('Platform demo database reset to default pristine state.');
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Platform State
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'OVERVIEW'
              ? 'border-navy-900 text-navy-950'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Overview & Metrics
        </button>

        <button
          onClick={() => setActiveTab('COMPANIES')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'COMPANIES'
              ? 'border-navy-900 text-navy-950'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <Building className="w-4 h-4" />
          Companies ({companies.length})
          {pendingCompanies.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('CANDIDATES')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'CANDIDATES'
              ? 'border-navy-900 text-navy-950'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <Users className="w-4 h-4" />
          Candidates ({candidates.length})
        </button>

        <button
          onClick={() => setActiveTab('JOBS')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'JOBS'
              ? 'border-navy-900 text-navy-950'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          All Jobs ({jobs.length})
        </button>

        <button
          onClick={() => setActiveTab('AUDIT')}
          className={`px-4 py-2.5 font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === 'AUDIT'
              ? 'border-navy-900 text-navy-950'
              : 'border-transparent text-slate-600 hover:text-navy-950'
          }`}
        >
          <Terminal className="w-4 h-4" />
          Audit Logs ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Candidates</span>
              <div className="text-3xl font-extrabold text-navy-950">{PLATFORM_STATS.totalCandidates}</div>
              <span className="text-[10px] text-emerald-600 font-semibold">+18% this month</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Companies</span>
              <div className="text-3xl font-extrabold text-blue-600">{companies.length} Active</div>
              <span className="text-[10px] text-amber-600 font-semibold">{pendingCompanies.length} pending review</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Job Postings</span>
              <div className="text-3xl font-extrabold text-navy-900">{jobs.length} Published</div>
              <span className="text-[10px] text-slate-400">across 4 sectors</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Applications</span>
              <div className="text-3xl font-extrabold text-indigo-600">{applications.length}</div>
              <span className="text-[10px] text-slate-400">Parsed via Java</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Screening Precision</span>
              <div className="text-3xl font-extrabold text-emerald-600">{PLATFORM_STATS.screeningAccuracy}</div>
              <span className="text-[10px] text-slate-400">Avg time: {PLATFORM_STATS.averageScreeningTimeSec}</span>
            </div>
          </div>

          {/* Pending Company Approvals Notification */}
          {pendingCompanies.length > 0 && (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-amber-950">
                    Action Required: {pendingCompanies.length} Company Registration(s) Awaiting Review
                  </h3>
                  <p className="text-xs text-amber-800">
                    BioHealth Cloud Systems requested access. Verify credentials before publishing live listings.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('COMPANIES')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0"
              >
                Review Registrations
              </button>
            </div>
          )}

          {/* Recent Audits Table Preview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-navy-950">Security Audit Trail</h3>
              <button
                onClick={() => setActiveTab('AUDIT')}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                View Complete Log →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-y border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Timestamp</th>
                    <th className="py-2.5 px-4">Actor</th>
                    <th className="py-2.5 px-4">Role</th>
                    <th className="py-2.5 px-4">Action</th>
                    <th className="py-2.5 px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {auditLogs.slice(0, 5).map((log) => (
                    <tr key={log.id}>
                      <td className="py-2.5 px-4 text-slate-400">{log.timestamp}</td>
                      <td className="py-2.5 px-4 text-navy-950 font-semibold">{log.actorEmail}</td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                          {log.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-bold text-blue-700">{log.action}</td>
                      <td className="py-2.5 px-4 font-sans text-slate-600">{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPANIES MANAGEMENT */}
      {activeTab === 'COMPANIES' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-navy-950">Registered Company Organizations</h3>
              <span className="text-xs text-slate-500">{companies.length} records</span>
            </div>

            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4">Industry</th>
                  <th className="py-3 px-4">Headquarters</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companies.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-950">{c.name}</div>
                      <div className="text-[11px] text-slate-400">{c.contactEmail}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{c.industry}</td>
                    <td className="py-3.5 px-4 text-slate-500">{c.location}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        c.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.status === 'PENDING_APPROVAL'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {c.status !== 'APPROVED' ? (
                        <button
                          onClick={() => {
                            approveCompany(c.id);
                            alert(`Approved ${c.name} for platform access!`);
                          }}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs"
                        >
                          Approve Tenant
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            suspendCompany(c.id);
                            alert(`Suspended ${c.name}!`);
                          }}
                          className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg text-xs border border-rose-200"
                        >
                          Suspend Access
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CANDIDATES MANAGEMENT */}
      {activeTab === 'CANDIDATES' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h3 className="text-base font-bold text-navy-950">Candidate Profiles & Authorized Records</h3>
            </div>

            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Headline</th>
                  <th className="py-3 px-4">Skills</th>
                  <th className="py-3 px-4">Resume File</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-navy-950">{cand.name}</div>
                      <div className="text-[11px] text-slate-400">{cand.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{cand.headline}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {cand.skills.slice(0, 4).map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{cand.resumeFileName}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => alert(`Candidate record: ${cand.name}\nExtracted text size: ${cand.resumeExtractedText?.length || 0} characters`)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
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
      )}

      {/* TAB 4: ALL JOBS */}
      {activeTab === 'JOBS' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h3 className="text-base font-bold text-navy-950">Platform-Wide Job Postings</h3>
            </div>

            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-bold text-navy-950">{job.title}</td>
                    <td className="py-3.5 px-4 font-semibold text-blue-700">{job.companyName}</td>
                    <td className="py-3.5 px-4 text-slate-500">{job.location} ({job.workMode})</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        job.status === 'PUBLISHED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() =>
                          updateJobStatus(job.id, job.status === 'PUBLISHED' ? 'CLOSED' : 'PUBLISHED')
                        }
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeTab === 'AUDIT' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-base font-bold text-navy-950">Immutable Security Audit Trail</h3>
              <p className="text-xs text-slate-500">Every administrative, recruiter, and applicant action is tracked.</p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-700">[{log.action}]</span>
                      <span className="text-slate-500 text-[11px]">{log.timestamp}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">
                        {log.role}
                      </span>
                    </div>
                    <p className="font-sans text-slate-700 text-xs">{log.details}</p>
                  </div>
                  <div className="text-[11px] text-slate-400 shrink-0 font-sans">
                    By: {log.actorEmail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <BackendStatusBadge featureName="Superadmin Role Authorization" />
    </div>
  );
}
