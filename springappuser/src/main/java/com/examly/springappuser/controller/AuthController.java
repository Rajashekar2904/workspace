package com.examly.springappuser.controller;

import com.examly.springappuser.model.User;
import com.examly.springappuser.security.JwtUtil;
import com.examly.springappuser.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (userService.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Username already exists"));
        }
        // Only allow roles CUSTOMER, TELLER, MANAGER for signup
        if (!(user.getRole().equalsIgnoreCase("CUSTOMER")
                || user.getRole().equalsIgnoreCase("TELLER")
                || user.getRole().equalsIgnoreCase("MANAGER"))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Invalid role"));
        }
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid username or password"));
        }
        if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }
        String token = jwtUtil.generateToken(existingUser.getUsername(), existingUser.getRole());
        return ResponseEntity.ok(Map.of("token", token, "role", existingUser.getRole(), "username", existingUser.getUsername()));
    }
}
