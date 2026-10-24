'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Server,
  Database,
  Cpu,
  Shield,
  Layers,
  BookOpen,
  Code2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Terminal,
  PlayCircle
} from 'lucide-react';
import BackendStatusBadge from '@/components/common/BackendStatusBadge';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Academic & Viva Presentation Reference
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 tracking-tight">
          AI Resume Screening System
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Comprehensive project guide, architecture blueprints, mathematical scoring formula, and oral examination (viva voce) explanations.
        </p>
      </div>

      {/* Mathematical Scoring Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            ∑
          </div>
          <div>
            <h2 className="text-xl font-bold text-navy-950">Deterministic Skill Scoring Formula</h2>
            <p className="text-xs text-slate-500">Explainable, human-auditable recruitment algorithms</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-navy-950 text-white space-y-3 font-mono">
          <div className="text-xs text-blue-300 font-bold uppercase tracking-wider">
            Mathematical Definition:
          </div>
          <div className="text-base sm:text-lg text-emerald-300 font-bold">
            Match Percentage = ( | S_matched | / | S_required | ) × 100
          </div>
          <div className="text-xs text-slate-300 font-sans leading-relaxed pt-2 border-t border-navy-800">
            Where <code className="text-blue-300 font-mono">S_required</code> is the set of normalized required technical skills defined by the hiring company, and <code className="text-blue-300 font-mono">S_matched</code> is the intersection of required tokens discovered within the sanitized plain text extracted from the candidate&apos;s PDF/DOCX document.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-navy-950">1. Token Normalization & Edge Cases</h3>
            <p className="text-slate-600 leading-relaxed">
              Input text is converted to lowercase, extra whitespace and non-alphanumeric punctuation are sanitized, and skill abbreviations (e.g. &quot;JS&quot; vs &quot;JavaScript&quot;) are resolved without double-counting duplicated occurrences.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-navy-950">2. Human-in-the-Loop Principle</h3>
            <p className="text-slate-600 leading-relaxed">
              The engine serves as a decision-support system. Scores provide recommendations (Shortlist, Under Review, Low Match) and empower human recruiters to make final hiring choices without autonomous disqualification.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-navy-950">Technology Stack & Architectural Roles</h2>
          <p className="text-xs text-slate-500">Separation of concerns between presentation, business logic, and persistence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-950">Frontend Layer</h3>
                <span className="text-xs text-slate-400">Next.js 14, React 18, TypeScript, Tailwind CSS</span>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Responsive, accessible UI with white and navy-blue corporate styling.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Client-side state management for isolated NovaTech demonstration mode.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Form validation, upload progress meters, and dynamic screening viewers.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-950">Backend REST APIs</h3>
                <span className="text-xs text-slate-400">Java 17/21, Spring Boot 3, Spring Security</span>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>Stateless JWT token authentication with server-side role validation (RBAC).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>Apache PDFBox 3.0 & Apache POI 5.2 for secure PDF/DOCX stream extraction.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>Isolated tenant boundaries preventing unauthorized cross-company access.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-950">Relational Database</h3>
                <span className="text-xs text-slate-400">PostgreSQL / MySQL with JPA / Hibernate</span>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Normalized schemas: Users, Companies, Jobs, Applications, ScreeningResults.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Audit logging table for security traceability and compliance verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Foreign key cascades and indexes on search keywords and application statuses.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-950">Security & Document Safety</h3>
                <span className="text-xs text-slate-400">MIME validation, size limits, private storage</span>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Resumes never stored in public web-accessible root directories.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>BCrypt password hashing with high salt rounds on the Spring Boot server.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Magic-byte header inspection prevents malicious executable uploads.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* College Viva Voce Q&A Cheat Sheet */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Oral Examination Prep</span>
          <h2 className="text-2xl font-bold text-navy-950 mt-0.5">Top College Viva Voce Questions & Answers</h2>
          <p className="text-xs text-slate-500">Prepared answers for the most common questions asked by academic examiners</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-navy-950">
              Q1: Why did you choose Java with Spring Boot instead of Python for the backend?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Answer:</strong> Java and Spring Boot provide enterprise-grade type safety, thread-safe concurrent API handling, and mature libraries like Apache PDFBox and Apache POI for document processing. Spring Security offers robust role-based access control (RBAC), and Spring Data JPA guarantees ACID transactions across relational database entities, making it the industry standard for enterprise HR platforms.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-navy-950">
              Q2: How does the system extract text from uploaded PDF and Word documents?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Answer:</strong> In the Java backend, we utilize <code>PDFTextStripper</code> from Apache PDFBox to parse binary PDF streams into UTF-8 text. For DOCX files, we use <code>XWPFDocument</code> and <code>XWPFWordExtractor</code> from Apache POI. Both parsers sanitize binary formatting, reject password-protected or corrupt documents, and yield a clean text token stream.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-navy-950">
              Q3: Is this system using a black-box AI model or an explainable algorithm?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Answer:</strong> The initial release uses a deterministic, rule-based skill comparison algorithm to guarantee 100% explainability. Recruiters and candidates can inspect every single matched skill, missing skill, and mathematical score. This complies with ethical AI and EEOC hiring standards because hiring decisions are transparent and auditable rather than dictated by an unexplainable black box.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-navy-950">
              Q4: How do you prevent Company A from seeing Company B&apos;s candidate resumes?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Answer:</strong> Multi-tenancy is enforced on the server in Spring Boot. We never rely on frontend button hiding or client-supplied IDs. Every API request extracts the authenticated user&apos;s <code>company_id</code> from the verified JWT claim and scopes database queries with <code>WHERE company_id = :authenticatedCompanyId</code>. Attempts to access other tenant IDs return HTTP 403 Forbidden.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-navy-950">
              Q5: How is demo data kept isolated from real production data?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Answer:</strong> The demo environment operates in a separate sandbox namespace populated exclusively with fictional entities (e.g. NovaTech Solutions, Alex Morgan). Demo credentials are read-only or session-scoped, preventing any write interference with real user tables or database migration snapshots.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-6 bg-slate-100 rounded-2xl border border-slate-200">
        <div>
          <h4 className="text-sm font-bold text-navy-950">Ready to explore the live application?</h4>
          <p className="text-xs text-slate-500">Test the recruiter dashboard, candidate portal, or public job listings</p>
        </div>
        <Link
          href="/demo"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition"
        >
          Launch Demo Experience
        </Link>
      </div>

      <BackendStatusBadge featureName="System Documentation" />
    </div>
  );
}
