package com.lms.backend.student;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.student.dto.CertificateResponse;
import com.lms.backend.student.dto.GradeResponse;
import com.lms.backend.student.dto.StudentAnalyticsResponse;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    /* ─── Portal Analytics Endpoints ─── */

    @GetMapping("/api/student/grades")
    public ResponseEntity<ApiResponse<List<GradeResponse>>> getGrades() {
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Student grades fetched successfully",
                studentService.getGrades(),
                200
            )
        );
    }

    @GetMapping("/api/student/certificates")
    public ResponseEntity<ApiResponse<List<CertificateResponse>>> getCertificates() {
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Student certificates fetched successfully",
                studentService.getCertificates(),
                200
            )
        );
    }

    @GetMapping("/api/student/analytics")
    public ResponseEntity<ApiResponse<StudentAnalyticsResponse>> getAnalytics() {
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Student analytics metrics fetched successfully",
                studentService.getAnalytics(),
                200
            )
        );
    }

    /* ─── Roster/Directory Management Endpoints ─── */

    @GetMapping("/api/students")
    public com.lms.backend.common.ApiResponse<?> getStudents(
            @RequestParam(required = false) String batch,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String dept,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "false") boolean all) {
        
        org.springframework.data.domain.Sort sort = sortDir.equalsIgnoreCase("desc")
                ? org.springframework.data.domain.Sort.by(sortBy).descending()
                : org.springframework.data.domain.Sort.by(sortBy).ascending();
        
        if (all) {
            return new com.lms.backend.common.ApiResponse<>(studentService.getStudents(q, dept, batch, sort));
        }
        
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size, sort);
        return new com.lms.backend.common.ApiResponse<>(studentService.getStudentsPaginated(q, dept, batch, pageable));
    }

    @GetMapping("/api/students/stats")
    public com.lms.backend.common.ApiResponse<Map<String, Object>> getStudentStats() {
        return new com.lms.backend.common.ApiResponse<>(studentService.getStudentStats());
    }

    @GetMapping("/api/students/{id}")
    public ResponseEntity<com.lms.backend.common.ApiResponse<Student>> getStudentById(@PathVariable String id) {
        return studentService.getStudentById(id)
                .map(student -> ResponseEntity.ok(new com.lms.backend.common.ApiResponse<>(student)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/api/students")
    public ResponseEntity<com.lms.backend.common.ApiResponse<Student>> createStudent(@RequestBody Student student) {
        Student created = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(new com.lms.backend.common.ApiResponse<>(created));
    }
}
