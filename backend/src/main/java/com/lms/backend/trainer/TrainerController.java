package com.lms.backend.trainer;

import com.lms.backend.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @GetMapping
    public ApiResponse<List<Trainer>> getAllTrainers() {
        return new ApiResponse<>(trainerService.getAllTrainers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Trainer>> getTrainerById(@PathVariable String id) {
        return trainerService.getTrainerById(id)
                .map(trainer -> ResponseEntity.ok(new ApiResponse<>(trainer)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Trainer>> createTrainer(@RequestBody Trainer trainer) {
        Trainer created = trainerService.createTrainer(trainer);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Trainer>> updateTrainer(@PathVariable String id, @RequestBody Trainer trainer) {
        return trainerService.updateTrainer(id, trainer)
                .map(updated -> ResponseEntity.ok(new ApiResponse<>(updated)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Boolean>> deleteTrainer(@PathVariable String id) {
        boolean deleted = trainerService.deleteTrainer(id);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>(true));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
