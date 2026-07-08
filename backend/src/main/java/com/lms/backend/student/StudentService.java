package com.lms.backend.student;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("subStudentService")
@SuppressWarnings("null")
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @PostConstruct
    public void seedStudents() {
        if (studentRepository.count() == 0) {
            studentRepository.save(new Student("s4", "Jane Doe", "B-2024-Q1", "Active"));
            studentRepository.save(new Student("s1", "Alex Mercer", "B-2023-Q4", "Active"));
        }
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Student> getStudentsByBatch(String batch) {
        return studentRepository.findByBatch(batch);
    }

    public Optional<Student> getStudentById(String id) {
        return studentRepository.findById(id);
    }

    public Student createStudent(Student student) {
        if (student.getId() == null || student.getId().trim().isEmpty()) {
            student.setId("s_" + System.currentTimeMillis());
        }
        if (student.getStatus() == null || student.getStatus().trim().isEmpty()) {
            student.setStatus("Active");
        }
        return studentRepository.save(student);
    }
}
