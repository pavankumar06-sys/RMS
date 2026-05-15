
package com.example.RTS_PRO.repository;

import com.example.RTS_PRO.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    boolean existsByEmail(String email);
    long countByJobId(Long jobId);
    long countByEmailAndJobIdIsNotNull(String email);
}
