// package com.example.RTS_PRO.service;

// import com.example.RTS_PRO.dto.JobRequestDTO;
// import com.example.RTS_PRO.dto.JobResponseDTO;
// import com.example.RTS_PRO.entity.Job;
// import com.example.RTS_PRO.repository.JobRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDate;
// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class JobServiceImpl implements JobService {

//     private final JobRepository repository;

//     public JobServiceImpl(JobRepository repository) {
//         this.repository = repository;
//     }

//     @Override
//     public JobResponseDTO createJob(JobRequestDTO dto) {
//         Job job = new Job();
//         job.setTitle(dto.getTitle());
//         job.setAccount(dto.getAccount());
//         job.setTeam(dto.getTeam());
//         job.setSkills(dto.getSkills());

//         job.setStatus("active");
//         job.setPositions("0/" + dto.getPositions() + " filled");
//         job.setCreatedDate(LocalDate.now().toString());

//         return mapToResponse(repository.save(job));
//     }

//     @Override
//     public List<JobResponseDTO> getAllJobs() {
//         return repository.findAll()
//                 .stream()
//                 .map(this::mapToResponse)
//                 .collect(Collectors.toList());
//     }

//     @Override
//     public JobResponseDTO getJobById(Long id) {
//         Job job = repository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Job not found"));
//         return mapToResponse(job);
//     }

//     @Override
//     public JobResponseDTO updateJob(Long id, JobRequestDTO dto) {
//         Job job = repository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Job not found"));

//         job.setTitle(dto.getTitle());
//         job.setAccount(dto.getAccount());
//         job.setTeam(dto.getTeam());
//         job.setSkills(dto.getSkills());
//         job.setPositions("0/" + dto.getPositions() + " filled");

//         return mapToResponse(repository.save(job));
//     }

//     @Override
//     public void deleteJob(Long id) {
//         repository.deleteById(id);
//     }

//     private JobResponseDTO mapToResponse(Job job) {
//         JobResponseDTO dto = new JobResponseDTO();
//         dto.setId(job.getId());
//         dto.setTitle(job.getTitle());
//         dto.setAccount(job.getAccount());
//         dto.setTeam(job.getTeam());
//         dto.setStatus(job.getStatus());
//         dto.setPositions(job.getPositions());
//         dto.setCreatedDate(job.getCreatedDate());
//         dto.setSkills(job.getSkills());
//         return dto;
//     }
// }

package com.example.RTS_PRO.service;

import com.example.RTS_PRO.dto.JobRequestDTO;
import com.example.RTS_PRO.dto.JobResponseDTO;
import com.example.RTS_PRO.entity.Job;
import com.example.RTS_PRO.repository.JobRepository;
import com.example.RTS_PRO.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final CandidateRepository candidateRepository;

    public JobServiceImpl(
            JobRepository jobRepository,
            CandidateRepository candidateRepository
    ) {
        this.jobRepository = jobRepository;
        this.candidateRepository = candidateRepository;
    }

    @Override
    public JobResponseDTO createJob(JobRequestDTO dto) {

        // ✅ DUPLICATE CHECK
        List<Job> existingJobs =
    jobRepository.findByTitleIgnoreCaseAndAccountIgnoreCaseAndTeamIgnoreCase(
        dto.getTitle(),
        dto.getAccount(),
        dto.getTeam()
    );

        boolean duplicate = existingJobs.stream().anyMatch(job ->
            job.getSkills() != null &&
            dto.getSkills() != null &&
            new HashSet<>(job.getSkills()).equals(new HashSet<>(dto.getSkills()))
        );

        if (duplicate) {
            throw new RuntimeException("Duplicate job already exists");
        }


        

        Job job = new Job();
        job.setTitle(dto.getTitle());
        job.setAccount(dto.getAccount());
        job.setTeam(dto.getTeam());
        job.setSkills(dto.getSkills());

        job.setTotalPositions(dto.getPositions());
        job.setStatus("active");
        job.setCreatedDate(LocalDate.now().toString());

        // ✅ OWNER – replace later with logged-in user
        // job.setOwner("Admin User");
        job.setOwner(dto.getOwner());

        return mapToResponse(jobRepository.save(job));
    }

    @Override
    public List<JobResponseDTO> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public JobResponseDTO getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return mapToResponse(job);
    }

    @Override
    public JobResponseDTO updateJob(Long id, JobRequestDTO dto) {

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setTitle(dto.getTitle());
        job.setAccount(dto.getAccount());
        job.setTeam(dto.getTeam());
        job.setSkills(dto.getSkills());
        job.setTotalPositions(dto.getPositions());

        return mapToResponse(jobRepository.save(job));
    }

    // @Override
    // public void deleteJob(Long id) {
    //     jobRepository.deleteById(id);
    // }

    /* ✅ DYNAMIC POSITIONS CALCULATION */
    private JobResponseDTO mapToResponse(Job job) {

        long filled =
            candidateRepository.countByJobId(job.getId());

        int total = job.getTotalPositions();

        JobResponseDTO dto = new JobResponseDTO();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setAccount(job.getAccount());
        dto.setTeam(job.getTeam());
        dto.setStatus(job.getStatus());
        dto.setOwner(job.getOwner());
        dto.setCreatedDate(job.getCreatedDate());
        dto.setSkills(job.getSkills());

        dto.setPositions(filled + "/" + total + " filled");

        return dto;
    }

    @Override
    public void deleteJob(Long id) {

    long candidateCount = candidateRepository.countByJobId(id);

    if (candidateCount > 0) {
        throw new RuntimeException(
            "Cannot delete job. Candidates are already assigned."
        );
    }

    jobRepository.deleteById(id);
}
}