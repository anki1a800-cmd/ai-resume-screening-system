package com.resumescreening.repository;

import com.resumescreening.model.Job;
import com.resumescreening.model.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {
    List<Job> findByStatus(JobStatus status);
    List<Job> findByCompanyId(String companyId);
    List<Job> findByCompanyIdAndStatus(String companyId, JobStatus status);
}
