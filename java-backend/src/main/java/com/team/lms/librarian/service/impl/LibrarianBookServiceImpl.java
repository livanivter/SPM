package com.team.lms.librarian.service.impl;

import com.team.lms.common.enums.ShelfStatus;
import com.team.lms.entity.Book;
import com.team.lms.entity.Category;
import com.team.lms.entity.Inventory;
import com.team.lms.exception.BusinessException;
import com.team.lms.librarian.dto.BookCreateRequest;
import com.team.lms.librarian.service.LibrarianBookService;
import com.team.lms.librarian.vo.BookManageVo;
import com.team.lms.mapper.BookMapper;
import com.team.lms.mapper.CategoryMapper;
import com.team.lms.mapper.InventoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LibrarianBookServiceImpl implements LibrarianBookService {

    private final BookMapper bookMapper;
    private final CategoryMapper categoryMapper;
    private final InventoryMapper inventoryMapper;

    @Override
    public BookManageVo createBook(BookCreateRequest request) {
        Category category = categoryMapper.selectAllActive().stream().findFirst()
                .orElseThrow(() -> new BusinessException(400, "no active category found, please initialize categories first"));

        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setIsbn(request.getIsbn());
        book.setPublisher("TBD");
        book.setDescription("Created from librarian workspace");
        book.setCategory(category);
        book.setShelfStatus(ShelfStatus.ON_SHELF);
        bookMapper.insert(book);

        Inventory inventory = new Inventory();
        inventory.setBook(book);
        inventory.setTotalCopies(1);
        inventory.setAvailableCopies(1);
        inventoryMapper.insert(inventory);

        return BookManageVo.builder()
                .bookId(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .totalCopies(inventory.getTotalCopies())
                .availableCopies(inventory.getAvailableCopies())
                .shelfStatus(book.getShelfStatus().name())
                .build();
    }

    @Override
    public List<BookManageVo> listBooks() {
        return bookMapper.selectAll().stream()
                .map(book -> {
                    Inventory inventory = inventoryMapper.selectByBookId(book.getId());
                    return BookManageVo.builder()
                            .bookId(book.getId())
                            .title(book.getTitle())
                            .author(book.getAuthor())
                            .isbn(book.getIsbn())
                            .totalCopies(inventory == null ? 0 : inventory.getTotalCopies())
                            .availableCopies(inventory == null ? 0 : inventory.getAvailableCopies())
                            .shelfStatus(book.getShelfStatus() == null ? null : book.getShelfStatus().name())
                            .build();
                })
                .toList();
    }
}
