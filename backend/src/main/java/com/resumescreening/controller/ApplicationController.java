package com.resumescreening.controller;

import com.resumescreening.model.*;
import com.resumescreening.repository.*;
import com.resumescreening.security.UserDetailsImpl;
import com.resumescreening.service.AuditService;
import com.resumescreening.service.ResumeScreeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private ResumeScreeningService screeningService;

    @Autowired
    private AuditService auditService;

    /**
     * Candidate applies for a job
     */
    @PostMapping("/apply")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> applyForJob(
            @RequestBody Map<String, String> body,
            Authentication authentication
    ) {
        String jobId = body.get("jobId");
        if (jobId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "jobId is required."));
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Candidate candidate = candidateRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new IllegalStateException("Candidate profile not found."));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("Job not found with id: " + jobId));

        if (applicationRepository.findByCandidateIdAndJobId(candidate.getId(), job.getId()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "You have already applied for this position."));
        }

        Resume latestResume = resumeRepository.findTopByCandidateIdOrderByUploadedAtDesc(candidate.getId()).orElse(null);

        Application application = Application.builder()
                .job(job)
                .candidate(candidate)
                .resume(latestResume)
                .status(ApplicationStatus.APPLIED)
                .build();

        applicationRepository.save(application);

        // Run automated initial screening calculation in background
        try {
            screeningService.evaluateApplication(application.getId(), userDetails.getUsername());
        } catch (Exception ignored) {}

        auditService.recordAction(
                userDetails.getUsername(),
                "CANDIDATE",
                "JOB_APPLIED",
                "Applied for " + job.getTitle() + " at " + job.getCompany().getName()
        );

        return ResponseEntity.ok(Map.of(
                "message", "Application submitted successfully!",
                "applicationId", application.getId(),
                "status", application.getStatus().name()
        ));
    }

    /**
     * Candidate retrieves their own applications
     */
    @GetMapping("/my-applications")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> getMyApplications(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Candidate candidate = candidateRepository.findByUserId(userDetails.getId()).orElseThrow();

        return ResponseEntity.ok(applicationRepository.findByCandidateId(candidate.getId()));
    }

    /**
     * Company retrieves applications submitted specifically to their company jobs
     */
    @GetMapping("/company/applicants")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<?> getCompanyApplicants(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Company company = companyRepository.findByUserId(userDetails.getId()).orElseThrow();

        return ResponseEntity.ok(applicationRepository.findByJobCompanyId(company.getId()));
    }

    /**
     * Company updates applicant hiring decision
     */
    @PatchMapping("/company/{applicationId}/status")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<?> updateApplicantStatus(
            @PathVariable String applicationId,
            @RequestBody Map<String, String> body,
            Authentication authentication
    ) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Company company = companyRepository.findByUserId(userDetails.getId()).orElseThrow();

        Application application = applicationRepository.findById(applicationId).orElseThrow();
        if (!application.getJob().getCompany().getId().equals(company.getId())) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied: Cannot modify applicants from another organization."));
        }

        String newStatusStr = body.get("status");
        ApplicationStatus newStatus = ApplicationStatus.valueOf(newStatusStr.toUpperCase());
        application.setStatus(newStatus);
        applicationRepository.save(application);

        auditService.recordAction(
                userDetails.getUsername(),
                "COMPANY",
                "STATUS_UPDATED",
                "Updated application " + applicationId + " status to " + newStatus
        );

        return ResponseEntity.ok(Map.of(
                "message", "Application status updated to " + newStatus,
                "status", newStatus.name()
        ));
    }
}
