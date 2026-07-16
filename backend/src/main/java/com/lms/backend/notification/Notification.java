package com.lms.backend.notification;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    private String id;
    
    private String recipientId;
    private String recipientRole;
    private String category;
    private String icon;
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    private boolean isRead;
    private LocalDateTime createdAt;

    // Navigation target — nullable; used by frontend to route on click
    private String targetType; // e.g. "assignment", "course", "event", "assessment"
    private String targetId;   // the ID of the target resource
}
