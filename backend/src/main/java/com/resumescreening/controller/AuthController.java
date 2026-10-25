package com.resumescreening.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumescreening.dto.*;
import com.resumescreening.model.*;
import com.resumescreening.repository.*;
import com.resumescreening.security.JwtUtils;
import com.resumescreening.security.UserDetailsImpl;
import com.resumescreening.service.AuditService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuditService auditService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId()).orElseThrow();

        String companyId = null;
        String name = userDetails.getUsername();

        if (user.getRole() == Role.COMPANY) {
            Company company = companyRepository.findByUserId(user.getId()).orElse(null);
            if (company != null) {
                companyId = company.getId();
                name = company.getName();
            }
        } else if (user.getRole() == Role.CANDIDATE) {
            Candidate cand = candidateRepository.findByUserId(user.getId()).orElse(null);
            if (cand != null) {
                name = cand.getName();
            }
        }

        auditService.recordAction(user.getEmail(), user.getRole().name(), "LOGIN_SUCCESS", "User authenticated successfully");

        return ResponseEntity.ok(AuthResponse.builder()
                .token(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().name())
                .name(name)
                .companyId(companyId)
                .build());
    }

    @PostMapping("/register/candidate")
    public ResponseEntity<?> registerCandidate(@Valid @RequestBody RegisterCandidateRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Email is already in use!"));
        }

        User user = User.builder()
                .email(req.getEmail())
                .passwordHash(encoder.encode(req.getPassword()))
                .role(Role.CANDIDATE)
                .status("ACTIVE")
                .build();

        userRepository.save(user);

        String skillsJson = "[]";
        try {
            if (req.getSkills() != null) {
                skillsJson = objectMapper.writeValueAsString(req.getSkills());
            }
        } catch (Exception ignored) {}

        Candidate candidate = Candidate.builder()
                .user(user)
                .name(req.getName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .headline(req.getHeadline())
                .location(req.getLocation())
                .skillsJson(skillsJson)
                .build();

        candidateRepository.save(candidate);
        auditService.recordAction(req.getEmail(), "CANDIDATE", "REGISTER_SUCCESS", "New candidate account created");

        return ResponseEntity.ok(Map.of("message", "Candidate registered successfully!"));
    }

    @PostMapping("/register/company")
    public ResponseEntity<?> registerCompany(@Valid @RequestBody RegisterCompanyRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Email is already in use!"));
        }

        User user = User.builder()
                .email(req.getEmail())
                .passwordHash(encoder.encode(req.getPassword()))
                .role(Role.COMPANY)
                .status("ACTIVE")
                .build();

        userRepository.save(user);

        Company company = Company.builder()
                .user(user)
                .name(req.getCompanyName())
                .industry(req.getIndustry())
                .description(req.getDescription())
                .website(req.getWebsite())
                .contactEmail(req.getEmail())
                .location(req.getLocation())
                .status(CompanyStatus.PENDING_APPROVAL)
                .build();

        companyRepository.save(company);
        auditService.recordAction(req.getEmail(), "COMPANY", "REGISTER_PENDING", "Company registered, placed in PENDING_APPROVAL status");

        return ResponseEntity.ok(Map.of(
            "message", "Company registration submitted. Account placed in PENDING_APPROVAL status for Superadmin review.",
            "companyId", company.getId()
        ));
    }
}
