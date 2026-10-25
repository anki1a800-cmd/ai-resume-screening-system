'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Company,
  Candidate,
  Job,
  Application,
  ScreeningResult,
  AuditLog,
  ApplicationStatus,
} from '../types';
import {
  MOCK_COMPANIES,
  MOCK_JOBS,
  MOCK_CANDIDATES,
  MOCK_APPLICATIONS,
  MOCK_AUDIT_LOGS,
} from '../data/mockData';
import { api } from '../services/api';

interface AppContextType {
  currentUser: User | null;
  isDemoMode: boolean;
  demoRole: UserRole | null;
  isBackendConnected: boolean;
  backendApiUrl: string;
  companies: Company[];
  jobs: Job[];
  candidates: Candidate[];
  applications: Application[];
  auditLogs: AuditLog[];
  activeCompany: Company;
  activeCandidate: Candidate;
  
  // Auth & Demo
  loginAsDemo: (role: UserRole) => void;
  login: (email: string, role?: UserRole, password?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  
  // Recruitment actions
  createJob: (jobData: Omit<Job, 'id' | 'createdAt' | 'companyId' | 'companyName' | 'companyLogo'>) => Promise<Job>;
  updateJobStatus: (jobId: string, status: Job['status']) => Promise<void>;
  applyForJob: (jobId: string, resumeFileName?: string, resumeText?: string) => Promise<Application>;
  screenApplication: (applicationId: string) => Promise<ScreeningResult>;
  screenCustomResume: (jobId: string, resumeText: string, candidateName: string, resumeFileName: string) => Promise<ScreeningResult>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  
  // Admin actions
  approveCompany: (companyId: string) => Promise<void>;
  suspendCompany: (companyId: string) => Promise<void>;
  
  // Candidate actions
  updateCandidateProfile: (updates: Partial<Candidate>) => void;
  uploadCandidateResume: (fileName: string, fileSize: string, text: string, type: 'pdf' | 'docx') => void;
  
  // Reset
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [demoRole, setDemoRole] = useState<UserRole | null>(null);
  
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';

  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);

  const activeCompany = companies.find((c) => c.id === 'comp-novatech') || companies[0];
  const activeCandidate = candidates.find((c) => c.id === 'cand-alex-morgan') || candidates[0];

