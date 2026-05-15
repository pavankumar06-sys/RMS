package com.example.RTS_PRO.service;

import com.example.RTS_PRO.dto.CandidateFlagResponseDTO;
import java.util.List;

public interface CandidateFlagService {

    List<CandidateFlagResponseDTO> getAllCandidatesWithFlag();
}
