package com.lms.backend.learning.category.dto;

public class CategoryResponse {

    private Long id;
    private String name;
    private String description;
    private String image;
    private String status;

    public CategoryResponse() {
    }

    public CategoryResponse(Long id, String name, String description, String image, String status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.status = status != null ? status : "Active";
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
}