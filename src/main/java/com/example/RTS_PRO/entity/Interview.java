package com.example.RTS_PRO.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "interviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String candidateName;

    private String position;
    private String email;
    private String interviewType;

    private LocalDate interviewDate;
    private LocalTime interviewTime;

    private Integer durationMinutes;
    private String location;
    private String interviewer;

    private String status; // SCHEDULED, CANCELLED, COMPLETED
}