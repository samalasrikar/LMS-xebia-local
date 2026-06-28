package com.lms.backend.config;

import java.sql.Connection;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupRunner implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(StartupRunner.class);

    private final DataSource dataSource;

    public StartupRunner(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(String... args) throws Exception {

        try (Connection connection = dataSource.getConnection()) {

            log.info("========================================");
            log.info("XEBIA LMS BACKEND STARTED");
            log.info("Database : {}", connection.getCatalog());
            log.info("Status   : RUNNING");
            log.info("URL      : http://localhost:8080");
            log.info("========================================");

        } catch (Exception e) {

            log.error("DATABASE CONNECTION FAILED");
            log.error(e.getMessage());

        }

    }
}