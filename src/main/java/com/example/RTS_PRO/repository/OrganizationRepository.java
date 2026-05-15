package com.example.RTS_PRO.repository;

import com.example.RTS_PRO.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
}