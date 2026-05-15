package com.example.RTS_PRO.service;

import com.example.RTS_PRO.dto.InterviewRequestDto;
import com.example.RTS_PRO.dto.InterviewResponseDto;
import com.example.RTS_PRO.entity.Interview;
import com.example.RTS_PRO.repository.InterviewRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final InterviewRepository repository;

    // ✅ Schedule interview
    public String scheduleInterview(InterviewRequestDto dto) {

        Interview interview = Interview.builder()
                .candidateName(dto.getCandidateName())
                .position(dto.getPosition())
                .email(dto.getEmail())
                .interviewType(dto.getInterviewType())
                .interviewDate(dto.getInterviewDate())
                .interviewTime(dto.getInterviewTime())
                .durationMinutes(dto.getDurationMinutes())
                .location(dto.getLocation())
                .interviewer(dto.getInterviewer())
                .status("SCHEDULED")
                .build();

        repository.save(interview);
        return interview.getId();
    }

    // ✅ Fetch all interviews
    public List<InterviewResponseDto> getAllInterviews() {
        return repository.findAll().stream()
                .map(i -> InterviewResponseDto.builder()
                        .id(i.getId())
                        .candidateName(i.getCandidateName())
                        .position(i.getPosition())
                        .email(i.getEmail()) 
                        .interviewType(i.getInterviewType())
                        .interviewDate(i.getInterviewDate())
                        .interviewTime(i.getInterviewTime())
                        .durationMinutes(i.getDurationMinutes())
                        .interviewer(i.getInterviewer())
                        .status(i.getStatus())
                        .build())
                .toList();
    }

    // ✅ Cancel interview
    public void cancelInterview(String id) {
        Interview interview = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        interview.setStatus("CANCELLED");
        repository.save(interview);
    }

    // ✅ DELETE interview permanently
public void deleteInterview(String id) {
    if (!repository.existsById(id)) {
        throw new RuntimeException("Interview not found");
    }
    repository.deleteById(id);
}

public void updateInterview(String id, InterviewRequestDto dto) {
    Interview interview = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Interview not found"));

    interview.setCandidateName(dto.getCandidateName());
    interview.setPosition(dto.getPosition());
    interview.setEmail(dto.getEmail());
    interview.setInterviewType(dto.getInterviewType());
    interview.setInterviewDate(dto.getInterviewDate());
    interview.setInterviewTime(dto.getInterviewTime());
    interview.setDurationMinutes(dto.getDurationMinutes());
    interview.setLocation(dto.getLocation());
    interview.setInterviewer(dto.getInterviewer());

    repository.save(interview);
}


}
