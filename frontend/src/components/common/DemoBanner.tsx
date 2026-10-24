'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ShieldAlert, RefreshCw, UserCheck, Briefcase, Key } from 'lucide-react';

export default function DemoBanner() {
  const { isDemoMode, demoRole, loginAsDemo, logout, resetDemoData, isBackendConnected } = useApp();

  return (
    <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 text-white text-xs sm:text-sm py-2 px-4 shadow-inner border-b border-navy-700/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            DEMO MODE — SAMPLE DATA (NovaTech Solutions)
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Isolated Preview Environment • Java Spring Boot Backend:
          </span>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            isBackendConnected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
          }`}>
            {isBackendConnected ? '● Backend Connected' : '○ Standalone Preview Ready'}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <span className="text-slate-400 text-xs">Switch Persona:</span>
          <button
            onClick={() => loginAsDemo('COMPANY')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
              demoRole === 'COMPANY'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            Recruiter (NovaTech)
          </button>

          <button
            onClick={() => loginAsDemo('CANDIDATE')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
              demoRole === 'CANDIDATE'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            Candidate (Alex)
          </button>

          <button
            onClick={() => loginAsDemo('SUPERADMIN')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
              demoRole === 'SUPERADMIN'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-navy-800 text-slate-300 hover:bg-navy-700'
            }`}
          >
            <Key className="w-3 h-3" />
            Superadmin
          </button>

          <button
            onClick={resetDemoData}
            title="Reset sample candidate, jobs, and applications"
            className="p-1 rounded bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {demoRole && (
            <button
              onClick={logout}
              className="text-xs text-rose-300 hover:text-rose-200 underline ml-1"
            >
              Exit Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
