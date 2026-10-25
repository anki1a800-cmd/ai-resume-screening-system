package com.resumescreening.repository;

import com.resumescreening.model.Company;
import com.resumescreening.model.CompanyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {
    Optional<Company> findByUserId(String userId);
    List<Company> findByStatus(CompanyStatus status);
}
