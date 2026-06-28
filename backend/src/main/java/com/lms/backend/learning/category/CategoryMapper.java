package com.lms.backend.learning.category;

import org.springframework.stereotype.Component;

import com.lms.backend.learning.category.dto.CategoryRequest;
import com.lms.backend.learning.category.dto.CategoryResponse;

@Component
public class CategoryMapper {

    public Category toEntity(CategoryRequest request, byte[] imageBytes) {

        if (request == null) {
            return null;
        }

        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setImage(imageBytes);
        category.setStatus(request.getStatus());

        return category;
    }

    public CategoryResponse toResponse(Category category) {

        if (category == null) {
            return null;
        }

        return new CategoryResponse(
            category.getId(),
            category.getName(),
            category.getDescription(),
            category.getImage(),
            category.getStatus(),
            category.getCreatedAt(),
            category.getUpdatedAt()
        );
    }

    public void updateEntity(Category category, CategoryRequest request, byte[] imageBytes) {

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        // Only overwrite image if a new file was uploaded
        if (imageBytes != null && imageBytes.length > 0) {
            category.setImage(imageBytes);
        }

        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            category.setStatus(request.getStatus());
        }
    }
}