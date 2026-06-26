package com.lms.backend.learning.course.dto;

public class CourseResponse {

    private Long id;
    private String title;
    private String description;
    private String thumbnail;

    private Long categoryId;
    private String categoryName;

    public CourseResponse() {
    }

    public CourseResponse(
            Long id,
            String title,
            String description,
            String thumbnail,
            Long categoryId,
            String categoryName) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}