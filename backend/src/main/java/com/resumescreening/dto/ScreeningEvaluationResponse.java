package com.resumescreening.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScreeningEvaluationResponse {
    private String id;
    private String applicationId;
    private String candidateName;
    private String jobTitle;
    private String companyName;
    private Integer matchPercentage;
    private Integer totalRequiredSkills;
    private Integer matchedCount;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private String scoringFormula;
    private String explanation;
    private List<String> suggestions;
    private LocalDateTime screenedAt;
}
