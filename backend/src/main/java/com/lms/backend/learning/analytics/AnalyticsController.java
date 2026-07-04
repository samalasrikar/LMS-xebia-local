package com.lms.backend.learning.analytics;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.learning.analytics.dto.DashboardResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/coverage/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getCoverageDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Coverage dashboard payload fetched successfully",
                analyticsService.getCoverageDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/certifications/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getCertificationsDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Certifications dashboard payload fetched successfully",
                analyticsService.getCertificationsDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/champions/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getChampionsDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Champions dashboard payload fetched successfully",
                analyticsService.getChampionsDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/flagship/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getFlagshipDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Flagship programs dashboard payload fetched successfully",
                analyticsService.getFlagshipDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/trends/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getTrendsDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Trends dashboard payload fetched successfully",
                analyticsService.getTrendsDashboard(filters, page, size),
                200
            )
        );
    }

    @GetMapping("/executive/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getExecutiveSummaryDashboard(
            @RequestParam(required = false) String year,
            @RequestParam(required = false) String quarter,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String bu,
            @RequestParam(required = false) String practice,
            @RequestParam(required = false) String search) {

        Map<String, String> filters = buildFiltersMap(year, quarter, region, department, bu, practice, search);
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Executive summary dashboard payload fetched successfully",
                analyticsService.getExecutiveSummaryDashboard(filters),
                200
            )
        );
    }

    private Map<String, String> buildFiltersMap(
            String year, String quarter, String region, String department, String bu, String practice, String search) {
        Map<String, String> map = new HashMap<>();
        if (year != null) map.put("year", year);
        if (quarter != null) map.put("quarter", quarter);
        if (region != null) map.put("region", region);
        if (department != null) map.put("department", department);
        if (bu != null) map.put("bu", bu);
        if (practice != null) map.put("practice", practice);
        if (search != null) map.put("search", search);
        return map;
    }
}
