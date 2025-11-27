package com.cozystay.controller;

import com.cozystay.model.User;
import com.cozystay.repository.UserRepository;
import com.cozystay.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ---------------- REGISTER ----------------
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            // Check if user already exists
            if (userRepository.findByEmail(user.getEmail()).isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "User already exists with this email");
                return ResponseEntity.badRequest().body(response);
            }

            // Encode password
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Set default role if not provided
            if (user.getRole() == null) {
                user.setRole(User.UserRole.CUSTOMER);
            }

            // Save user
            User savedUser = userRepository.save(user);

            // Return user info without password
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedUser.getId());
            response.put("name", savedUser.getName());
            response.put("email", savedUser.getEmail());
            response.put("phone", savedUser.getPhone());
            response.put("role", savedUser.getRole());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // ---------------- LOGIN ----------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

            if (userOptional.isPresent()) {
                User user = userOptional.get();

                // Check password
                if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                    // Generate JWT token
                    String token = JwtUtil.generateToken(user.getEmail(), user.getRole().name());

                    Map<String, Object> response = new HashMap<>();
                    response.put("id", user.getId());
                    response.put("name", user.getName());
                    response.put("email", user.getEmail());
                    response.put("phone", user.getPhone());
                    response.put("role", user.getRole());
                    response.put("token", token);

                    return ResponseEntity.ok(response);
                }
            }

            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.badRequest().body(response);

        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // ---------------- LOGIN REQUEST DTO ----------------
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}