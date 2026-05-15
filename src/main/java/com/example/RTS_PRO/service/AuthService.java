
package com.example.RTS_PRO.service;
import com.example.RTS_PRO.dto.UpdateUserProfileRequestDTO;

import com.example.RTS_PRO.dto.ChangePasswordRequestDTO;
import com.example.RTS_PRO.dto.LoginRequest;
import com.example.RTS_PRO.dto.RegisterRequest;
import com.example.RTS_PRO.entity.User;
import com.example.RTS_PRO.exception.InvalidPasswordException;
import com.example.RTS_PRO.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /* ===============================
       REGISTER
    ================================ */
    public User register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }

    /* ===============================
       LOGIN
    ================================ */
    public String login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException("Invalid email or password");
        }

        return "Login successful";
    }

    /* ===============================
       CHANGE PASSWORD
    ================================ */
    public void changePassword(String email,
                               ChangePasswordRequestDTO request) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // ✅ VALIDATE CURRENT PASSWORD
        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword()
        )) {
            // ✅ CLEAN EXCEPTION → 400 BAD REQUEST
            throw new InvalidPasswordException(
                    "Current password is incorrect"
            );
        }

        // ✅ UPDATE NEW PASSWORD (LOGIN TABLE)
        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);
    }

    public User updateUserProfile(String currentEmail,
                              UpdateUserProfileRequestDTO request) {

    User user = userRepository.findByEmail(currentEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // ✅ If user changed email, check uniqueness
    if (!currentEmail.equals(request.getEmail())
            && userRepository.findByEmail(request.getEmail()).isPresent()) {
        throw new RuntimeException("Email already exists");
    }

    user.setName(request.getName());
    user.setEmail(request.getEmail());

    return userRepository.save(user);
}
}
