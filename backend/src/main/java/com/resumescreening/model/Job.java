package com.resumescreening.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private String title;

    private String department;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "responsibilities_json", columnDefinition = "TEXT")
    private String responsibilitiesJson;

    @Column(nullable = false, name = "required_skills_json", columnDefinition = "TEXT")
    private String requiredSkillsJson;

    private String education;

    @Column(name = "experience_min_years")
    @Builder.Default
    private Integer experienceMinYears = 0;

    @Column(nullable = false, name = "employment_type")
    private String employmentType;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, name = "work_mode")
    private String workMode;

    @Column(name = "salary_range")
    private String salaryRange;

    @Builder.Default
    private Integer openings = 1;

    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private JobStatus status = JobStatus.PUBLISHED;

    @Column(nullable = false, name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
