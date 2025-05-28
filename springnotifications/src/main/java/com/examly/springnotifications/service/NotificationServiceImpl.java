package com.examly.springnotifications.service;

import com.examly.springnotifications.model.Notification;
import com.examly.springnotifications.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Notification createNotification(Notification notification, Long userId) {
        notification.setUserId(userId);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setStatus("Unread");
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }
}