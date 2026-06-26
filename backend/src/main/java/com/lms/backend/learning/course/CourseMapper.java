package com.lms.backend.learning.course;

import org.springframework.stereotype.Component;

import com.lms.backend.learning.category.Category;
import com.lms.backend.learning.course.dto.CourseRequest;
import com.lms.backend.learning.course.dto.CourseResponse;

@Component
public class CourseMapper {

    public Course toEntity(CourseRequest request, Category category) {

        if (request == null) {
            return null;
        }

        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setThumbnail(request.getThumbnail());
        course.setCategory(category);

        return course;
    }

    public CourseResponse toResponse(Course course) {

        if (course == null) {
            return null;
        }

        return new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getThumbnail(),
                course.getCategory().getId(),
                course.getCategory().getName()
        );
    }

    public void updateEntity(
            Course course,
            CourseRequest request,
            Category category) {

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setThumbnail(request.getThumbnail());
        course.setCategory(category);
    }
}