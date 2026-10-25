package com.resumescreening.repository;

import com.resumescreening.model.ScreeningResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ScreeningResultRepository extends JpaRepository<ScreeningResult, String> {
    Optional<ScreeningResult> findByApplicationId(String applicationId);
}
