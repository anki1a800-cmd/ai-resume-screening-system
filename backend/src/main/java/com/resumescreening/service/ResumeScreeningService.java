package com.resumescreening.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumescreening.dto.ScreeningEvaluationResponse;
import com.resumescreening.model.*;
import com.resumescreening.repository.ApplicationRepository;
import com.resumescreening.repository.ScreeningResultRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Pattern;

@Service
public class ResumeScreeningService {

    private static final Logger logger = LoggerFactory.getLogger(ResumeScreeningService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ScreeningResultRepository screeningResultRepository;

    @Autowired
    private AuditService auditService;

    /**
     * Evaluates an application's resume text against the target job's mandatory skills.
     */
    @Transactional
    public ScreeningEvaluationResponse evaluateApplication(String applicationId, String actorEmail) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("Application not found with id: " + applicationId));

        Job job = application.getJob();
        Resume resume = application.getResume();

        String resumeText = (resume != null && resume.getExtractedText() != null)
                ? resume.getExtractedText()
                : (application.getCandidate() != null ? application.getCandidate().getSkillsJson() : "");

        List<String> requiredSkills = parseSkillsJson(job.getRequiredSkillsJson());

        ScreeningEvaluationResponse response = calculateMatch(
                resumeText,
                requiredSkills,
                application.getId(),
                application.getCandidate().getName(),
                job.getTitle(),
                job.getCompany().getName()
        );

        // Save or update persistent ScreeningResult entity
        ScreeningResult result = screeningResultRepository.findByApplicationId(application.getId())
                .orElse(ScreeningResult.builder().application(application).build());

        result.setMatchPercentage(response.getMatchPercentage());
        result.setTotalRequiredSkills(response.getTotalRequiredSkills());
        result.setMatchedSkillsCount(response.getMatchedCount());
        result.setMatchedSkillsJson(toJson(response.getMatchedSkills()));
        result.setMissingSkillsJson(toJson(response.getMissingSkills()));
        result.setScoringFormula(response.getScoringFormula());
        result.setExplanation(response.getExplanation());
        result.setSuggestionsJson(toJson(response.getSuggestions()));
        result.setScreenedAt(LocalDateTime.now());

        screeningResultRepository.save(result);

        auditService.recordAction(
                actorEmail,
                "COMPANY",
                "RESUME_SCREENED",
                "Screened applicant " + application.getCandidate().getName() + " for " + job.getTitle() + " (Score: " + response.getMatchPercentage() + "%)"
        );

        return response;
    }

    /**
     * Deterministic, explainable skill matching algorithm.
     */
    public ScreeningEvaluationResponse calculateMatch(
            String resumeText,
            List<String> requiredSkills,
            String applicationId,
            String candidateName,
            String jobTitle,
            String companyName
    ) {
        String lowerResume = (resumeText != null ? resumeText.toLowerCase() : "");
        List<String> matchedSkills = new ArrayList<>();
        List<String> missingSkills = new ArrayList<>();

        for (String skill : requiredSkills) {
            String clean = skill.trim();
            if (clean.isEmpty()) continue;

            // Safe regex boundary checking to avoid false substrings (e.g. "Java" vs "JavaScript")
            String escaped = Pattern.quote(clean.toLowerCase());
            Pattern pattern = Pattern.compile("(^|[^a-zA-Z0-9#+])" + escaped + "([^a-zA-Z0-9#+]|$)", Pattern.CASE_INSENSITIVE);

            if (pattern.matcher(lowerResume).find() || lowerResume.contains(clean.toLowerCase())) {
                matchedSkills.add(clean);
            } else {
                missingSkills.add(clean);
            }
        }

        int total = requiredSkills.size();
        int matched = matchedSkills.size();
        int percentage = total > 0 ? (int) Math.round(((double) matched / total) * 100.0) : 0;

        String formula = "Match % = (Matched Skills: " + matched + " / Total Required Skills: " + total + ") × 100 = " + percentage + "%";

        String explanation;
        List<String> suggestions = new ArrayList<>();

        if (percentage >= 80) {
            explanation = "Strong match profile. Candidate demonstrates verified competency in " + matched + " of " + total + " mandatory technical skills (" + percentage + "%).";
        } else if (percentage >= 50) {
            explanation = "Moderate suitability. Candidate matches " + matched + " of " + total + " core skills. Additional review recommended for missing requirements: " + String.join(", ", missingSkills) + ".";
            suggestions.add("Highlight projects, certifications, or code samples involving: " + String.join(", ", missingSkills.subList(0, Math.min(3, missingSkills.size()))) + ".");
        } else {
            explanation = "Low alignment for this specific role (" + percentage + "%). Missing critical technical requirements: " + String.join(", ", missingSkills) + ".";
            suggestions.add("Focus resume and technical summary on core prerequisites: " + String.join(", ", missingSkills.subList(0, Math.min(4, missingSkills.size()))) + ".");
        }

        return ScreeningEvaluationResponse.builder()
                .id(UUID.randomUUID().toString())
                .applicationId(applicationId)
                .candidateName(candidateName)
                .jobTitle(jobTitle)
                .companyName(companyName)
                .matchPercentage(percentage)
                .totalRequiredSkills(total)
                .matchedCount(matched)
                .matchedSkills(matchedSkills)
                .missingSkills(missingSkills)
                .scoringFormula(formula)
                .explanation(explanation)
                .suggestions(suggestions)
                .screenedAt(LocalDateTime.now())
                .build();
    }

    private List<String> parseSkillsJson(String json) {
        if (json == null || json.isBlank()) return Collections.emptyList();
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            // Fallback comma-split
            return Arrays.stream(json.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .toList();
        }
    }

    private String toJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            return "[]";
        }
    }
}
