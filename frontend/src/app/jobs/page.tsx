'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Briefcase,
  MapPin,
  Building,
  Clock,
  Filter,
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';

function JobsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { jobs } = useApp();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCompany, setSelectedCompany] = useState('ALL');
  const [selectedWorkMode, setSelectedWorkMode] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedSkill, setSelectedSkill] = useState('ALL');

  // Only published jobs
  const publishedJobs = useMemo(() => {
    return jobs.filter((j) => j.status === 'PUBLISHED');
  }, [jobs]);

  // Extract all unique skills & companies for filters
  const allSkills = useMemo(() => {
    const set = new Set<string>();
    publishedJobs.forEach((j) => j.requiredSkills.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [publishedJobs]);

  const allCompanies = useMemo(() => {
    const set = new Set<string>();
    publishedJobs.forEach((j) => set.add(j.companyName));
    return Array.from(set).sort();
  }, [publishedJobs]);

  // Filtered list
  const filteredJobs = useMemo(() => {
    return publishedJobs.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.requiredSkills.some((s) => s.toLowerCase().includes(query.toLowerCase()));

      const matchesCompany = selectedCompany === 'ALL' || job.companyName === selectedCompany;
      const matchesWorkMode = selectedWorkMode === 'ALL' || job.workMode === selectedWorkMode;
      const matchesType = selectedType === 'ALL' || job.employmentType === selectedType;
      const matchesSkill = selectedSkill === 'ALL' || job.requiredSkills.includes(selectedSkill);

      return matchesQuery && matchesCompany && matchesWorkMode && matchesType && matchesSkill;
    });
  }, [publishedJobs, query, selectedCompany, selectedWorkMode, selectedType, selectedSkill]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Public Career Opportunities
          </span>
          <h1 className="text-3xl font-extrabold text-navy-950 mt-1">
            Browse Active Job Postings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Discover roles verified for automated skill matching and transparent screening
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/screening"
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs border border-blue-200 transition flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Test Resume Matcher
          </Link>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by role title, keyword, or skill (e.g., Java, Spring, React, Docker)..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Company
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Companies</option>
              {allCompanies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Work Mode
            </label>
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Employment Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Employment Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Contract">Contract</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Key Skill Tag
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-blue-500 font-medium"
            >
              <option value="ALL">All Skills</option>
              {allSkills.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Reset */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong>{filteredJobs.length}</strong> of {publishedJobs.length} active opportunities
        </span>
        {(query || selectedCompany !== 'ALL' || selectedWorkMode !== 'ALL' || selectedType !== 'ALL' || selectedSkill !== 'ALL') && (
          <button
            onClick={() => {
              setQuery('');
              setSelectedCompany('ALL');
              setSelectedWorkMode('ALL');
              setSelectedType('ALL');
              setSelectedSkill('ALL');
            }}
            className="text-blue-600 hover:underline font-medium"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Job Cards Grid */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-navy-950">No jobs match your search criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing your filters to see available positions.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {job.companyName}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium">{job.department}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {job.workMode}
                  </span>
                </div>

                <div>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-lg font-bold text-navy-950 group-hover:text-blue-600 transition"
                  >
                    {job.title}
                  </Link>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-semibold text-slate-400 mr-1">Required:</span>
                  {job.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-navy-900">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    {job.salaryRange}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Deadline: {job.deadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    {job.openings} opening{job.openings > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Action column */}
              <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                <Link
                  href={`/jobs/${job.id}`}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs transition shadow-sm text-center flex items-center justify-center gap-1.5"
                >
                  <span>View Details & Apply</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <BackendStatusBadge featureName="Public Job Registry" />
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-xs text-slate-500">
          Loading active career openings...
        </div>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
