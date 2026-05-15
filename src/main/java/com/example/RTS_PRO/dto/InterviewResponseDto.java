package com.example.RTS_PRO.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class InterviewResponseDto {

    private String id;
    private String candidateName;
    private String position;
    private String email;
    private String interviewType;
    private LocalDate interviewDate;
    private LocalTime interviewTime;
    private Integer durationMinutes;
    private String interviewer;
    private String status;
}