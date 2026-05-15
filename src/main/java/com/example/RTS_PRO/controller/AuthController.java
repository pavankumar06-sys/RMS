
package com.example.RTS_PRO.controller;

import com.example.RTS_PRO.dto.UpdateUserProfileRequestDTO;

import com.example.RTS_PRO.dto.ChangePasswordRequestDTO;
import com.example.RTS_PRO.dto.LoginRequest;
import com.example.RTS_PRO.dto.RegisterRequest;
import com.example.RTS_PRO.entity.User;
import com.example.RTS_PRO.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /* ===============================
       REGISTER
    ================================ */
    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    /* ===============================
       LOGIN
    ================================ */
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    /* ===============================
       CHANGE PASSWORD
       (USED BY ADMIN INFO PAGE)
    ================================ */
    @PutMapping("/change-password")
    public String changePassword(
            @RequestParam String email,      // temporary (JWT later)
            @RequestBody ChangePasswordRequestDTO request
    ) {
        authService.changePassword(email, request);
        return "Password updated successfully";
    }

    /* ===============================
        UPDATE USER PROFILE
        (ADMIN NAME & EMAIL)
        =============================== */
        @PutMapping("/update-profile")
        public User updateProfile(
                @RequestParam String email,  // current logged-in email
                @RequestBody UpdateUserProfileRequestDTO request
        ) {
            return authService.updateUserProfile(email, request);
        }

}