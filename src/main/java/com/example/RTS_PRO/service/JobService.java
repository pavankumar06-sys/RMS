// package com.example.RTS_PRO.service;

// import com.example.RTS_PRO.dto.JobRequestDTO;
// import com.example.RTS_PRO.dto.JobResponseDTO;

// import java.util.List;

// public interface JobService {

//     JobResponseDTO createJob(JobRequestDTO dto);

//     List<JobResponseDTO> getAllJobs();

//     JobResponseDTO getJobById(Long id);

//     JobResponseDTO updateJob(Long id, JobRequestDTO dto);

//     void deleteJob(Long id);
// }

package com.example.RTS_PRO.service;

import com.example.RTS_PRO.dto.JobRequestDTO;
import com.example.RTS_PRO.dto.JobResponseDTO;

import java.util.List;

public interface JobService {

    JobResponseDTO createJob(JobRequestDTO dto);

    List<JobResponseDTO> getAllJobs();

    JobResponseDTO getJobById(Long id);

    JobResponseDTO updateJob(Long id, JobRequestDTO dto);

    void deleteJob(Long id);
}