package com.resumescreening.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "screening_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScreeningResult {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false, unique = true)
    private Application application;

    @Column(nullable = false, name = "match_percentage")
    private Integer matchPercentage;

    @Column(nullable = false, name = "total_required_skills")
    private Integer totalRequiredSkills;

    @Column(nullable = false, name = "matched_skills_count")
    private Integer matchedSkillsCount;

    @Column(name = "matched_skills_json", columnDefinition = "TEXT")
    private String matchedSkillsJson;

    @Column(name = "missing_skills_json", columnDefinition = "TEXT")
    private String missingSkillsJson;

    @Column(name = "scoring_formula", length = 512)
    private String scoringFormula;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "suggestions_json", columnDefinition = "TEXT")
    private String suggestionsJson;

    @Column(nullable = false, name = "screened_at")
    @Builder.Default
    private LocalDateTime screenedAt = LocalDateTime.now();
}
