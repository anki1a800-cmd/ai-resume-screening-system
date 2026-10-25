package com.resumescreening.service;

import com.resumescreening.model.AuditLog;
import com.resumescreening.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuditService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void recordAction(String actorEmail, String role, String action, String details) {
        AuditLog log = AuditLog.builder()
                .timestamp(LocalDateTime.now())
                .actorEmail(actorEmail != null ? actorEmail : "system@local")
                .role(role != null ? role : "SYSTEM")
                .action(action)
                .details(details)
                .build();

        auditLogRepository.save(log);
    }
}
