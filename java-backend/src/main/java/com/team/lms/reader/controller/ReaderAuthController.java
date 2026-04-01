package com.team.lms.reader.controller;

import com.team.lms.common.api.ApiResponse;
import com.team.lms.common.api.BaseController;
import com.team.lms.reader.dto.ReaderLoginRequest;
import com.team.lms.reader.dto.ReaderRegisterRequest;
import com.team.lms.reader.service.ReaderAuthService;
import com.team.lms.reader.vo.ReaderAuthVo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reader/auth")
public class ReaderAuthController extends BaseController {

    private final ReaderAuthService readerAuthService;

    @PostMapping("/register")
    public ApiResponse<ReaderAuthVo> register(@Valid @RequestBody ReaderRegisterRequest request) {
        return success(readerAuthService.register(request));
    }

    @PostMapping("/login")
    public ApiResponse<ReaderAuthVo> login(@Valid @RequestBody ReaderLoginRequest request) {
        return success(readerAuthService.login(request));
    }
}
