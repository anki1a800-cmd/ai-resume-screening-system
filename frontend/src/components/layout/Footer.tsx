'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Shield, Terminal, BookOpen, ExternalLink, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-base text-white tracking-tight">AI Resume Screening</span>
                <span className="text-[10px] block text-blue-400 font-medium">Full-Stack College Project</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent, explainable resume parsing and skill-matching engine built with Next.js, React, Tailwind CSS, and Java Spring Boot.
            </p>
            <div className="pt-1">
              <span className="inline-block text-[11px] text-amber-300/90 bg-amber-950/60 border border-amber-800/50 px-2.5 py-1 rounded">
                Academic Showcase • Explainable AI
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white transition">Browse Job Openings</Link>
              </li>
              <li>
                <Link href="/screening" className="hover:text-white transition">Interactive Screening Lab</Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition text-blue-400 font-medium">Demo Role Switcher</Link>
              </li>
            </ul>
          </div>

          {/* Dashboards */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard/company" className="hover:text-white transition">NovaTech Recruiter Portal</Link>
              </li>
              <li>
                <Link href="/dashboard/candidate" className="hover:text-white transition">Candidate Career Portal</Link>
              </li>
              <li>
                <Link href="/dashboard/superadmin" className="hover:text-white transition">Superadmin Control Center</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition">Authentication Gateway</Link>
              </li>
            </ul>
          </div>

          {/* Architecture & College Viva */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Tech Stack & Viva</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Backend: Java 17/21 + Spring Boot 3
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                Parsing: Apache PDFBox & Apache POI
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Security: Spring Security & RBAC
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                Frontend: Next.js 14 + Tailwind CSS
              </li>
              <li className="pt-1">
                <Link href="/about" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  View College Viva Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-navy-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} AI Resume Screening System. Designed for academic and enterprise evaluation.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Isolated NovaTech Sandbox</span>
            <span>•</span>
            <span className="text-slate-400">Deterministic Scoring Formula</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
