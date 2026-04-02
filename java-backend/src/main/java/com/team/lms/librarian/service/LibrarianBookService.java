package com.team.lms.librarian.service;

import com.team.lms.librarian.dto.BookCreateRequest;
import com.team.lms.librarian.dto.BookUpdateRequest;
import com.team.lms.librarian.dto.InventoryUpdateRequest;
import com.team.lms.librarian.dto.ShelfStatusUpdateRequest;
import com.team.lms.librarian.vo.BookManageVo;

import java.util.List;

public interface LibrarianBookService {
    BookManageVo createBook(BookCreateRequest request);
    BookManageVo updateBook(Long bookId, BookUpdateRequest request);
    BookManageVo updateInventory(Long bookId, InventoryUpdateRequest request);
    BookManageVo updateShelfStatus(Long bookId, ShelfStatusUpdateRequest request);
    void deleteBook(Long bookId);

    List<BookManageVo> listBooks();
}
