package com.resumescreening.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    @Column(nullable = false, name = "actor_email")
    private String actorEmail;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String action;

    @Column(columnDefinition = "TEXT")
    private String details;
}
