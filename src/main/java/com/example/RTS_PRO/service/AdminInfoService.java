package com.example.RTS_PRO.service;

import com.example.RTS_PRO.dto.AdminInfoRequestDTO;
import com.example.RTS_PRO.entity.Organization;
import com.example.RTS_PRO.repository.OrganizationRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminInfoService {

    private final OrganizationRepository organizationRepository;

    public AdminInfoService(OrganizationRepository organizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    public Organization saveOrUpdateAdminInfo(AdminInfoRequestDTO dto) {

        // ✅ For now: single organization system
        Organization org = organizationRepository
                .findAll()
                .stream()
                .findFirst()
                .orElse(new Organization());

        org.setAdminRole(dto.getAdminRole());
        org.setPosition(dto.getPosition());
        org.setCompanyName(dto.getCompanyName());
        org.setWebsite(dto.getWebsite());
        org.setPhone(dto.getPhone());
        org.setAddress(dto.getAddress());

        return organizationRepository.save(org);
    }

    public Organization getAdminInfo() {
        return organizationRepository
                .findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }
}