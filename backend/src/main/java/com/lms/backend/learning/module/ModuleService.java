package com.lms.backend.learning.module;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.lms.backend.exception.ResourceAlreadyExistsException;
import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.learning.course.Course;
import com.lms.backend.learning.course.CourseRepository;
import com.lms.backend.learning.module.dto.ModuleRequest;
import com.lms.backend.learning.module.dto.ModuleResponse;

@Service
public class ModuleService {

    private static final Logger log = LoggerFactory.getLogger(ModuleService.class);

    private final ModuleRepository repository;
    private final CourseRepository courseRepository;
    private final ModuleMapper mapper;

    public ModuleService(
            ModuleRepository repository,
            CourseRepository courseRepository,
            ModuleMapper mapper) {

        this.repository = repository;
        this.courseRepository = courseRepository;
        this.mapper = mapper;
    }

    public List<ModuleResponse> getAllModules() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    public ModuleResponse createModule(ModuleRequest request) {

        if (repository.existsByTitle(request.getTitle())) {
            throw new ResourceAlreadyExistsException("Module already exists");
        }

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        log.info("Creating module {}", request.getTitle());

        Module saved = repository.save(mapper.toEntity(request, course));

        return mapper.toResponse(saved);
    }

    public ModuleResponse updateModule(
            @NonNull Long id,
            ModuleRequest request) {

        Module existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Module not found"));

        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        mapper.updateEntity(existing, request, course);

        return mapper.toResponse(repository.save(existing));
    }

    public void deleteModule(@NonNull Long id) {
        repository.deleteById(id);
    }
}