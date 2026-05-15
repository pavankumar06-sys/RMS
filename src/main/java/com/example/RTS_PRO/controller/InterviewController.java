package com.example.RTS_PRO.controller;

import com.example.RTS_PRO.dto.InterviewRequestDto;
import com.example.RTS_PRO.dto.InterviewResponseDto;
import com.example.RTS_PRO.service.InterviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
@CrossOrigin
public class InterviewController {

    private final InterviewService service;

    // ✅ Schedule interview
    @PostMapping
    public ResponseEntity<?> scheduleInterview(@RequestBody InterviewRequestDto dto) {
        String id = service.scheduleInterview(dto);
        return ResponseEntity.ok(
                java.util.Map.of(
                        "message", "Interview scheduled successfully",
                        "id", id
                )
        );
    }

    // ✅ Get all interviews
    @GetMapping
    public ResponseEntity<List<InterviewResponseDto>> getAllInterviews() {
        return ResponseEntity.ok(service.getAllInterviews());
    }

    // ✅ Cancel interview
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<?> cancelInterview(@PathVariable String id) {
        service.cancelInterview(id);
        return ResponseEntity.ok(
                java.util.Map.of("message", "Interview cancelled successfully")
        );
    }

    // ✅ DELETE meeting permanently
@DeleteMapping("/{id}")
public ResponseEntity<?> deleteInterview(@PathVariable String id) {
    service.deleteInterview(id);
    return ResponseEntity.ok(
            java.util.Map.of("message", "Interview deleted successfully")
    );
}

// ✅ UPDATE interview
@PutMapping("/{id}")
public ResponseEntity<?> updateInterview(
        @PathVariable String id,
        @RequestBody InterviewRequestDto dto) {

    service.updateInterview(id, dto);

    return ResponseEntity.ok(
            java.util.Map.of("message", "Interview updated successfully")
    );
}

}
