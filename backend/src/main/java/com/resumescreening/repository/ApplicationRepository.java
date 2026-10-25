package com.resumescreening.repository;

import com.resumescreening.model.Application;
import com.resumescreening.model.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, String> {
    List<Application> findByJobId(String jobId);
    List<Application> findByCandidateId(String candidateId);
    List<Application> findByJobCompanyId(String companyId);
    Optional<Application> findByCandidateIdAndJobId(String candidateId, String jobId);
    List<Application> findByJobCompanyIdAndStatus(String companyId, ApplicationStatus status);
}
