package com.lms.backend.learning.course.dto;

public class CourseResponse {

    private Long id;
    private String title;
    private String description;
    private String thumbnail;
    private String curriculum;
    private String difficulty;
    private String duration;

    private Long categoryId;
    private String categoryName;
    private String status;

    public CourseResponse() {
    }

    public CourseResponse(
            Long id,
            String title,
            String description,
            String thumbnail,
            String curriculum,
            String difficulty,
            String duration,
            Long categoryId,
            String categoryName,
            String status) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.curriculum = curriculum;
        this.difficulty = difficulty;
        this.duration = duration;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.status = status;
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

    public String getCurriculum() {
        return curriculum;
    }

    public void setCurriculum(String curriculum) {
        this.curriculum = curriculum;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}