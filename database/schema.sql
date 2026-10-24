-- =========================================================================
-- AI RESUME SCREENING SYSTEM — DATABASE SCHEMA (PostgreSQL / MySQL compatible)
-- =========================================================================

-- Drop tables if needed (cascade for foreign keys)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS screening_results CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS resumes CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. USERS & ROLES
CREATE TABLE users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL CHECK (role IN ('SUPERADMIN', 'COMPANY', 'CANDIDATE')),
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'SUSPENDED', 'DEACTIVATED')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. COMPANY PROFILES
CREATE TABLE companies (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(512),
    industry VARCHAR(128) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    contact_email VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    status VARCHAR(32) NOT NULL DEFAULT 'PENDING_APPROVAL' CHECK (status IN ('APPROVED', 'PENDING_APPROVAL', 'SUSPENDED')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. CANDIDATE PROFILES
CREATE TABLE candidates (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64),
    headline VARCHAR(255),
    location VARCHAR(255),
    skills_json TEXT, -- Comma-separated or JSON array of normalized skills
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. RESUMES (PDF / DOCX metadata & extracted text)
CREATE TABLE resumes (
    id VARCHAR(64) PRIMARY KEY,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    file_type VARCHAR(16) NOT NULL CHECK (file_type IN ('pdf', 'docx')),
    storage_path VARCHAR(512) NOT NULL,
    extracted_text TEXT, -- Parsed via Apache PDFBox / Apache POI
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. JOB POSTINGS
CREATE TABLE jobs (
    id VARCHAR(64) PRIMARY KEY,
    company_id VARCHAR(64) NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(128),
    description TEXT NOT NULL,
    responsibilities_json TEXT,
    required_skills_json TEXT NOT NULL, -- Array of mandatory skills to match against
    education VARCHAR(255),
    experience_min_years INT DEFAULT 0,
    employment_type VARCHAR(32) NOT NULL CHECK (employment_type IN ('Full-Time', 'Part-Time', 'Contract', 'Internship')),
    location VARCHAR(255) NOT NULL,
    work_mode VARCHAR(32) NOT NULL CHECK (work_mode IN ('Remote', 'Hybrid', 'On-site')),
    salary_range VARCHAR(128),
    openings INT DEFAULT 1,
    deadline DATE,
    status VARCHAR(32) NOT NULL DEFAULT 'PUBLISHED' CHECK (status IN ('PUBLISHED', 'DRAFT', 'CLOSED')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. APPLICATIONS
CREATE TABLE applications (
    id VARCHAR(64) PRIMARY KEY,
    job_id VARCHAR(64) NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id VARCHAR(64) NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    resume_id VARCHAR(64) REFERENCES resumes(id) ON DELETE SET NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'APPLIED' CHECK (status IN ('APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'REJECTED')),
    applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_candidate_job UNIQUE (candidate_id, job_id)
);

-- 7. SCREENING RESULTS
CREATE TABLE screening_results (
    id VARCHAR(64) PRIMARY KEY,
    application_id VARCHAR(64) NOT NULL UNIQUE REFERENCES applications(id) ON DELETE CASCADE,
    match_percentage INT NOT NULL,
    total_required_skills INT NOT NULL,
    matched_skills_count INT NOT NULL,
    matched_skills_json TEXT,
    missing_skills_json TEXT,
    scoring_formula VARCHAR(512),
    explanation TEXT,
    suggestions_json TEXT,
    screened_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. AUDIT LOGS (Security & Governance)
CREATE TABLE audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    actor_email VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL,
    action VARCHAR(64) NOT NULL,
    details TEXT
);

-- Indexes for high-performance queries
CREATE INDEX idx_jobs_company ON jobs(company_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_candidate ON applications(candidate_id);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp);

-- =========================================================================
-- INITIAL SEED DATA (Fictional NovaTech Solutions & Sample Profiles)
-- =========================================================================

-- Seed Superadmin & Company Users
INSERT INTO users (id, email, password_hash, role, status) VALUES
('usr-admin-1', 'admin@system.local', '$2a$12$e80yq9cK0x.yD4X5u88c/O1oYp8k4p8x0t4u9v8w7x6y5z4a3b2c1', 'SUPERADMIN', 'ACTIVE'),
('usr-nova-1', 'recruiter@novatech-demo.com', '$2a$12$e80yq9cK0x.yD4X5u88c/O1oYp8k4p8x0t4u9v8w7x6y5z4a3b2c1', 'COMPANY', 'ACTIVE'),
('usr-cand-1', 'alex.morgan@example.com', '$2a$12$e80yq9cK0x.yD4X5u88c/O1oYp8k4p8x0t4u9v8w7x6y5z4a3b2c1', 'CANDIDATE', 'ACTIVE');

-- Seed Company
INSERT INTO companies (id, user_id, name, industry, description, website, contact_email, location, status) VALUES
('comp-novatech', 'usr-nova-1', 'NovaTech Solutions', 'Enterprise Cloud & AI Systems', 'Enterprise microservices and automated cloud infrastructure.', 'https://novatech-demo.example.com', 'careers@novatech-demo.com', 'Boston, MA (Hybrid)', 'APPROVED');

-- Seed Candidate
INSERT INTO candidates (id, user_id, name, email, phone, headline, location, skills_json) VALUES
('cand-alex-morgan', 'usr-cand-1', 'Alex Morgan', 'alex.morgan@example.com', '+1 (617) 555-0192', 'Senior Java & Spring Boot Backend Engineer', 'Cambridge, MA', '["Java", "Spring Boot", "REST APIs", "PostgreSQL", "Docker", "Spring Security", "JUnit"]');

-- Seed Sample Job
INSERT INTO jobs (id, company_id, title, department, description, required_skills_json, education, experience_min_years, employment_type, location, work_mode, salary_range, openings, deadline, status) VALUES
('job-nova-101', 'comp-novatech', 'Senior Java & Spring Boot Backend Engineer', 'Core Platform', 'Design and deploy robust enterprise microservices using Java 17 and Spring Boot.', '["Java", "Spring Boot", "REST APIs", "PostgreSQL", "Docker", "Microservices", "Spring Security", "JUnit"]', 'B.S. in Computer Science', 3, 'Full-Time', 'Boston, MA', 'Hybrid', '$115,000 - $145,000 / yr', 2, '2026-12-15', 'PUBLISHED');
