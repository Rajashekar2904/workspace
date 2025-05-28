package com.examly.springnotifications.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    private Long userId;
    private String message;
    private LocalDateTime createdAt;
    private String status;

    public Long getNotificationId() { return notificationId; }
    public void setNotificationId(Long notificationId) { this.notificationId = notificationId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}