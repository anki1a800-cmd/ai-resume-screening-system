package com.resumescreening.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "backend", "Java 17/21 Spring Boot 3",
            "screeningEngine", "Apache PDFBox 3.0 & Apache POI 5.2 Deterministic Parser",
            "security", "Spring Security 6 (Stateless JWT)",
            "timestamp", System.currentTimeMillis()
        ));
    }
}
