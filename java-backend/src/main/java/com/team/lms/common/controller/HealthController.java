package com.team.lms.common.controller;

import com.team.lms.common.api.ApiResponse;
import com.team.lms.common.api.BaseController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController extends BaseController {

    @GetMapping
    public ApiResponse<Map<String, String>> health() {
        return success(Map.of("status", "UP", "service", "library-management-system"));
    }
}
