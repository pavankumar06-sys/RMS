

package com.example.RTS_PRO.service;

import com.example.RTS_PRO.entity.Candidate;
import com.example.RTS_PRO.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class CandidateServiceImpl implements CandidateService {

    private final CandidateRepository repository;

    public CandidateServiceImpl(CandidateRepository repository) {
        this.repository = repository;
    }

    @Override
    public Candidate createCandidate(Candidate candidate) {

        if (repository.existsByEmail(candidate.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (candidate.getGroupId() == null || candidate.getGroupId().isBlank()) {
            candidate.setGroupId(generateGroupId());
        }

        return repository.save(candidate);
    }

    @Override
    public List<Candidate> getAllCandidates() {
        return repository.findAll();
    }

    @Override
    public Candidate updateCandidate(Long id, Candidate updated) {

        return repository.findById(id)
            .map(existing -> {

                if (!existing.getEmail().equals(updated.getEmail())
                        && repository.existsByEmail(updated.getEmail())) {
                    throw new RuntimeException("Email already exists");
                }

                existing.setFirstName(updated.getFirstName());
                existing.setLastName(updated.getLastName());
                existing.setPosition(updated.getPosition());
                existing.setGrade(updated.getGrade());
                existing.setType(updated.getType());
                existing.setEmail(updated.getEmail());
                existing.setPhone(updated.getPhone());
                existing.setSkills(updated.getSkills());

                return repository.save(existing);
            })
            .orElseThrow(() -> new RuntimeException("Candidate not found"));
    }

    @Override
    public void deleteCandidate(Long id) {
        repository.deleteById(id);
    }

    private String generateGroupId() {
        return "0000" + (new Random().nextInt(9000) + 1000);
    }
}