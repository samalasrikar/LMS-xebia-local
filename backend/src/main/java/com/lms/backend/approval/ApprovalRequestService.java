package com.lms.backend.approval;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

// TODO: Add role-based visibility filtering once Spring Security auth is implemented.
@Service
@SuppressWarnings("null")
public class ApprovalRequestService {

    @Autowired
    private ApprovalRequestRepository repository;

    public Page<ApprovalRequest> getRequestsPaginated(String query, Pageable pageable) {
        return repository.findAll((root, criteriaQuery, cb) -> {
            if (query == null || query.trim().isEmpty()) {
                return null;
            }
            String searchPattern = "%" + query.trim().toLowerCase() + "%";
            return cb.or(
                cb.like(cb.lower(root.get("name")), searchPattern),
                cb.like(cb.lower(root.get("course")), searchPattern),
                cb.like(cb.lower(root.get("type")), searchPattern)
            );
        }, pageable);
    }

    public Map<String, Object> getApprovalStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("pendingRequests", repository.countByStatus("Pending"));
        stats.put("approvedCount", repository.countByStatus("Approved"));
        stats.put("rejectedCount", repository.countByStatus("Rejected"));
        stats.put("escalatedCount", repository.countByPriority("High")); // high priority mapped as escalated
        return stats;
    }

    public Optional<ApprovalRequest> updateStatus(Long id, String status) {
        return repository.findById(id).map(request -> {
            request.setStatus(status);
            return repository.save(request);
        });
    }
}
