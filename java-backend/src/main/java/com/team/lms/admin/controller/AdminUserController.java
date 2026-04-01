package com.team.lms.admin.controller;

import com.team.lms.admin.dto.AdminCreateUserRequest;
import com.team.lms.admin.service.AdminUserService;
import com.team.lms.admin.vo.AdminUserVo;
import com.team.lms.common.api.ApiResponse;
import com.team.lms.common.api.BaseController;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/users")
public class AdminUserController extends BaseController {

    private final AdminUserService adminUserService;

    @PostMapping
    public ApiResponse<AdminUserVo> createUser(@Valid @RequestBody AdminCreateUserRequest request) {
        return success(adminUserService.createUser(request));
    }

    @GetMapping
    public ApiResponse<List<AdminUserVo>> listUsers() {
        return success(adminUserService.listUsers());
    }
}
