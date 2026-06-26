package com.lms.backend.learning.course;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.lms.backend.exception.ResourceAlreadyExistsException;
import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.learning.category.Category;
import com.lms.backend.learning.category.CategoryRepository;
import com.lms.backend.learning.course.dto.CourseRequest;
import com.lms.backend.learning.course.dto.CourseResponse;

@Service
public class CourseService {

    private static final Logger log = LoggerFactory.getLogger(CourseService.class);

    private final CourseRepository repository;
    private final CategoryRepository categoryRepository;
    private final CourseMapper mapper;

    public CourseService(
            CourseRepository repository,
            CategoryRepository categoryRepository,
            CourseMapper mapper) {

        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }

    public List<CourseResponse> getAllCourses() {

        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    public CourseResponse createCourse(CourseRequest request) {

        if (repository.existsByTitle(request.getTitle())) {
            throw new ResourceAlreadyExistsException("Course already exists");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        log.info("Creating course {}", request.getTitle());

        Course saved = repository.save(
                mapper.toEntity(request, category));

        return mapper.toResponse(saved);
    }

    public CourseResponse updateCourse(
            @NonNull Long id,
            CourseRequest request) {

        Course existing = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found"));

        mapper.updateEntity(existing, request, category);

        Course updated = repository.save(existing);

        return mapper.toResponse(updated);
    }

    public void deleteCourse(@NonNull Long id) {

        repository.deleteById(id);
    }
}