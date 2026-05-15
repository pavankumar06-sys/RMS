package com.example.RTS_PRO.repository;

import com.example.RTS_PRO.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository extends JpaRepository<Interview, String> {
}