package com.lms.backend.student;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(length = 255)
    private String avatar;

    @Column(length = 100)
    private String department;

    @Column(name = "academic_year", length = 30)
    private String academicYear;

    @Column(nullable = false)
    private double gpa;

    @Column(name = "study_streak", nullable = false)
    private int studyStreak;

    private String batch;
    private String status;
    private String course;
    private Integer progress;
    private String hours;
}
