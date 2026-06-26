package com.lms.backend.learning.content;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {

    boolean existsByTitle(String title);

}