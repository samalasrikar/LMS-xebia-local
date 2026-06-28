package com.lms.backend.learning.content;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.lms.backend.exception.ResourceAlreadyExistsException;
import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.learning.content.dto.ContentRequest;
import com.lms.backend.learning.content.dto.ContentResponse;
import com.lms.backend.learning.submodule.SubModule;
import com.lms.backend.learning.submodule.SubModuleRepository;

@Service
public class ContentService {

    private static final Logger log = LoggerFactory.getLogger(ContentService.class);

    private final ContentRepository repository;
    private final SubModuleRepository subModuleRepository;
    private final ContentMapper mapper;

    public ContentService(
            ContentRepository repository,
            SubModuleRepository subModuleRepository,
            ContentMapper mapper) {

        this.repository = repository;
        this.subModuleRepository = subModuleRepository;
        this.mapper = mapper;
    }

    public List<ContentResponse> getAllContents() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    public ContentResponse createContent(ContentRequest request) {

        if (repository.existsByTitleAndSubModule_Id(request.getTitle(), request.getSubModuleId())) {
            throw new ResourceAlreadyExistsException("Content with this title already exists in this submodule");
        }

        SubModule subModule = subModuleRepository.findById(Objects.requireNonNull(request.getSubModuleId()))
                .orElseThrow(() -> new ResourceNotFoundException("SubModule not found"));

        log.info("Creating content {}", request.getTitle());

        Content entity = mapper.toEntity(request, subModule);
        Content saved = repository.save(Objects.requireNonNull(entity));

        return mapper.toResponse(saved);
    }

    public ContentResponse updateContent(
            @NonNull Long id,
            ContentRequest request) {

        Content existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found"));

        SubModule subModule = subModuleRepository.findById(Objects.requireNonNull(request.getSubModuleId()))
                .orElseThrow(() -> new ResourceNotFoundException("SubModule not found"));

        mapper.updateEntity(existing, request, subModule);

        Content updated = repository.save(Objects.requireNonNull(existing));
        return mapper.toResponse(updated);
    }

    public void deleteContent(@NonNull Long id) {
        repository.deleteById(id);
    }
}