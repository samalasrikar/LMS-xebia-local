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
            studentRepository.save(new Student("s1", "Alex Mercer", "Cohort A (Q3)", "Active", "alex.mercer@xebia.com", "Engineering", "Cloud Native Engineering", 85, "30h"));
            studentRepository.save(new Student("s4", "Jane Doe", "Cohort A (Q3)", "Active", "jane.doe@xebia.com", "Engineering", "Cloud Native Engineering", 92, "45h"));
            studentRepository.save(new Student("s2", "John Doe", "Cohort A (Q3)", "Active", "john.doe@xebia.com", "Engineering", "Advanced Cloud Architecture", 72, "24h"));
            studentRepository.save(new Student("s3", "Maria Davis", "UI Bootcamp (Batch 4)", "Completed", "maria.davis@xebia.com", "Design", "Advanced UI Design Systems", 100, "12h"));
            studentRepository.save(new Student("s5", "Arjun Mehta", "AWS Foundations", "Active", "arjun.mehta@xebia.com", "Engineering", "AWS Cloud Deployments", 45, "18h"));
            studentRepository.save(new Student("s6", "Sarah Jenkins", "Cohort A (Q3)", "Active", "sarah.jenkins@xebia.com", "Leadership", "Managing Remote Teams", 90, "8h"));
            studentRepository.save(new Student("s7", "Jane Smith", "Cohort A (Q3)", "Active", "jane.smith@xebia.com", "Marketing", "Inbound Marketing Strategy", 10, "2h"));
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
