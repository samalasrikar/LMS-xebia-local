package com.lms.backend.learning.submodule;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.learning.submodule.dto.SubModuleRequest;
import com.lms.backend.learning.submodule.dto.SubModuleResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/submodules")
@CrossOrigin(origins = "*")
@Tag(name = "SubModule", description = "SubModule APIs")
public class SubModuleController {

    private final SubModuleService service;

    public SubModuleController(SubModuleService service) {
        this.service = service;
    }

    @Operation(summary = "Get all submodules")
    @GetMapping
    public ResponseEntity<ApiResponse<List<SubModuleResponse>>> getAllSubModules() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "SubModules fetched successfully",
                        service.getAllSubModules(),
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Create submodule")
    @PostMapping
    public ResponseEntity<ApiResponse<SubModuleResponse>> createSubModule(
            @Valid @RequestBody SubModuleRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.success(
                        "SubModule created successfully",
                        service.createSubModule(request),
                        HttpStatus.CREATED.value()));
    }

    @Operation(summary = "Update submodule")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SubModuleResponse>> updateSubModule(
            @PathVariable String id,
            @Valid @RequestBody SubModuleRequest request) {

        if (id == null || "undefined".equalsIgnoreCase(id) || id.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ResponseBuilder.failure("Invalid SubModule ID", HttpStatus.BAD_REQUEST.value()));
        }

        Long parsedId;
        try {
            parsedId = Long.parseLong(id);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(ResponseBuilder.failure("Invalid SubModule ID format", HttpStatus.BAD_REQUEST.value()));
        }

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "SubModule updated successfully",
                        service.updateSubModule(parsedId, request),
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Delete submodule")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteSubModule(
            @PathVariable String id) {

        if (id == null || "undefined".equalsIgnoreCase(id) || id.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(ResponseBuilder.failure("Invalid SubModule ID", HttpStatus.BAD_REQUEST.value()));
        }

        Long parsedId;
        try {
            parsedId = Long.parseLong(id);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(ResponseBuilder.failure("Invalid SubModule ID format", HttpStatus.BAD_REQUEST.value()));
        }

        service.deleteSubModule(parsedId);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "SubModule deleted successfully",
                        null,
                        HttpStatus.OK.value()));
    }
}