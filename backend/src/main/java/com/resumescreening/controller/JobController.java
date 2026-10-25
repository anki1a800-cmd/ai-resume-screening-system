package com.resumescreening.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumescreening.dto.JobRequest;
import com.resumescreening.model.*;
import com.resumescreening.repository.CompanyRepository;
import com.resumescreening.repository.JobRepository;
import com.resumescreening.repository.UserRepository;
import com.resumescreening.security.UserDetailsImpl;
import com.resumescreening.service.AuditService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditService auditService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Public endpoint: retrieve all published job openings
     */
    @GetMapping("/public")
    public ResponseEntity<List<Job>> getPublicJobs() {
        return ResponseEntity.ok(jobRepository.findByStatus(JobStatus.PUBLISHED));
    }

    /**
     * Public endpoint: retrieve specific job details by ID
     */
    @GetMapping("/public/{id}")
    public ResponseEntity<?> getJobDetails(@PathVariable String id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Company endpoint: create a new job opening
     */
    @PostMapping("/company")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<?> createJob(@Valid @RequestBody JobRequest request, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Company company = companyRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new IllegalStateException("Company profile not found for user."));

        String skillsJson = "[]";
        String respJson = "[]";
        try {
            skillsJson = objectMapper.writeValueAsString(request.getRequiredSkills());
            if (request.getResponsibilities() != null) {
                respJson = objectMapper.writeValueAsString(request.getResponsibilities());
            }
        } catch (Exception ignored) {}

        Job job = Job.builder()
                .company(company)
                .title(request.getTitle())
                .department(request.getDepartment())
                .description(request.getDescription())
                .requiredSkillsJson(skillsJson)
                .responsibilitiesJson(respJson)
                .education(request.getEducation())
                .experienceMinYears(request.getExperienceMinYears())
                .employmentType(request.getEmploymentType() != null ? request.getEmploymentType() : "Full-Time")
                .location(request.getLocation() != null ? request.getLocation() : company.getLocation())
                .workMode(request.getWorkMode() != null ? request.getWorkMode() : "Hybrid")
                .salaryRange(request.getSalaryRange())
                .openings(request.getOpenings() != null ? request.getOpenings() : 1)
                .deadline(request.getDeadline())
                .status(JobStatus.PUBLISHED)
                .build();

        jobRepository.save(job);
        auditService.recordAction(userDetails.getUsername(), "COMPANY", "JOB_CREATED", "Published job: " + job.getTitle());

        return ResponseEntity.ok(job);
    }

    /**
     * Company endpoint: retrieve jobs belonging strictly to the authenticated company
     */
    @GetMapping("/company/my-jobs")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<?> getMyCompanyJobs(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Company company = companyRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new IllegalStateException("Company profile not found."));

        return ResponseEntity.ok(jobRepository.findByCompanyId(company.getId()));
    }

    /**
     * Company endpoint: toggle job status (PUBLISHED / CLOSED)
     */
    @PatchMapping("/company/{jobId}/status")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<?> updateJobStatus(
            @PathVariable String jobId,
            @RequestBody Map<String, String> body,
            Authentication authentication
    ) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Company company = companyRepository.findByUserId(userDetails.getId()).orElseThrow();

        Job job = jobRepository.findById(jobId).orElseThrow();
        if (!job.getCompany().getId().equals(company.getId())) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied: Cannot modify another company's job."));
        }

        String newStatus = body.get("status");
        job.setStatus(JobStatus.valueOf(newStatus.toUpperCase()));
        jobRepository.save(job);

        return ResponseEntity.ok(job);
    }
}
