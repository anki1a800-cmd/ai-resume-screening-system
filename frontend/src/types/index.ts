export type UserRole = 'SUPERADMIN' | 'COMPANY' | 'CANDIDATE';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isDemo?: boolean;
}

export type CompanyStatus = 'APPROVED' | 'PENDING_APPROVAL' | 'SUSPENDED';

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  website: string;
  contactEmail: string;
  location: string;
  status: CompanyStatus;
  createdAt: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  score?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Candidate {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  headline: string;
  location: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  resumeFileName?: string;
  resumeFileSize?: string;
  resumeFileType?: 'pdf' | 'docx';
  resumeExtractedText?: string;
  uploadedAt?: string;
}

export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';
export type EmploymentType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
export type JobStatus = 'PUBLISHED' | 'DRAFT' | 'CLOSED';

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  education: string;
  experienceMinYears: number;
  employmentType: EmploymentType;
  location: string;
  workMode: WorkMode;
  salaryRange: string;
  openings: number;
  deadline: string;
  status: JobStatus;
  createdAt: string;
  department: string;
}

export type ApplicationStatus = 'APPLIED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'REJECTED';

export interface ScreeningResult {
  id: string;
  applicationId: string;
  candidateName: string;
  jobTitle: string;
  companyName: string;
  matchPercentage: number;
  totalRequiredSkills: number;
  matchedCount: number;
  matchedSkills: string[];
  missingSkills: string[];
  scoringFormula: string;
  explanation: string;
  screenedAt: string;
  suggestionsForCandidate: string[];
  aiNotes?: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  companyId: string;
  candidateName: string;
  candidateEmail: string;
  candidateHeadline: string;
  jobTitle: string;
  companyName: string;
  resumeFileName: string;
  appliedAt: string;
  status: ApplicationStatus;
  screeningResult?: ScreeningResult;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorEmail: string;
  role: UserRole;
  action: string;
  details: string;
}
