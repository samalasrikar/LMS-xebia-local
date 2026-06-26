package com.lms.backend.learning.category;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.lms.backend.exception.ResourceAlreadyExistsException;
import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.learning.category.dto.CategoryRequest;
import com.lms.backend.learning.category.dto.CategoryResponse;


@Service
public class CategoryService {

    private final CategoryRepository repository;
    private final CategoryMapper mapper;
    private static final Logger log = LoggerFactory.getLogger(CategoryService.class);

    public CategoryService(CategoryRepository repository,CategoryMapper mapper) {
            this.repository = repository;
            this.mapper = mapper;
    }

    public List<CategoryResponse> getAllCategories() {

    return repository.findAll()
            .stream()
            .map(mapper::toResponse)
            .collect(Collectors.toList());
    }

    public CategoryResponse createCategory(CategoryRequest request) {

        if (repository.existsByName(request.getName())) {
            throw new ResourceAlreadyExistsException("Category already exists");
        }
            Category category = mapper.toEntity(request);
            log.info("Creating category: {}", request.getName());
            Category savedCategory = repository.save(category);
            log.info("Category created with ID: {}", savedCategory.getId());
        return mapper.toResponse(savedCategory);
    }

    public CategoryResponse updateCategory(@NonNull Long id, CategoryRequest request) {
        log.info("Updating category {}", id);
        Category existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        mapper.updateEntity(existing, request);
        Category updated = repository.save(existing);
        log.info("Category {} updated successfully", id);

    return mapper.toResponse(updated);
    }

    public void deleteCategory(@NonNull Long id) {
        log.info("Deleting category {}", id);
        repository.deleteById(id);
        log.info("Category {} deleted successfully", id);
    }
}