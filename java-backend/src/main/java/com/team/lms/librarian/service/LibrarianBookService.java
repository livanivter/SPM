package com.team.lms.librarian.service;

import com.team.lms.librarian.dto.BookCreateRequest;
import com.team.lms.librarian.vo.BookManageVo;

import java.util.List;

public interface LibrarianBookService {
    BookManageVo createBook(BookCreateRequest request);

    List<BookManageVo> listBooks();
}
