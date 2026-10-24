import { Company, Candidate, Job, Application, ScreeningResult, AuditLog } from '../types';

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'comp-novatech',
    name: 'NovaTech Solutions',
    logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&auto=format&fit=crop&q=80',
    industry: 'Enterprise Cloud & AI Systems',
    description: 'NovaTech Solutions builds scalable microservices, AI-assisted cloud pipelines, and next-generation enterprise SaaS architectures for global clients.',
    website: 'https://novatech-demo.example.com',
    contactEmail: 'careers@novatech-demo.com',
    location: 'Boston, MA (Hybrid / Remote)',
    status: 'APPROVED',
    createdAt: '2025-01-15',
  },
  {
    id: 'comp-cybershield',
    name: 'CyberShield Dynamics',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
    industry: 'Cybersecurity & Infrastructure',
    description: 'Protecting cloud workloads with zero-trust architecture and automated threat response engines.',
    website: 'https://cybershield-demo.example.com',
    contactEmail: 'talent@cybershield-demo.com',
    location: 'Austin, TX',
    status: 'APPROVED',
    createdAt: '2025-02-01',
  },
  {
    id: 'comp-biohealth',
    name: 'BioHealth Cloud Systems',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=128&auto=format&fit=crop&q=80',
    industry: 'Healthcare Technology',
    description: 'HIPAA-compliant analytics and modern patient telemetry processing engines.',
    website: 'https://biohealth-demo.example.com',
    contactEmail: 'hiring@biohealth-demo.com',
    location: 'San Francisco, CA',
    status: 'PENDING_APPROVAL',
    createdAt: '2025-03-10',
  },
  {
    id: 'comp-apexcloud',
    name: 'Apex Financial Technologies',
    logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&auto=format&fit=crop&q=80',
    industry: 'FinTech & High-Frequency Trading',
    description: 'Low-latency financial ledgers, algorithmic exchange connectivity, and real-time transaction screening.',
    website: 'https://apexfin-demo.example.com',
    contactEmail: 'recruiting@apexfin-demo.com',
    location: 'New York, NY',
    status: 'APPROVED',
    createdAt: '2025-02-18',
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-nova-101',
    companyId: 'comp-novatech',
    companyName: 'NovaTech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&auto=format&fit=crop&q=80',
    title: 'Senior Java & Spring Boot Backend Engineer',
    department: 'Core Platform Engineering',
    description: 'We are seeking a seasoned Java Backend Engineer to design, build, and optimize high-throughput Spring Boot microservices, REST APIs, and database persistence layers. You will lead system architecture and integrate with cloud message brokers.',
    responsibilities: [
      'Architect robust RESTful APIs and event-driven microservices using Java 17/21 and Spring Boot 3.',
      'Design relational schemas, complex queries, and indexing strategies in PostgreSQL/MySQL.',
      'Implement secure authentication, OAuth2/JWT token validation, and role-based authorization using Spring Security.',
      'Containerize services using Docker and orchestrate deployments via Kubernetes/AWS.',
      'Write comprehensive unit and integration tests using JUnit 5, Mockito, and Testcontainers.'
    ],
    requiredSkills: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Docker', 'Microservices', 'Spring Security', 'JUnit'],
    education: "Bachelor's or Master's in Computer Science or equivalent",
    experienceMinYears: 3,
    employmentType: 'Full-Time',
    location: 'Boston, MA',
    workMode: 'Hybrid',
    salaryRange: '$115,000 - $145,000 / yr',
    openings: 2,
    deadline: '2026-12-15',
    status: 'PUBLISHED',
    createdAt: '2025-10-01',
  },
  {
    id: 'job-nova-102',
    companyId: 'comp-novatech',
    companyName: 'NovaTech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&auto=format&fit=crop&q=80',
    title: 'Full Stack React & TypeScript Developer',
    department: 'Product Engineering',
    description: 'Looking for a passionate Full Stack developer to craft delightful web interfaces with Next.js, React, and TypeScript while collaborating closely with our Java backend API teams.',
    responsibilities: [
      'Build responsive, accessible, and fast web applications using Next.js 14, React, and Tailwind CSS.',
      'Manage client state, integrate REST APIs, and implement client-side validations.',
      'Collaborate with backend engineers to define API contracts and JSON schemas.',
      'Maintain automated testing suites using Vitest, Jest, and Playwright.'
    ],
    requiredSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git', 'JavaScript', 'HTML/CSS'],
    education: "Bachelor's in Computer Science, Software Engineering, or related field",
    experienceMinYears: 2,
    employmentType: 'Full-Time',
    location: 'Remote (US/Canada)',
    workMode: 'Remote',
    salaryRange: '$100,000 - $130,000 / yr',
    openings: 3,
    deadline: '2026-11-30',
    status: 'PUBLISHED',
    createdAt: '2025-10-05',
  },
  {
    id: 'job-nova-103',
    companyId: 'comp-novatech',
    companyName: 'NovaTech Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=128&auto=format&fit=crop&q=80',
    title: 'Cloud DevOps & Infrastructure Engineer',
    department: 'Site Reliability Engineering',
    description: 'Join our cloud infrastructure group to maintain multi-region Kubernetes clusters, CI/CD automated deployment pipelines, and infrastructure as code.',
    responsibilities: [
      'Manage AWS infrastructure using Terraform and Ansible.',
      'Create and maintain automated CI/CD pipelines in GitHub Actions.',
      'Set up observability, logging, and tracing using Prometheus, Grafana, and OpenTelemetry.',
      'Ensure high availability, disaster recovery, and SOC2 compliance.'
    ],
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Linux', 'Git'],
    education: "Bachelor's in Engineering or equivalent practical experience",
    experienceMinYears: 3,
    employmentType: 'Full-Time',
    location: 'Boston, MA',
    workMode: 'On-site',
    salaryRange: '$120,000 - $150,000 / yr',
    openings: 1,
    deadline: '2026-11-20',
    status: 'PUBLISHED',
    createdAt: '2025-09-28',
  },
  {
    id: 'job-cyber-201',
    companyId: 'comp-cybershield',
    companyName: 'CyberShield Dynamics',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=128&auto=format&fit=crop&q=80',
    title: 'Security Operations & Penetration Analyst',
    department: 'Offensive Security',
    description: 'Analyze security telemetry, execute penetration tests, and audit microservices against OWASP Top 10 vulnerabilities.',
    responsibilities: [
      'Perform vulnerability assessments across web applications and REST APIs.',
      'Implement automated SAST and DAST pipelines.',
      'Author technical incident response documentation and remediation advice.'
    ],
    requiredSkills: ['Cybersecurity', 'Penetration Testing', 'Linux', 'Python', 'Networking', 'OWASP'],
    education: "Bachelor's degree in Cybersecurity, IT, or Computer Science",
    experienceMinYears: 2,
    employmentType: 'Contract',
    location: 'Austin, TX',
    workMode: 'Hybrid',
    salaryRange: '$90,000 - $120,000 / yr',
    openings: 2,
    deadline: '2026-12-01',
    status: 'PUBLISHED',
    createdAt: '2025-10-10',
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-alex-morgan',
    userId: 'user-cand-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (617) 555-0192',
    headline: 'Senior Java & Spring Boot Backend Engineer | Cloud Enthusiast',
    location: 'Cambridge, MA',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Docker', 'Spring Security', 'JUnit', 'Git', 'Maven'],
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'Northeastern University',
        year: '2021',
        score: '3.8 GPA'
      }
    ],
    experience: [
      {
        role: 'Java Software Engineer',
        company: 'Beacon FinTech Systems',
        duration: '2021 - Present',
        description: 'Developed scalable Spring Boot REST APIs, reduced query latency by 40% with PostgreSQL indexing, and implemented JWT auth.'
      }
    ],
    resumeFileName: 'Alex_Morgan_Resume.pdf',
    resumeFileSize: '184 KB',
    resumeFileType: 'pdf',
    resumeExtractedText: `ALEX MORGAN
Email: alex.morgan@example.com | Phone: +1 (617) 555-0192 | Boston, MA
GitHub: github.com/alexmorgan-dev | LinkedIn: linkedin.com/in/alexmorgan

PROFESSIONAL SUMMARY
Results-driven Backend Software Engineer with 4 years of hands-on experience designing and deploying resilient enterprise architectures. Proficient in Java, Spring Boot, Spring Security, REST APIs, and PostgreSQL. Experienced with Docker containerization, Maven build lifecycles, and JUnit test automation.

TECHNICAL SKILLS
- Programming Languages: Java (11, 17, 21), SQL
- Frameworks & Libraries: Spring Boot, Spring Security, Hibernate ORM, JPA, JUnit, Mockito
- Databases: PostgreSQL, MySQL, Redis
- Tools & Cloud: Docker, Git, Maven, AWS (EC2, S3), Postman

PROFESSIONAL EXPERIENCE
Software Engineer | Beacon FinTech Systems (2021 - Present)
- Engineered high-traffic REST APIs handling 5,000+ requests/minute using Spring Boot and Java.
- Optimized PostgreSQL database schemas and connection pooling, cutting average API response time by 40%.
- Configured Spring Security with stateless JWT authentication and role-based permissions (RBAC).
- Authored 200+ unit and integration tests using JUnit and Mockito, raising code coverage to 89%.
- Packaged services into lightweight Docker containers for staging and production deployments.

EDUCATION
Bachelor of Science in Computer Science | Northeastern University (Graduated May 2021)
Honors: Magna Cum Laude (GPA 3.8/4.0)`,
    uploadedAt: '2025-10-12',
  },
  {
    id: 'cand-priya-sharma',
    userId: 'user-cand-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+1 (415) 555-0143',
    headline: 'Full Stack Web Developer | React & TypeScript Specialist',
    location: 'San Jose, CA',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git', 'JavaScript', 'HTML/CSS', 'Node.js'],
    education: [
      {
        degree: 'B.Tech in Information Technology',
        institution: 'National Institute of Technology',
        year: '2022',
        score: '8.9 CGPA'
      }
    ],
    experience: [
      {
        role: 'Frontend Engineer',
        company: 'Veloce Digital Labs',
        duration: '2022 - Present',
        description: 'Built interactive SaaS dashboards using Next.js, TypeScript, and Tailwind CSS. Integrated REST APIs.'
      }
    ],
    resumeFileName: 'Priya_Sharma_Resume.docx',
    resumeFileSize: '210 KB',
    resumeFileType: 'docx',
    resumeExtractedText: `PRIYA SHARMA
San Jose, CA | priya.sharma@example.com | Portfolio: priyasharma.dev

SUMMARY
Creative Full Stack Engineer specializing in React, Next.js, TypeScript, and modern Tailwind CSS design systems. Experienced in building responsive web applications and integrating secure REST APIs.

CORE COMPETENCIES
- Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML/CSS, Redux Toolkit
- Tools & Ecosystem: Git, GitHub, REST APIs, Node.js, Webpack, Figma
- Testing: Vitest, React Testing Library, Jest

WORK EXPERIENCE
Frontend Engineer | Veloce Digital Labs (2022 - Present)
- Built interactive client portals using Next.js 14 App Router, TypeScript, and Tailwind CSS.
- Integrated REST APIs with caching and optimistic UI updates.
- Improved accessibility audit scores to 98% across WCAG 2.1 AA standards.`,
    uploadedAt: '2025-10-14',
  },
  {
    id: 'cand-marcus-vance',
    userId: 'user-cand-3',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '+1 (312) 555-0872',
    headline: 'Junior Java Developer | Database & API Enthusiast',
    location: 'Chicago, IL',
    skills: ['Java', 'REST APIs', 'PostgreSQL', 'Docker', 'SQL', 'Git'],
    education: [
      {
        degree: 'B.S. in Software Engineering',
        institution: 'University of Illinois',
        year: '2023',
        score: '3.5 GPA'
      }
    ],
    experience: [
      {
        role: 'Associate Developer',
        company: 'Midwest Logistics Software',
        duration: '2023 - 2025',
        description: 'Maintained core Java services, SQL queries, and Docker containers.'
      }
    ],
    resumeFileName: 'Marcus_Vance_Resume.pdf',
    resumeFileSize: '160 KB',
    resumeFileType: 'pdf',
    resumeExtractedText: `MARCUS VANCE
Chicago, IL | marcus.vance@example.com
Core Skills: Java, REST APIs, PostgreSQL, Docker, Git. Basic familiarity with Spring Boot and JUnit.`,
    uploadedAt: '2025-10-16',
  },
  {
    id: 'cand-elena-rostova',
    userId: 'user-cand-4',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (206) 555-0329',
    headline: 'Data Analyst & Python Enthusiast',
    location: 'Seattle, WA',
    skills: ['Python', 'SQL', 'Pandas', 'Tableau', 'PowerBI'],
    education: [
      {
        degree: 'B.S. in Statistics & Data Analytics',
        institution: 'University of Washington',
        year: '2022',
        score: '3.6 GPA'
      }
    ],
    experience: [
      {
        role: 'Business Intelligence Analyst',
        company: 'Cascade Retail Analytics',
        duration: '2022 - Present',
        description: 'Built data dashboards, ran ETL scripts with Python and SQL.'
      }
    ],
    resumeFileName: 'Elena_Rostova_Resume.pdf',
    resumeFileSize: '145 KB',
    resumeFileType: 'pdf',
    resumeExtractedText: `ELENA ROSTOVA
Seattle, WA | elena.rostova@example.com
Skills: Python, SQL, Tableau, Pandas, PowerBI, Excel. Looking for backend or analyst opportunities.`,
    uploadedAt: '2025-10-18',
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-nova-001',
    jobId: 'job-nova-101',
    candidateId: 'cand-alex-morgan',
    companyId: 'comp-novatech',
    candidateName: 'Alex Morgan',
    candidateEmail: 'alex.morgan@example.com',
    candidateHeadline: 'Senior Java & Spring Boot Backend Engineer',
    jobTitle: 'Senior Java & Spring Boot Backend Engineer',
    companyName: 'NovaTech Solutions',
    resumeFileName: 'Alex_Morgan_Resume.pdf',
    appliedAt: '2025-10-12',
    status: 'SHORTLISTED',
    screeningResult: {
      id: 'screen-001',
      applicationId: 'app-nova-001',
      candidateName: 'Alex Morgan',
      jobTitle: 'Senior Java & Spring Boot Backend Engineer',
      companyName: 'NovaTech Solutions',
      matchPercentage: 88,
      totalRequiredSkills: 8,
      matchedCount: 7,
      matchedSkills: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Docker', 'Spring Security', 'JUnit'],
      missingSkills: ['Microservices'],
      scoringFormula: 'Match % = (Matched Skills: 7 / Required Skills: 8) × 100 = 87.5% ≈ 88%',
      explanation: 'Excellent candidate profile with 7 of 8 required technologies explicitly verified in resume text. Strong demonstrated history with Spring Boot, PostgreSQL optimization, Spring Security RBAC, and JUnit testing.',
      screenedAt: '2025-10-12 14:32:00',
      suggestionsForCandidate: [
        'Highlight distributed systems or microservice decoupling patterns in your project descriptions to achieve 100% keyword coverage.',
        'Mention message brokers (Kafka, RabbitMQ) if applicable to enterprise microservices.'
      ],
      aiNotes: 'Rule-based evaluation verified via extracted PDFBox text tokens. Highly recommended for technical interview round.'
    }
  },
  {
    id: 'app-nova-002',
    jobId: 'job-nova-102',
    candidateId: 'cand-priya-sharma',
    companyId: 'comp-novatech',
    candidateName: 'Priya Sharma',
    candidateEmail: 'priya.sharma@example.com',
    candidateHeadline: 'Full Stack Web Developer | React & TypeScript',
    jobTitle: 'Full Stack React & TypeScript Developer',
    companyName: 'NovaTech Solutions',
    resumeFileName: 'Priya_Sharma_Resume.docx',
    appliedAt: '2025-10-14',
    status: 'INTERVIEW',
    screeningResult: {
      id: 'screen-002',
      applicationId: 'app-nova-002',
      candidateName: 'Priya Sharma',
      jobTitle: 'Full Stack React & TypeScript Developer',
      companyName: 'NovaTech Solutions',
      matchPercentage: 100,
      totalRequiredSkills: 8,
      matchedCount: 8,
      matchedSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Git', 'JavaScript', 'HTML/CSS'],
      missingSkills: [],
      scoringFormula: 'Match % = (Matched Skills: 8 / Required Skills: 8) × 100 = 100%',
      explanation: 'Flawless 100% skill match across all mandatory frontend stack requirements including Next.js 14 App Router, TypeScript, Tailwind CSS, and REST API consumption.',
      screenedAt: '2025-10-14 16:15:00',
      suggestionsForCandidate: [
        'Profile matches all criteria. Prepare code samples showcasing server actions and component state architecture.'
      ],
      aiNotes: 'Full match verified against Apache POI DOCX extracted text.'
    }
  },
  {
    id: 'app-nova-003',
    jobId: 'job-nova-101',
    candidateId: 'cand-marcus-vance',
    companyId: 'comp-novatech',
    candidateName: 'Marcus Vance',
    candidateEmail: 'marcus.vance@example.com',
    candidateHeadline: 'Junior Java Developer | Database & API Enthusiast',
    jobTitle: 'Senior Java & Spring Boot Backend Engineer',
    companyName: 'NovaTech Solutions',
    resumeFileName: 'Marcus_Vance_Resume.pdf',
    appliedAt: '2025-10-16',
    status: 'UNDER_REVIEW',
    screeningResult: {
      id: 'screen-003',
      applicationId: 'app-nova-003',
      candidateName: 'Marcus Vance',
      jobTitle: 'Senior Java & Spring Boot Backend Engineer',
      companyName: 'NovaTech Solutions',
      matchPercentage: 50,
      totalRequiredSkills: 8,
      matchedCount: 4,
      matchedSkills: ['Java', 'REST APIs', 'PostgreSQL', 'Docker'],
      missingSkills: ['Spring Boot', 'Microservices', 'Spring Security', 'JUnit'],
      scoringFormula: 'Match % = (Matched Skills: 4 / Required Skills: 8) × 100 = 50.0%',
      explanation: 'Candidate meets base Java and relational database requirements, but lacks formal production experience in Spring Boot, Spring Security, and automated JUnit testing as specified for this Senior role.',
      screenedAt: '2025-10-16 11:20:00',
      suggestionsForCandidate: [
        'Consider contributing to Spring Boot open-source projects or building a full-stack portfolio with Spring Security and JUnit.',
        'Candidate may be better suited for an Associate or Mid-Level Software Engineer opening.'
      ],
      aiNotes: 'Borderline score (50%). Human recruiter manual review requested.'
    }
  },
  {
    id: 'app-nova-004',
    jobId: 'job-nova-101',
    candidateId: 'cand-elena-rostova',
    companyId: 'comp-novatech',
    candidateName: 'Elena Rostova',
    candidateEmail: 'elena.rostova@example.com',
    candidateHeadline: 'Data Analyst & Python Enthusiast',
    jobTitle: 'Senior Java & Spring Boot Backend Engineer',
    companyName: 'NovaTech Solutions',
    resumeFileName: 'Elena_Rostova_Resume.pdf',
    appliedAt: '2025-10-18',
    status: 'REJECTED',
    screeningResult: {
      id: 'screen-004',
      applicationId: 'app-nova-004',
      candidateName: 'Elena Rostova',
      jobTitle: 'Senior Java & Spring Boot Backend Engineer',
      companyName: 'NovaTech Solutions',
      matchPercentage: 0,
      totalRequiredSkills: 8,
      matchedCount: 0,
      matchedSkills: [],
      missingSkills: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'Docker', 'Microservices', 'Spring Security', 'JUnit'],
      scoringFormula: 'Match % = (Matched Skills: 0 / Required Skills: 8) × 100 = 0.0%',
      explanation: 'Resume reflects primarily Python, SQL, and Business Intelligence / Data Analytics background. None of the required Java enterprise backend competencies matched.',
      screenedAt: '2025-10-18 09:45:00',
      suggestionsForCandidate: [
        'Explore our Data Analyst and Business Intelligence positions at NovaTech Solutions where your Python and Tableau skills are a direct fit!'
      ],
      aiNotes: 'Unsuitable match for Senior Java role. Respectful status notification prepared.'
    }
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2025-10-18 10:02:15',
    actorEmail: 'admin@system.local',
    role: 'SUPERADMIN',
    action: 'COMPANY_APPROVAL',
    details: 'Approved registration for NovaTech Solutions (Boston, MA)'
  },
  {
    id: 'log-002',
    timestamp: '2025-10-18 11:15:30',
    actorEmail: 'recruiter@novatech.com',
    role: 'COMPANY',
    action: 'JOB_PUBLISHED',
    details: 'Published new job: Senior Java & Spring Boot Backend Engineer (2 openings)'
  },
  {
    id: 'log-003',
    timestamp: '2025-10-18 14:32:00',
    actorEmail: 'recruiter@novatech.com',
    role: 'COMPANY',
    action: 'RESUME_SCREENED',
    details: 'Screened candidate Alex Morgan for Senior Java role — Match Score: 88%'
  },
  {
    id: 'log-004',
    timestamp: '2025-10-18 15:45:10',
    actorEmail: 'recruiter@novatech.com',
    role: 'COMPANY',
    action: 'APPLICATION_STATUS_UPDATED',
    details: 'Updated Alex Morgan status from APPLIED to SHORTLISTED'
  },
  {
    id: 'log-005',
    timestamp: '2025-10-19 09:20:44',
    actorEmail: 'admin@system.local',
    role: 'SUPERADMIN',
    action: 'AUDIT_SECURITY_CHECK',
    details: 'Verified server-side role constraints and isolated sample demo boundary'
  }
];

export const PLATFORM_STATS = {
  totalCandidates: 1420,
  totalCompanies: 86,
  totalJobPostings: 245,
  totalApplications: 4890,
  totalShortlisted: 940,
  screeningAccuracy: '98.4%',
  averageScreeningTimeSec: '1.2s'
};
