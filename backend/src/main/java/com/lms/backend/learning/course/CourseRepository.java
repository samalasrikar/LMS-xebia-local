package com.lms.backend.learning.course;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {

    boolean existsByTitle(String title);
    List<Course> findTop5ByOrderByIdDesc();
}