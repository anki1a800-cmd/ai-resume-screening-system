package com.resumescreening.repository;

import com.resumescreening.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, String> {
    List<Resume> findByCandidateId(String candidateId);
    Optional<Resume> findTopByCandidateIdOrderByUploadedAtDesc(String candidateId);
}
