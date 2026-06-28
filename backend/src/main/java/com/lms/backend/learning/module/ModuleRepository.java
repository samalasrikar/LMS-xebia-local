package com.lms.backend.learning.module;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<Module, Long> {

    boolean existsByTitleAndCourse_Id(String title, Long courseId);

}