  // Periodic health check
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await api.checkHealth();
        if (res && res.status === 'UP') {
          setIsBackendConnected(true);
        }
      } catch {
        setIsBackendConnected(false);
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  const loginAsDemo = (role: UserRole) => {
    setIsDemoMode(true);
    setDemoRole(role);

    if (role === 'COMPANY') {
      setCurrentUser({
        id: 'demo-recruiter-1',
        email: 'recruiter@novatech-demo.com',
        name: 'Sarah Chen (NovaTech Recruiter)',
        role: 'COMPANY',
        isDemo: true,
      });
    } else if (role === 'CANDIDATE') {
      setCurrentUser({
        id: 'cand-alex-morgan',
        email: 'alex.morgan@example.com',
        name: 'Alex Morgan',
        role: 'CANDIDATE',
        isDemo: true,
      });
    } else if (role === 'SUPERADMIN') {
      setCurrentUser({
        id: 'demo-admin-1',
        email: 'superadmin@system.local',
        name: 'System Administrator (Restricted Demo)',
        role: 'SUPERADMIN',
        isDemo: true,
      });
    }

    addAuditLog(role, 'DEMO_LOGIN', `Logged into ${role} demo dashboard with isolated sample data.`);
  };

  const login = async (email: string, designatedRole: UserRole = 'CANDIDATE', password?: string) => {
    if (isBackendConnected && password) {
      try {
        const res = await api.auth.login({ email, password });
        api.setToken(res.token);
        setIsDemoMode(false);
        setCurrentUser({
          id: res.id,
          email: res.email,
          name: res.name || email.split('@')[0],
          role: res.role as UserRole,
          isDemo: false,
        });
        return { success: true, message: 'Logged in via Spring Boot backend.' };
      } catch (err: any) {
        console.warn('Backend login error, falling back to simulated session:', err.message);
      }
    }

    // Preview / Standalone session
    setIsDemoMode(false);
    setCurrentUser({
      id: `usr-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: designatedRole,
      isDemo: false,
    });
    return { success: true, message: 'Authenticated in Preview Mode.' };
  };

  const logout = () => {
    api.setToken(null);
    setCurrentUser(null);
    setDemoRole(null);
    setIsDemoMode(true);
  };

  const addAuditLog = (role: UserRole, action: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorEmail: currentUser ? currentUser.email : 'demo-visitor@preview.local',
      role,
      action,
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Explainable Skill Matching Algorithm
  const calculateSkillMatch = (
    resumeText: string,
    requiredSkills: string[],
    jobTitle: string,
    candidateName: string,
    companyName: string,
    applicationId: string
  ): ScreeningResult => {
    const textLower = (resumeText || '').toLowerCase();
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    requiredSkills.forEach((skill) => {
      const cleanSkill = skill.trim();
      const escaped = cleanSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-zA-Z0-9#+])${escaped}([^a-zA-Z0-9#+]|$)`, 'i');
      if (regex.test(textLower) || textLower.includes(cleanSkill.toLowerCase())) {
        matchedSkills.push(cleanSkill);
      } else {
        missingSkills.push(cleanSkill);
      }
    });

    const total = requiredSkills.length;
    const matchedCount = matchedSkills.length;
    const matchPercentage = total > 0 ? Math.round((matchedCount / total) * 100) : 0;

    let explanation = '';
    const suggestions: string[] = [];

    if (matchPercentage >= 80) {
      explanation = `Strong suitability. Candidate demonstrates verified competency in ${matchedCount} of ${total} mandatory qualifications (${matchPercentage}%).`;
    } else if (matchPercentage >= 50) {
      explanation = `Moderate suitability. Candidate matches ${matchedCount} of ${total} core skills. Additional review advised for missing items: ${missingSkills.join(', ')}.`;
      suggestions.push(`Add specific projects or certifications covering: ${missingSkills.slice(0, 3).join(', ')}.`);
    } else {
      explanation = `Low alignment for this specific role (${matchPercentage}%). Missing critical technical requirements: ${missingSkills.join(', ')}.`;
      suggestions.push(`Focus your resume headline and skills section on: ${missingSkills.slice(0, 4).join(', ')}.`);
    }

    return {
      id: `screen-${Date.now()}`,
      applicationId,
      candidateName,
      jobTitle,
      companyName,
      matchPercentage,
      totalRequiredSkills: total,
      matchedCount,
      matchedSkills,
      missingSkills,
      scoringFormula: `Match % = (Matched Skills: ${matchedCount} / Total Required: ${total}) × 100 = ${matchPercentage}%`,
      explanation,
      screenedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      suggestionsForCandidate: suggestions,
      aiNotes: 'Calculated using Java-compatible deterministic token comparison. Transparent & human-auditable.',
    };
  };

  const screenApplication = async (applicationId: string): Promise<ScreeningResult> => {
    if (isBackendConnected) {
      try {
        const res = await api.screening.evaluate(applicationId);
        const result: ScreeningResult = {
          id: res.id,
          applicationId: res.applicationId,
          candidateName: res.candidateName,
          jobTitle: res.jobTitle,
          companyName: res.companyName,
          matchPercentage: res.matchPercentage,
          totalRequiredSkills: res.totalRequiredSkills,
          matchedCount: res.matchedCount,
          matchedSkills: res.matchedSkills,
          missingSkills: res.missingSkills,
          scoringFormula: res.scoringFormula,
          explanation: res.explanation,
          screenedAt: res.screenedAt,
          suggestionsForCandidate: res.suggestions,
        };
        setApplications((prev) =>
          prev.map((a) => (a.id === applicationId ? { ...a, screeningResult: result } : a))
        );
        return result;
      } catch (err) {
        console.warn('Backend screening failed, falling back to local calculation');
      }
    }

    const app = applications.find((a) => a.id === applicationId);
    if (!app) throw new Error('Application not found');

    const job = jobs.find((j) => j.id === app.jobId);
    const candidate = candidates.find((c) => c.id === app.candidateId);
    const resumeText = candidate?.resumeExtractedText || app.candidateHeadline;
    const requiredSkills = job?.requiredSkills || [];

    const result = calculateSkillMatch(
      resumeText,
      requiredSkills,
      app.jobTitle,
      app.candidateName,
      app.companyName,
      app.id
    );

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, screeningResult: result } : a))
    );

    addAuditLog('COMPANY', 'RESUME_SCREENED', `Screened ${app.candidateName} for ${app.jobTitle} (Score: ${result.matchPercentage}%)`);
    return result;
  };

  const screenCustomResume = async (
    jobId: string,
    resumeText: string,
    candidateName: string,
    resumeFileName: string
  ): Promise<ScreeningResult> => {
    const job = jobs.find((j) => j.id === jobId);
    const requiredSkills = job ? job.requiredSkills : ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL'];
    const jobTitle = job ? job.title : 'General Engineering Role';
    const compName = job ? job.companyName : 'NovaTech Solutions';

    if (isBackendConnected) {
      try {
        const res = await api.screening.simulate({
          resumeText,
          requiredSkills,
          jobTitle,
          candidateName,
        });
        return {
          id: res.id,
          applicationId: res.applicationId,
          candidateName: res.candidateName,
          jobTitle: res.jobTitle,
          companyName: res.companyName,
          matchPercentage: res.matchPercentage,
          totalRequiredSkills: res.totalRequiredSkills,
          matchedCount: res.matchedCount,
          matchedSkills: res.matchedSkills,
          missingSkills: res.missingSkills,
          scoringFormula: res.scoringFormula,
          explanation: res.explanation,
          screenedAt: res.screenedAt,
          suggestionsForCandidate: res.suggestions,
        };
      } catch (err) {
        console.warn('Backend simulator failed, using local engine');
      }
    }

    return calculateSkillMatch(
      resumeText,
      requiredSkills,
      jobTitle,
      candidateName,
      compName,
      `temp-${Date.now()}`
    );
  };

  const applyForJob = async (
    jobId: string,
    resumeFileName: string = 'Alex_Morgan_Resume.pdf',
    resumeText?: string
  ): Promise<Application> => {
    const job = jobs.find((j) => j.id === jobId);
    if (!job) throw new Error('Job not found');

    const candidate = currentUser?.role === 'CANDIDATE' && candidates.find((c) => c.userId === currentUser.id)
      ? candidates.find((c) => c.userId === currentUser.id)!
      : activeCandidate;

    const extracted = resumeText || candidate.resumeExtractedText || candidate.skills.join(', ');

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      candidateId: candidate.id,
      companyId: job.companyId,
      candidateName: candidate.name,
      candidateEmail: candidate.email,
      candidateHeadline: candidate.headline,
      jobTitle: job.title,
      companyName: job.companyName,
      resumeFileName,
      appliedAt: new Date().toISOString().substring(0, 10),
      status: 'APPLIED',
    };

    const screenRes = calculateSkillMatch(
      extracted,
      job.requiredSkills,
      job.title,
      candidate.name,
      job.companyName,
      newApp.id
    );
    newApp.screeningResult = screenRes;

    setApplications((prev) => [newApp, ...prev]);
    addAuditLog('CANDIDATE', 'JOB_APPLICATION', `${candidate.name} submitted application for ${job.title} at ${job.companyName}`);

    if (isBackendConnected) {
      try {
        await api.applications.apply(jobId);
      } catch (e) {
        console.warn('Backend application sync:', e);
      }
    }

    return newApp;
  };

  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status } : app))
    );
    addAuditLog('COMPANY', 'STATUS_CHANGE', `Application ${applicationId} status updated to ${status}`);

    if (isBackendConnected) {
      try {
        await api.applications.updateStatus(applicationId, status);
      } catch (e) {
        console.warn('Backend status update sync:', e);
      }
    }
  };

  const createJob = async (
    jobData: Omit<Job, 'id' | 'createdAt' | 'companyId' | 'companyName' | 'companyLogo'>
  ): Promise<Job> => {
    const newJob: Job = {
      ...jobData,
      id: `job-nova-${Date.now().toString().slice(-4)}`,
      companyId: activeCompany.id,
      companyName: activeCompany.name,
      companyLogo: activeCompany.logo,
      createdAt: new Date().toISOString().substring(0, 10),
    };

    setJobs((prev) => [newJob, ...prev]);
    addAuditLog('COMPANY', 'JOB_CREATED', `Created new job: ${newJob.title}`);

    if (isBackendConnected) {
      try {
        await api.jobs.createJob(jobData);
      } catch (e) {
        console.warn('Backend job create sync:', e);
      }
    }

    return newJob;
  };

  const updateJobStatus = async (jobId: string, status: Job['status']) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)));
    if (isBackendConnected) {
      try {
        await api.jobs.updateStatus(jobId, status);
      } catch (e) {
        console.warn('Backend job status sync:', e);
      }
    }
  };

  const approveCompany = async (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, status: 'APPROVED' } : c))
    );
    addAuditLog('SUPERADMIN', 'COMPANY_APPROVAL', `Company ${companyId} approved for platform access.`);

    if (isBackendConnected) {
      try {
        await api.admin.approveCompany(companyId);
      } catch (e) {
        console.warn('Backend approve sync:', e);
      }
    }
  };

  const suspendCompany = async (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, status: 'SUSPENDED' } : c))
    );
    addAuditLog('SUPERADMIN', 'COMPANY_SUSPENSION', `Company ${companyId} suspended.`);

    if (isBackendConnected) {
      try {
        await api.admin.suspendCompany(companyId);
      } catch (e) {
        console.warn('Backend suspend sync:', e);
      }
    }
  };

  const updateCandidateProfile = (updates: Partial<Candidate>) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === activeCandidate.id ? { ...c, ...updates } : c))
    );
  };

  const uploadCandidateResume = (
    fileName: string,
    fileSize: string,
    text: string,
    type: 'pdf' | 'docx'
  ) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === activeCandidate.id
          ? {
              ...c,
              resumeFileName: fileName,
              resumeFileSize: fileSize,
              resumeFileType: type,
              resumeExtractedText: text,
              uploadedAt: new Date().toISOString().substring(0, 10),
            }
          : c
      )
    );
    addAuditLog('CANDIDATE', 'RESUME_UPLOADED', `Uploaded ${type.toUpperCase()} file: ${fileName} (${fileSize})`);
  };

  const resetDemoData = () => {
    setCompanies(MOCK_COMPANIES);
    setJobs(MOCK_JOBS);
    setCandidates(MOCK_CANDIDATES);
    setApplications(MOCK_APPLICATIONS);
    setAuditLogs(MOCK_AUDIT_LOGS);
    addAuditLog('SUPERADMIN', 'DEMO_RESET', 'Demo database reset to initial pristine state.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isDemoMode,
        demoRole,
        isBackendConnected,
        backendApiUrl,
        companies,
        jobs,
        candidates,
        applications,
        auditLogs,
        activeCompany,
        activeCandidate,
        loginAsDemo,
        login,
        logout,
        createJob,
        updateJobStatus,
        applyForJob,
        screenApplication,
        screenCustomResume,
        updateApplicationStatus,
        approveCompany,
        suspendCompany,
        updateCandidateProfile,
        uploadCandidateResume,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
