package com.lms.backend.learning.category;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.learning.category.dto.CategoryRequest;
import com.lms.backend.learning.category.dto.CategoryResponse;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Category", description = "Category Management APIs")
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @Operation(summary = "Get all categories")
    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories() {

        return ResponseEntity.ok(
            ResponseBuilder.success(
                    "Categories fetched successfully",
                    service.getAllCategories(),
                    200
            )
    );
    }
    @Operation(summary = "Create category")
    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@Valid @RequestBody CategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(
                    ResponseBuilder.success(
                            "Category created successfully",
                            service.createCategory(request),
                            HttpStatus.CREATED.value()
                    )
            );
        }
    @Operation(summary = "Update category")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request) {

        return ResponseEntity.ok(
            ResponseBuilder.success(
                    "Category updated successfully",
                    service.updateCategory(id, request),
                    HttpStatus.OK.value()
            )
        );
    }
    @Operation(summary = "Delete category")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long id) {

        service.deleteCategory(id);

        return ResponseEntity.ok(
            ResponseBuilder.success(
                    "Category deleted successfully",
                    null,
                    HttpStatus.OK.value()
            )
        );
    }
}