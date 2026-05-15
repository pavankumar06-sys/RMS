// package com.example.RTS_PRO.controller;

// import com.example.RTS_PRO.dto.JobRequestDTO;
// import com.example.RTS_PRO.dto.JobResponseDTO;
// import com.example.RTS_PRO.service.JobService;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/jobs")
// @CrossOrigin
// public class JobController {

//     private final JobService service;

//     public JobController(JobService service) {
//         this.service = service;
//     }

//     /* ✅ CREATE */
//     @PostMapping
//     public JobResponseDTO createJob(@RequestBody JobRequestDTO dto) {
//         return service.createJob(dto);
//     }

//     /* ✅ READ ALL */
//     @GetMapping
//     public List<JobResponseDTO> getAllJobs() {
//         return service.getAllJobs();
//     }

//     /* ✅ READ BY ID */
//     @GetMapping("/{id}")
//     public JobResponseDTO getJob(@PathVariable Long id) {
//         return service.getJobById(id);
//     }

//     /* ✅ UPDATE */
//     @PutMapping("/{id}")
//     public JobResponseDTO updateJob(
//             @PathVariable Long id,
//             @RequestBody JobRequestDTO dto) {
//         return service.updateJob(id, dto);
//     }

//     /* ✅ DELETE */
//     @DeleteMapping("/{id}")
//     public void deleteJob(@PathVariable Long id) {
//         service.deleteJob(id);
//     }
// }

package com.example.RTS_PRO.controller;

import com.example.RTS_PRO.dto.JobRequestDTO;
import com.example.RTS_PRO.dto.JobResponseDTO;
import com.example.RTS_PRO.service.JobService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobController {

    private final JobService service;

    public JobController(JobService service) {
        this.service = service;
    }

    @PostMapping
    public JobResponseDTO createJob(@RequestBody JobRequestDTO dto) {
        return service.createJob(dto);
    }

    @GetMapping
    public List<JobResponseDTO> getAllJobs() {
        return service.getAllJobs();
    }

    @GetMapping("/{id}")
    public JobResponseDTO getJob(@PathVariable Long id) {
        return service.getJobById(id);
    }

    @PutMapping("/{id}")
    public JobResponseDTO updateJob(
            @PathVariable Long id,
            @RequestBody JobRequestDTO dto) {
        return service.updateJob(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        service.deleteJob(id);
    }
}

