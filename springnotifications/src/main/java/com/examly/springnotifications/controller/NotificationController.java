package com.examly.springnotifications.controller;

import com.examly.springnotifications.model.Notification;
import com.examly.springnotifications.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    @PreAuthorize("hasRole('TELLER') or hasRole('MANAGER')")
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification, @RequestHeader("Authorization") String token) {
        try {
            Long userId = extractUserIdFromToken(token);
            Notification createdNotification = notificationService.createNotification(notification, userId);
            return new ResponseEntity<>(createdNotification, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating notification: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('TELLER') or hasRole('MANAGER')")
    public ResponseEntity<List<Notification>> getNotificationsByUserId(@PathVariable Long userId, @RequestHeader("Authorization") String token) {
        try {
            List<Notification> notifications = notificationService.getNotificationsByUserId(userId);
            return notifications.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(notifications, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching notifications: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Long extractUserIdFromToken(String token) {
        return 1L; // Placeholder; implement JWT parsing
    }
}