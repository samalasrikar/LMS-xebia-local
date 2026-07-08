package com.lms.backend.trainer;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    @PostConstruct
    public void seedTrainers() {
        if (trainerRepository.count() == 0) {
            trainerRepository.save(new Trainer("t1", "Sarah Jenkins", "sarah.j@xebia.com", "Principal Cloud Architect", "Cloud Solutions", 5, 142, 4.9, "Active", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"));
            trainerRepository.save(new Trainer("t2", "Arjun Mehta", "arjun.m@xebia.com", "Lead UI Developer", "Frontend", 4, 98, 4.8, "Active", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"));
            trainerRepository.save(new Trainer("t3", "Maria Davis", "maria.d@xebia.com", "DevOps Engineer", "Infrastructure", 3, 110, 4.7, "Active", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"));
            trainerRepository.save(new Trainer("t4", "John Smith", "john.s@xebia.com", "Agile Coach", "Leadership", 3, 62, 4.6, "Active", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"));
            trainerRepository.save(new Trainer("t5", "David Wilson", "david.w@xebia.com", "Security Principal", "Cybersecurity", 2, 45, 4.5, "Inactive", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"));
        }
    }

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Optional<Trainer> getTrainerById(String id) {
        return trainerRepository.findById(id);
    }

    public Trainer createTrainer(Trainer trainer) {
        if (trainer.getId() == null || trainer.getId().trim().isEmpty()) {
            trainer.setId("t_" + System.currentTimeMillis());
        }
        if (trainer.getStatus() == null || trainer.getStatus().trim().isEmpty()) {
            trainer.setStatus("Active");
        }
        if (trainer.getRating() == null) {
            trainer.setRating(5.0);
        }
        if (trainer.getCourses() == null) {
            trainer.setCourses(0);
        }
        if (trainer.getLearners() == null) {
            trainer.setLearners(0);
        }
        if (trainer.getImg() == null || trainer.getImg().trim().isEmpty()) {
            trainer.setImg("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150");
        }
        return trainerRepository.save(trainer);
    }

    public Optional<Trainer> updateTrainer(String id, Trainer updated) {
        return trainerRepository.findById(id).map(existing -> {
            if (updated.getName() != null) existing.setName(updated.getName());
            if (updated.getEmail() != null) existing.setEmail(updated.getEmail());
            if (updated.getRole() != null) existing.setRole(updated.getRole());
            if (updated.getDept() != null) existing.setDept(updated.getDept());
            if (updated.getCourses() != null) existing.setCourses(updated.getCourses());
            if (updated.getLearners() != null) existing.setLearners(updated.getLearners());
            if (updated.getRating() != null) existing.setRating(updated.getRating());
            if (updated.getStatus() != null) existing.setStatus(updated.getStatus());
            if (updated.getImg() != null) existing.setImg(updated.getImg());
            return trainerRepository.save(existing);
        });
    }

    public boolean deleteTrainer(String id) {
        if (trainerRepository.existsById(id)) {
            trainerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
