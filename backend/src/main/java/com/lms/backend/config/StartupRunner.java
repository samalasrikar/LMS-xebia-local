package com.lms.backend.config;

import java.sql.Connection;
import java.util.List;
import java.util.Objects;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.lms.backend.learning.course.Course;
import com.lms.backend.learning.course.CourseRepository;
import com.lms.backend.learning.module.Module;
import com.lms.backend.learning.submodule.SubModule;
import com.lms.backend.learning.content.Content;
import com.lms.backend.learning.student.Student;
import com.lms.backend.learning.student.StudentRepository;

@Component
public class StartupRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(StartupRunner.class);

    private final DataSource dataSource;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    public StartupRunner(DataSource dataSource, CourseRepository courseRepository, StudentRepository studentRepository) {
        this.dataSource = dataSource;
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Default student seeding disabled to clean up dummy data

        try (Connection connection = dataSource.getConnection()) {

            log.info("========================================");
            log.info("XEBIA LMS BACKEND STARTED");
            log.info("Database : {}", connection.getCatalog());
            log.info("Status   : RUNNING");
            log.info("URL      : http://localhost:8080");
            log.info("========================================");

            log.info("Verifying entity hierarchy and checking for N+1 query issue...");
            List<Course> courses = courseRepository.findAllWithCategory();
            
            int moduleCount = 0;
            int submoduleCount = 0;
            int contentCount = 0;

            for (Course course : courses) {
                List<Module> modules = course.getModules();
                if (modules != null) {
                    moduleCount += modules.size();
                    for (Module module : modules) {
                        List<SubModule> submodules = module.getSubModules();
                        if (submodules != null) {
                            submoduleCount += submodules.size();
                            for (SubModule submodule : submodules) {
                                List<Content> contents = submodule.getContents();
                                if (contents != null) {
                                    contentCount += contents.size();
                                }
                            }
                        }
                    }
                }
            }

            log.info("--- STARTUP VERIFICATION SUMMARY ---");
            log.info("Courses    : {}", courses.size());
            log.info("Modules    : {}", moduleCount);
            log.info("Submodules : {}", submoduleCount);
            log.info("Contents   : {}", contentCount);
            log.info("------------------------------------");

        } catch (Exception e) {

            log.error("DATABASE CONNECTION OR VERIFICATION FAILED");
            log.error(e.getMessage(), e);

        }

    }
}