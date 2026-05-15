package com.example.RTS_PRO.controller;

import com.example.RTS_PRO.dto.CandidateFlagResponseDTO;
import com.example.RTS_PRO.service.CandidateFlagService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidate-flags")
@CrossOrigin
public class CandidateFlagController {

    private final CandidateFlagService service;

    public CandidateFlagController(CandidateFlagService service) {
        this.service = service;
    }

    @GetMapping
    public List<CandidateFlagResponseDTO> getAllCandidatesWithFlag() {
        return service.getAllCandidatesWithFlag();
    }
}
