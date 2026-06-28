package com.lms.backend.learning.category.dto;

import java.time.LocalDateTime;
import java.util.Base64;

public class CategoryResponse {

    private Long id;
    private String name;
    private String description;
    private String image; // base64-encoded for frontend display
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CategoryResponse() {
    }

    public CategoryResponse(Long id,
                            String name,
                            String description,
                            byte[] imageBytes,
                            String status,
                            LocalDateTime createdAt,
                            LocalDateTime updatedAt) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.image = imageBytes != null
                ? "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(imageBytes)
                : null;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}