package com.example.RTS_PRO.service;

import com.example.RTS_PRO.dto.CandidateFlagResponseDTO;
import com.example.RTS_PRO.entity.Candidate;
import com.example.RTS_PRO.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateFlagServiceImpl implements CandidateFlagService {

    private final CandidateRepository repository;

    public CandidateFlagServiceImpl(CandidateRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<CandidateFlagResponseDTO> getAllCandidatesWithFlag() {

        List<Candidate> candidates = repository.findAll();

        return candidates.stream().map(c -> {

            CandidateFlagResponseDTO dto = new CandidateFlagResponseDTO();

            dto.setId(c.getId());
            dto.setFirstName(c.getFirstName());
            dto.setLastName(c.getLastName());
            dto.setEmail(c.getEmail());
            dto.setJobId(c.getJobId());

            // ✅ MULTI JOB LOGIC
            long count = repository
                    .countByEmailAndJobIdIsNotNull(c.getEmail());

            dto.setMultiJobActive(count > 1);

            return dto;

        }).toList();
    }
}
