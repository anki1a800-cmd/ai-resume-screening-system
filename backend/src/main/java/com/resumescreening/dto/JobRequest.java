package com.resumescreening.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {
    @NotBlank(message = "Job title is required")
    private String title;

    private String department;

    @NotBlank(message = "Description is required")
    private String description;

    @NotEmpty(message = "At least one required skill is mandatory")
    private List<String> requiredSkills;

    private List<String> responsibilities;
    private String education;
    private Integer experienceMinYears;
    private String employmentType;
    private String location;
    private String workMode;
    private String salaryRange;
    private Integer openings;
    private LocalDate deadline;
}
