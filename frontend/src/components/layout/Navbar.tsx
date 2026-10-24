'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  FileText,
  Briefcase,
  Layers,
  Info,
  LogIn,
  PlayCircle,
  Menu,
  X,
  UserCheck,
  Building,
  ShieldCheck,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, logout, isDemoMode, demoRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardHref = () => {
    if (!currentUser) return '/login';
    if (currentUser.role === 'SUPERADMIN') return '/dashboard/superadmin';
    if (currentUser.role === 'COMPANY') return '/dashboard/company';
    return '/dashboard/candidate';
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Jobs', href: '/jobs' },
    { name: 'Screening Lab', href: '/screening' },
    { name: 'About & Viva', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy-900 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-navy-900 tracking-tight">AI Resume Screening</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-blue-100 text-blue-800 rounded">
                  System
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Full-Stack Spring Boot & Next.js Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link
                  href={getDashboardHref()}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-navy-900 text-white text-sm font-medium hover:bg-navy-800 transition shadow-sm"
                >
                  {currentUser.role === 'SUPERADMIN' && <ShieldCheck className="w-4 h-4 text-amber-400" />}
                  {currentUser.role === 'COMPANY' && <Building className="w-4 h-4 text-blue-300" />}
                  {currentUser.role === 'CANDIDATE' && <UserCheck className="w-4 h-4 text-emerald-300" />}
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-sm shadow-blue-500/20 transition-all hover:shadow"
                >
                  <PlayCircle className="w-4 h-4 text-blue-200" />
                  Demo Login
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-navy-900 hover:bg-slate-100 text-sm font-semibold border border-slate-200 transition"
                >
                  <LogIn className="w-4 h-4 text-slate-600" />
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/demo"
              className="px-2.5 py-1.5 rounded-md bg-blue-600 text-white text-xs font-semibold"
            >
              Demo
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <>
                <Link
                  href={getDashboardHref()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-navy-900 text-white font-medium text-sm"
                >
                  Go to {currentUser.role} Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center py-2 text-rose-600 text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm shadow-sm"
                >
                  Demo Login (NovaTech & Roles)
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 rounded-lg border border-slate-300 text-slate-800 font-medium text-sm"
                >
                  Sign In / Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
