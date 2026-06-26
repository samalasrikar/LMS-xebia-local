package com.lms.backend.learning.content.dto;

public class ContentResponse {

    private Long id;
    private String title;
    private String content;
    private String videoUrl;
    private String pdfUrl;

    private Long subModuleId;
    private String subModuleTitle;

    public ContentResponse() {}

    public ContentResponse(
            Long id,
            String title,
            String content,
            String videoUrl,
            String pdfUrl,
            Long subModuleId,
            String subModuleTitle) {

        this.id = id;
        this.title = title;
        this.content = content;
        this.videoUrl = videoUrl;
        this.pdfUrl = pdfUrl;
        this.subModuleId = subModuleId;
        this.subModuleTitle = subModuleTitle;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public String getPdfUrl() {
        return pdfUrl;
    }

    public Long getSubModuleId() {
        return subModuleId;
    }

    public String getSubModuleTitle() {
        return subModuleTitle;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public void setPdfUrl(String pdfUrl) {
        this.pdfUrl = pdfUrl;
    }

    public void setSubModuleId(Long subModuleId) {
        this.subModuleId = subModuleId;
    }

    public void setSubModuleTitle(String subModuleTitle) {
        this.subModuleTitle = subModuleTitle;
    }
}