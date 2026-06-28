package com.lms.backend.learning.category;

import org.springframework.stereotype.Component;
import com.lms.backend.learning.category.dto.CategoryRequest;
import com.lms.backend.learning.category.dto.CategoryResponse;

@Component
public class CategoryMapper {

    public Category toEntity(CategoryRequest request) {
        if (request == null) {
            return null;
        }

        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setImage(request.getImage());
        category.setStatus(request.getStatus() != null ? request.getStatus() : "Active");

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
                category.getStatus()
        );
    }

    public void updateEntity(Category category, CategoryRequest request) {
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setImage(request.getImage());
        category.setStatus(request.getStatus() != null ? request.getStatus() : "Active");
    }
}