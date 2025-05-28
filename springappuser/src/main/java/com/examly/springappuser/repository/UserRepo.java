package com.examly.springappuser.repository;

import com.examly.springappuser.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, String> {
    boolean existsByUsername(String username);
    User findByUsername(String username);
}
