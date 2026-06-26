package com.lms.backend.learning.submodule;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.lms.backend.exception.ResourceAlreadyExistsException;
import com.lms.backend.exception.ResourceNotFoundException;
import com.lms.backend.learning.module.Module;
import com.lms.backend.learning.module.ModuleRepository;
import com.lms.backend.learning.submodule.dto.SubModuleRequest;
import com.lms.backend.learning.submodule.dto.SubModuleResponse;

@Service
public class SubModuleService {

    private static final Logger log = LoggerFactory.getLogger(SubModuleService.class);

    private final SubModuleRepository repository;
    private final ModuleRepository moduleRepository;
    private final SubModuleMapper mapper;

    public SubModuleService(
            SubModuleRepository repository,
            ModuleRepository moduleRepository,
            SubModuleMapper mapper) {

        this.repository = repository;
        this.moduleRepository = moduleRepository;
        this.mapper = mapper;
    }

    public List<SubModuleResponse> getAllSubModules() {

        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    public SubModuleResponse createSubModule(SubModuleRequest request) {

        if (repository.existsByTitle(request.getTitle())) {
            throw new ResourceAlreadyExistsException("SubModule already exists");
        }

        Module module = moduleRepository.findById(request.getModuleId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Module not found"));

        log.info("Creating submodule {}", request.getTitle());

        SubModule saved = repository.save(
                mapper.toEntity(request, module));

        return mapper.toResponse(saved);
    }

    public SubModuleResponse updateSubModule(
            @NonNull Long id,
            SubModuleRequest request) {

        SubModule existing = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("SubModule not found"));

        Module module = moduleRepository.findById(request.getModuleId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Module not found"));

        mapper.updateEntity(existing, request, module);

        return mapper.toResponse(repository.save(existing));
    }

    public void deleteSubModule(@NonNull Long id) {
        repository.deleteById(id);
    }
}