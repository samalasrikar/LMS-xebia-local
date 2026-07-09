package com.lms.backend.batch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    @PostConstruct
    public void seedInitialData() {
        if (batchRepository.count() == 0) {
            Batch b1 = new Batch();
            b1.setId("BT-9921");
            b1.setName("Cohort A (Q3)");
            b1.setCourse("Advanced Cloud Architecture");
            b1.setCapacity(50);
            b1.setStartDate("2026-10-01");
            b1.setEndDate("2026-12-24");
            b1.setStatus("Active");
            b1.setInstructor("Sarah Jenkins");
            b1.setStudentIds(Arrays.asList("s1", "s2", "s3", "s4"));
            b1.setEnrolled(42); // Seed enrolled count explicitly to match UI
            batchRepository.save(b1);

            Batch b2 = new Batch();
            b2.setId("BT-8812");
            b2.setName("UI Bootcamp (Batch 4)");
            b2.setCourse("Advanced UI Design Systems");
            b2.setCapacity(40);
            b2.setStartDate("2026-10-10");
            b2.setEndDate("2026-11-28");
            b2.setStatus("Active");
            b2.setInstructor("Arjun Mehta");
            b2.setStudentIds(Arrays.asList("s5", "s6"));
            b2.setEnrolled(35);
            batchRepository.save(b2);

            Batch b3 = new Batch();
            b3.setId("BT-7651");
            b3.setName("AWS Foundations");
            b3.setCourse("AWS Cloud Deployments");
            b3.setCapacity(100);
            b3.setStartDate("2026-11-05");
            b3.setEndDate("2026-12-15");
            b3.setStatus("Upcoming");
            b3.setInstructor("Maria Davis");
            b3.setStudentIds(Arrays.asList("s7"));
            b3.setEnrolled(80);
            batchRepository.save(b3);

            Batch b4 = new Batch();
            b4.setId("BT-6543");
            b4.setName("Leadership 101");
            b4.setCourse("Leadership & Empathy");
            b4.setCapacity(30);
            b4.setStartDate("2026-09-01");
            b4.setEndDate("2026-09-30");
            b4.setStatus("Completed");
            b4.setInstructor("John Smith");
            b4.setStudentIds(new ArrayList<>());
            b4.setEnrolled(25);
            batchRepository.save(b4);
        }
    }

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    public Optional<Batch> getBatchById(String id) {
        return batchRepository.findById(id);
    }

    public Batch createBatch(Batch batch) {
        if (batch.getId() == null || batch.getId().trim().isEmpty()) {
            batch.setId("BT-" + (1000 + (int)(Math.random() * 9000)));
        }
        if (batch.getStatus() == null || batch.getStatus().trim().isEmpty()) {
            batch.setStatus("Active");
        }
        batch.setEnrolled(batch.getStudentIds() != null ? batch.getStudentIds().size() : 0);
        return batchRepository.save(batch);
    }

    public Optional<Batch> updateBatch(String id, Batch updatedBatch) {
        return batchRepository.findById(id).map(existing -> {
            if (updatedBatch.getName() != null) existing.setName(updatedBatch.getName());
            if (updatedBatch.getCourse() != null) existing.setCourse(updatedBatch.getCourse());
            if (updatedBatch.getCapacity() != null) existing.setCapacity(updatedBatch.getCapacity());
            if (updatedBatch.getStartDate() != null) existing.setStartDate(updatedBatch.getStartDate());
            if (updatedBatch.getEndDate() != null) existing.setEndDate(updatedBatch.getEndDate());
            if (updatedBatch.getStatus() != null) existing.setStatus(updatedBatch.getStatus());
            if (updatedBatch.getInstructor() != null) existing.setInstructor(updatedBatch.getInstructor());
            if (updatedBatch.getStudentIds() != null) {
                existing.setStudentIds(updatedBatch.getStudentIds());
            }
            return batchRepository.save(existing);
        });
    }

    public boolean deleteBatch(String id) {
        if (batchRepository.existsById(id)) {
            batchRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
