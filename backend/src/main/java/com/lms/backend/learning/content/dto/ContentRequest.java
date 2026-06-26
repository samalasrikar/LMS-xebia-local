package com.lms.backend.learning.content.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ContentRequest {

    @NotBlank(message = "Content title is required")
    @Size(max = 200)
    private String title;

    @NotBlank(message = "Content body is required")
    private String content;

    private String videoUrl;

    private String pdfUrl;

    @NotNull(message = "SubModule is required")
    private Long subModuleId;

    public ContentRequest() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    public Long getSubModuleId() {
        return subModuleId;
    }

    public void setSubModuleId(Long subModuleId) {
        this.subModuleId = subModuleId;
    }
}