package com.team.lms.librarian.controller;

import com.team.lms.common.api.ApiResponse;
import com.team.lms.common.api.BaseController;
import com.team.lms.librarian.dto.BookCreateRequest;
import com.team.lms.librarian.service.LibrarianBookService;
import com.team.lms.librarian.vo.BookManageVo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/librarian/books")
public class LibrarianBookController extends BaseController {

    private final LibrarianBookService librarianBookService;

    @GetMapping
    public ApiResponse<List<BookManageVo>> listBooks() {
        return success(librarianBookService.listBooks());
    }

    @PostMapping
    public ApiResponse<BookManageVo> createBook(@Valid @RequestBody BookCreateRequest request) {
        return success(librarianBookService.createBook(request));
    }
}
