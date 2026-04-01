package com.team.lms.reader.controller;

import com.team.lms.common.api.ApiResponse;
import com.team.lms.common.api.BaseController;
import com.team.lms.reader.dto.ReaderBorrowRequestCreateRequest;
import com.team.lms.reader.service.ReaderBookService;
import com.team.lms.reader.vo.ReaderBookVo;
import com.team.lms.reader.vo.ReaderBorrowRequestVo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reader/books")
public class ReaderBookController extends BaseController {

    private final ReaderBookService readerBookService;

    @GetMapping
    public ApiResponse<List<ReaderBookVo>> listVisibleBooks(@RequestParam(value = "q", required = false) String keyword) {
        return success(readerBookService.listVisibleBooks(keyword));
    }

    @PostMapping("/borrow-requests")
    public ApiResponse<ReaderBorrowRequestVo> submitBorrowRequest(
            @RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody ReaderBorrowRequestCreateRequest request
    ) {
        return success(readerBookService.submitBorrowRequest(authorizationHeader, request));
    }
}
