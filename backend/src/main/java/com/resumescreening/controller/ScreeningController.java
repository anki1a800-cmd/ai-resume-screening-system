package com.resumescreening.controller;

import com.resumescreening.dto.ScreeningEvaluationResponse;
import com.resumescreening.model.Application;
import com.resumescreening.model.Company;
import com.resumescreening.repository.ApplicationRepository;
import com.resumescreening.repository.CompanyRepository;
import com.resumescreening.security.UserDetailsImpl;
import com.resumescreening.service.ResumeScreeningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/screening")
public class ScreeningController {

    @Autowired
    private ResumeScreeningService screeningService;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private CompanyRepository companyRepository;

    /**
     * Company executes explainable screening on an authorized application
     */
    @PostMapping("/evaluate/{applicationId}")
    @PreAuthorize("hasRole('COMPANY')")
    public ResponseEntity<?> evaluateApplication(
            @PathVariable String applicationId,
            Authentication authentication
    ) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Company company = companyRepository.findByUserId(userDetails.getId()).orElseThrow();

        Application application = applicationRepository.findById(applicationId).orElseThrow();
        if (!application.getJob().getCompany().getId().equals(company.getId())) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied: Cannot screen applicants from another company."));
        }

        ScreeningEvaluationResponse response = screeningService.evaluateApplication(applicationId, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    /**
     * Interactive public screening simulator for viva/testing
     */
    @PostMapping("/simulate")
    public ResponseEntity<?> simulateScreening(@RequestBody Map<String, Object> body) {
        String resumeText = (String) body.get("resumeText");
        List<String> requiredSkills = (List<String>) body.get("requiredSkills");
        String jobTitle = (String) body.getOrDefault("jobTitle", "Target Engineering Role");
        String candidateName = (String) body.getOrDefault("candidateName", "Sample Applicant");

        if (requiredSkills == null || requiredSkills.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "requiredSkills list cannot be empty."));
        }

        ScreeningEvaluationResponse response = screeningService.calculateMatch(
                resumeText != null ? resumeText : "",
                requiredSkills,
                "simulated-app",
                candidateName,
                jobTitle,
                "NovaTech Solutions"
        );

        return ResponseEntity.ok(response);
    }
}
