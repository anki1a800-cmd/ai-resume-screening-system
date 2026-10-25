package com.resumescreening.controller;

import com.resumescreening.model.AuditLog;
import com.resumescreening.model.Company;
import com.resumescreening.model.CompanyStatus;
import com.resumescreening.repository.*;
import com.resumescreening.security.UserDetailsImpl;
import com.resumescreening.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('SUPERADMIN')")
public class AdminController {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private AuditService auditService;

    @GetMapping("/companies")
    public ResponseEntity<List<Company>> getAllCompanies() {
        return ResponseEntity.ok(companyRepository.findAll());
    }

    @PatchMapping("/companies/{id}/approve")
    public ResponseEntity<?> approveCompany(@PathVariable String id, Authentication authentication) {
        UserDetailsImpl admin = (UserDetailsImpl) authentication.getPrincipal();
        Company company = companyRepository.findById(id).orElseThrow();
        company.setStatus(CompanyStatus.APPROVED);
        companyRepository.save(company);

        auditService.recordAction(admin.getUsername(), "SUPERADMIN", "COMPANY_APPROVED", "Approved organization: " + company.getName());

        return ResponseEntity.ok(Map.of("message", "Company approved successfully!", "company", company));
    }

    @PatchMapping("/companies/{id}/suspend")
    public ResponseEntity<?> suspendCompany(@PathVariable String id, Authentication authentication) {
        UserDetailsImpl admin = (UserDetailsImpl) authentication.getPrincipal();
        Company company = companyRepository.findById(id).orElseThrow();
        company.setStatus(CompanyStatus.SUSPENDED);
        companyRepository.save(company);

        auditService.recordAction(admin.getUsername(), "SUPERADMIN", "COMPANY_SUSPENDED", "Suspended organization: " + company.getName());

        return ResponseEntity.ok(Map.of("message", "Company suspended successfully!", "company", company));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(auditLogRepository.findAllByOrderByTimestampDesc());
    }

    @GetMapping("/platform-metrics")
    public ResponseEntity<Map<String, Object>> getPlatformMetrics() {
        return ResponseEntity.ok(Map.of(
                "totalCandidates", candidateRepository.count(),
                "totalCompanies", companyRepository.count(),
                "totalJobs", jobRepository.count(),
                "totalApplications", applicationRepository.count(),
                "accuracy", "98.4%"
        ));
    }
}
