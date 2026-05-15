// package com.example.RTS_PRO.service;

// import com.example.RTS_PRO.dto.CandidateRequestDTO;
// import com.example.RTS_PRO.entity.Candidate;


// import java.util.List;

// public interface CandidateService {

//     Candidate createCandidate(CandidateRequestDTO dto);

//     List<Candidate> getAllCandidates();

//     Candidate updateCandidate(Long id, CandidateRequestDTO dto);

//     void deleteCandidate(Long id);

//     List<Candidate> saveFromExcel(List<Candidate> candidates);
// }


// package com.example.RTS_PRO.service;

// import com.example.RTS_PRO.dto.CandidateRequestDTO;
// import com.example.RTS_PRO.entity.Candidate;

// import java.util.List;

// public interface CandidateService {

//     Candidate createCandidate(CandidateRequestDTO dto);

//     List<Candidate> getAllCandidates();

//     Candidate updateCandidate(Long id, CandidateRequestDTO dto);

//     void deleteCandidate(Long id);
// }


package com.example.RTS_PRO.service;

import com.example.RTS_PRO.entity.Candidate;
import java.util.List;

public interface CandidateService {

    Candidate createCandidate(Candidate candidate);

    List<Candidate> getAllCandidates();

    Candidate updateCandidate(Long id, Candidate candidate);

    void deleteCandidate(Long id);
}