package com.lms.backend.learning.submodule;

import org.springframework.stereotype.Component;

import com.lms.backend.learning.module.Module;
import com.lms.backend.learning.submodule.dto.SubModuleRequest;
import com.lms.backend.learning.submodule.dto.SubModuleResponse;

@Component
public class SubModuleMapper {

    public SubModule toEntity(SubModuleRequest request, Module module) {

        if (request == null) {
            return null;
        }

        SubModule subModule = new SubModule();
        subModule.setTitle(request.getTitle());
        subModule.setDescription(request.getDescription());
        subModule.setModule(module);

        return subModule;
    }

    public SubModuleResponse toResponse(SubModule subModule) {

        if (subModule == null) {
            return null;
        }

        return new SubModuleResponse(
                subModule.getId(),
                subModule.getTitle(),
                subModule.getDescription(),
                subModule.getModule().getId(),
                subModule.getModule().getTitle()
        );
    }

    public void updateEntity(
            SubModule subModule,
            SubModuleRequest request,
            Module module) {

        subModule.setTitle(request.getTitle());
        subModule.setDescription(request.getDescription());
        subModule.setModule(module);
    }
}