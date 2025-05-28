package com.examly.springappuser.service;

import com.examly.springappuser.model.User;
import com.examly.springappuser.model.LoginDTO;
import com.examly.springappuser.repository.UserRepo;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    public User registerUser(User user) {
        // Add password encoding in production
        return userRepo.save(user);
    }

    @Override
    public String loginUser(LoginDTO loginDTO) {
        User user = userRepo.findByEmail(loginDTO.getEmail());
        if (user != null && loginDTO.getPassword().equals(user.getPassword())) { // Use password encoder in production
            return Jwts.builder()
                    .setSubject(user.getEmail())
                    .claim("role", user.getRole())
                    .claim("userId", user.getId())
                    .signWith(SignatureAlgorithm.HS512, jwtSecret)
                    .compact();
        }
        throw new RuntimeException("Invalid credentials");
    }
}