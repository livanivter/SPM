package com.team.lms.librarian.controller;

import com.team.lms.common.api.ApiResponse;
import com.team.lms.common.api.BaseController;
import com.team.lms.librarian.dto.BookCreateRequest;
import com.team.lms.librarian.dto.BookUpdateRequest;
import com.team.lms.librarian.dto.InventoryUpdateRequest;
import com.team.lms.librarian.dto.ShelfStatusUpdateRequest;
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

    @PutMapping("/{bookId}")
    public ApiResponse<BookManageVo> updateBook(@PathVariable Long bookId, @Valid @RequestBody BookUpdateRequest request) {
        return success(librarianBookService.updateBook(bookId, request));
    }

    @PatchMapping("/{bookId}/inventory")
    public ApiResponse<BookManageVo> updateInventory(@PathVariable Long bookId, @Valid @RequestBody InventoryUpdateRequest request) {
        return success(librarianBookService.updateInventory(bookId, request));
    }

    @PatchMapping("/{bookId}/shelf-status")
    public ApiResponse<BookManageVo> updateShelfStatus(@PathVariable Long bookId, @Valid @RequestBody ShelfStatusUpdateRequest request) {
        return success(librarianBookService.updateShelfStatus(bookId, request));
    }

    @DeleteMapping("/{bookId}")
    public ApiResponse<Void> deleteBook(@PathVariable Long bookId) {
        librarianBookService.deleteBook(bookId);
        return success(null);
    }
}
