package com.lms.backend.learning.submodule;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubModuleRepository extends JpaRepository<SubModule, Long> {

    boolean existsByTitle(String title);

}