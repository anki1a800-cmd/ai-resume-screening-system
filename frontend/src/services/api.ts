/**
 * Spring Boot REST API Client
 * Configurable via NEXT_PUBLIC_BACKEND_URL
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${res.status}`);
    }

    return res.json();
  }

  // Health check
  async checkHealth() {
    return this.request<{ status: string; backend: string }>('/health');
  }

  // Auth endpoints
  auth = {
    login: (credentials: { email: string; password: string }) =>
      this.request<{ token: string; id: string; email: string; role: string; name: string; companyId?: string }>(
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(credentials),
        }
      ),

    registerCandidate: (data: any) =>
      this.request<{ message: string }>('/auth/register/candidate', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    registerCompany: (data: any) =>
      this.request<{ message: string; companyId: string }>('/auth/register/company', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  };

  // Jobs endpoints
  jobs = {
    getPublicJobs: () => this.request<any[]>('/jobs/public'),
    getJobDetails: (id: string) => this.request<any>(`/jobs/public/${id}`),
    createJob: (data: any) =>
      this.request<any>('/jobs/company', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    getMyCompanyJobs: () => this.request<any[]>('/jobs/company/my-jobs'),
    updateStatus: (jobId: string, status: string) =>
      this.request<any>(`/jobs/company/${jobId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
  };

  // Resume endpoints
  resumes = {
    upload: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return this.request<any>('/candidate/resumes/upload', {
        method: 'POST',
        body: formData,
      });
    },
    getMyResume: () => this.request<any>('/candidate/resumes/my-resume'),
  };

  // Applications endpoints
  applications = {
    apply: (jobId: string) =>
      this.request<any>('/applications/apply', {
        method: 'POST',
        body: JSON.stringify({ jobId }),
      }),
    getMyApplications: () => this.request<any[]>('/applications/my-applications'),
    getCompanyApplicants: () => this.request<any[]>('/applications/company/applicants'),
    updateStatus: (applicationId: string, status: string) =>
      this.request<any>(`/applications/company/${applicationId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
  };

  // Screening endpoints
  screening = {
    evaluate: (applicationId: string) =>
      this.request<any>(`/screening/evaluate/${applicationId}`, {
        method: 'POST',
      }),
    simulate: (data: { resumeText: string; requiredSkills: string[]; jobTitle?: string; candidateName?: string }) =>
      this.request<any>('/screening/simulate', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  };

  // Admin endpoints
  admin = {
    getCompanies: () => this.request<any[]>('/admin/companies'),
    approveCompany: (id: string) =>
      this.request<any>(`/admin/companies/${id}/approve`, {
        method: 'PATCH',
      }),
    suspendCompany: (id: string) =>
      this.request<any>(`/admin/companies/${id}/suspend`, {
        method: 'PATCH',
      }),
    getAuditLogs: () => this.request<any[]>('/admin/audit-logs'),
    getPlatformMetrics: () => this.request<any>('/admin/platform-metrics'),
  };
}

export const api = new ApiClient();
