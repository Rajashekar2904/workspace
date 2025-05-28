package com.examly.springnotifications.service;

import com.examly.springnotifications.model.Notification;
import java.util.List;

public interface NotificationService {
    Notification createNotification(Notification notification, Long userId);
    List<Notification> getNotificationsByUserId(Long userId);
}