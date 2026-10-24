'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building,
  UserCheck,
  AlertCircle,
  PlayCircle,
  Sparkles,
  Server
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { login, isBackendConnected } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [simulatedRole, setSimulatedRole] = useState<UserRole>('CANDIDATE');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      // In preview mode: authenticate locally; when backend is ready, this calls Spring Boot POST /api/auth/login
      await new Promise((res) => setTimeout(res, 600)); // simulate network round-trip

      // Determine simulated role based on user email or selector in preview
      let targetRole: UserRole = simulatedRole;
      if (email.toLowerCase().includes('admin')) {
        targetRole = 'SUPERADMIN';
      } else if (email.toLowerCase().includes('novatech') || email.toLowerCase().includes('recruiter') || email.toLowerCase().includes('company')) {
        targetRole = 'COMPANY';
      }

      await login(email, targetRole);

      // Role-aware destination
      if (targetRole === 'SUPERADMIN') {
        router.push('/dashboard/superadmin');
      } else if (targetRole === 'COMPANY') {
        router.push('/dashboard/company');
      } else {
        router.push('/dashboard/candidate');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-navy-900 to-blue-600 text-white shadow-md shadow-blue-900/10 mb-2">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
            Account Sign In
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Access your recruitment or candidate screening portal
          </p>
        </div>

        {/* Demo Fast-Track Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 text-center space-y-2.5">
          <div className="flex items-center justify-center gap-1.5 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Evaluation / College Demo Access
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Want to test without filling out passwords? Use our one-click simulated roles.
          </p>
          <Link
            href="/demo"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <PlayCircle className="w-4 h-4" />
            Open Demo Role Switcher (NovaTech)
          </Link>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com or alex.morgan@example.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset will be linked to Spring Boot Mail Service in Stage 3.')}
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Role Preview Selection helper (Stage 1 Preview) */}
          <div className="pt-1">
            <span className="block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
              Preview Role Destination:
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => {
                  setSimulatedRole('CANDIDATE');
                  setEmail('alex.morgan@example.com');
                  setPassword('demo1234');
                }}
                className={`py-1.5 px-2 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                  simulatedRole === 'CANDIDATE'
                    ? 'border-blue-500 bg-blue-50/70 text-blue-800 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Candidate
              </button>

              <button
                type="button"
                onClick={() => {
                  setSimulatedRole('COMPANY');
                  setEmail('recruiter@novatech-demo.com');
                  setPassword('demo1234');
                }}
                className={`py-1.5 px-2 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                  simulatedRole === 'COMPANY'
                    ? 'border-blue-500 bg-blue-50/70 text-blue-800 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                NovaTech
              </button>

              <button
                type="button"
                onClick={() => {
                  setSimulatedRole('SUPERADMIN');
                  setEmail('admin@system.local');
                  setPassword('demo1234');
                }}
                className={`py-1.5 px-2 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                  simulatedRole === 'SUPERADMIN'
                    ? 'border-blue-500 bg-blue-50/70 text-blue-800 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Superadmin
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 italic">
              * Note: In production, user permissions are strictly determined by the Spring Boot server database.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-navy-900 hover:bg-navy-800 text-white rounded-lg text-sm font-semibold transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Backend Note */}
        <BackendStatusBadge featureName="Authentication Service" />

        {/* Footer links */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:underline">
            Register as Candidate or Company
          </Link>
        </div>
      </div>
    </div>
  );
}
