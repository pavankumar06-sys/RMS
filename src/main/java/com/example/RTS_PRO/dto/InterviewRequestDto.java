package com.example.RTS_PRO.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class InterviewRequestDto {

    private String candidateName;
    private String position;
    private String email;
    private String interviewType;
    private LocalDate interviewDate;
    private LocalTime interviewTime;
    private Integer durationMinutes;
    private String location;
    private String interviewer;
}