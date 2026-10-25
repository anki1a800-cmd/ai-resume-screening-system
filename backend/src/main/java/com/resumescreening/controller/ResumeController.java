package com.resumescreening.controller;

import com.resumescreening.model.Candidate;
import com.resumescreening.model.Resume;
import com.resumescreening.repository.CandidateRepository;
import com.resumescreening.repository.ResumeRepository;
import com.resumescreening.security.UserDetailsImpl;
import com.resumescreening.service.AuditService;
import com.resumescreening.service.DocumentParsingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/candidate/resumes")
public class ResumeController {

    @Autowired
    private DocumentParsingService parsingService;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private AuditService auditService;

    @Value("${app.storage.upload-dir:./storage/resumes}")
    private String uploadDir;

    @PostMapping("/upload")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication authentication
    ) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Candidate candidate = candidateRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new IllegalStateException("Candidate profile not found."));

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Uploaded file is empty."));
        }

        String fileName = file.getOriginalFilename();
        boolean isPdf = fileName != null && fileName.toLowerCase().endsWith(".pdf");
        boolean isDocx = fileName != null && fileName.toLowerCase().endsWith(".docx");

        if (!isPdf && !isDocx) {
            return ResponseEntity.badRequest().body(Map.of("message", "Only PDF and DOCX documents are supported."));
        }

        try {
            // Extract text via Apache PDFBox / Apache POI
            String extractedText = parsingService.extractText(file);

            // Safe server storage (non-public directory)
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String uniqueFileName = UUID.randomUUID() + "_" + fileName;
            File destFile = new File(dir, uniqueFileName);
            try (FileOutputStream fos = new FileOutputStream(destFile)) {
                fos.write(file.getBytes());
            }

            // Persist Resume entity
            Resume resume = Resume.builder()
                    .candidate(candidate)
                    .fileName(fileName)
                    .fileSizeBytes(file.getSize())
                    .fileType(isPdf ? "pdf" : "docx")
                    .storagePath(destFile.getAbsolutePath())
                    .extractedText(extractedText)
                    .build();

            resumeRepository.save(resume);

            auditService.recordAction(
                    userDetails.getUsername(),
                    "CANDIDATE",
                    "RESUME_UPLOAD",
                    "Uploaded resume: " + fileName + " (" + file.getSize() + " bytes)"
            );

            return ResponseEntity.ok(Map.of(
                    "message", "Resume uploaded and parsed successfully!",
                    "resumeId", resume.getId(),
                    "fileName", resume.getFileName(),
                    "fileSizeBytes", resume.getFileSizeBytes(),
                    "extractedTextLength", extractedText.length(),
                    "textPreview", extractedText.substring(0, Math.min(250, extractedText.length())) + "..."
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Error extracting resume text: " + e.getMessage()));
        }
    }

    @GetMapping("/my-resume")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<?> getMyResume(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Candidate candidate = candidateRepository.findByUserId(userDetails.getId()).orElseThrow();

        return resumeRepository.findTopByCandidateIdOrderByUploadedAtDesc(candidate.getId())
                .map(r -> ResponseEntity.ok(Map.of(
                        "id", r.getId(),
                        "fileName", r.getFileName(),
                        "fileSizeBytes", r.getFileSizeBytes(),
                        "fileType", r.getFileType(),
                        "uploadedAt", r.getUploadedAt(),
                        "extractedText", r.getExtractedText()
                )))
                .orElse(ResponseEntity.noContent().build());
    }
}
