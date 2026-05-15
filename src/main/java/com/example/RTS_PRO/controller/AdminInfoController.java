package com.example.RTS_PRO.controller;

import com.example.RTS_PRO.dto.AdminInfoRequestDTO;
import com.example.RTS_PRO.entity.Organization;
import com.example.RTS_PRO.service.AdminInfoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin-info")
public class AdminInfoController {

    private final AdminInfoService adminInfoService;

    public AdminInfoController(AdminInfoService adminInfoService) {
        this.adminInfoService = adminInfoService;
    }

    /* ===============================
       GET ADMIN INFO
    ================================ */
    @GetMapping
    public Organization getAdminInfo() {
        return adminInfoService.getAdminInfo();
    }

    /* ===============================
       UPDATE ADMIN INFO
    ================================ */
    @PutMapping
    public Organization updateAdminInfo(
            @RequestBody AdminInfoRequestDTO request) {
        return adminInfoService.saveOrUpdateAdminInfo(request);
    }
}
