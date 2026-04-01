package com.team.lms.librarian.service.impl;

import com.team.lms.common.enums.ShelfStatus;
import com.team.lms.entity.Book;
import com.team.lms.entity.Category;
import com.team.lms.entity.Inventory;
import com.team.lms.exception.BusinessException;
import com.team.lms.librarian.dto.BookCreateRequest;
import com.team.lms.librarian.dto.BookUpdateRequest;
import com.team.lms.librarian.dto.InventoryUpdateRequest;
import com.team.lms.librarian.dto.ShelfStatusUpdateRequest;
import com.team.lms.librarian.service.LibrarianBookService;
import com.team.lms.librarian.vo.BookManageVo;
import com.team.lms.mapper.BookMapper;
import com.team.lms.mapper.CategoryMapper;
import com.team.lms.mapper.InventoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LibrarianBookServiceImpl implements LibrarianBookService {

    private final BookMapper bookMapper;
    private final CategoryMapper categoryMapper;
    private final InventoryMapper inventoryMapper;

    @Override
    @Transactional
    public BookManageVo createBook(BookCreateRequest request) {
        Category category = requireCategory(request.getCategoryId());
        if (bookMapper.selectByIsbn(request.getIsbn().trim()) != null) {
            throw new BusinessException(400, "isbn already exists");
        }
        if (request.getAvailableCopies() > request.getTotalCopies()) {
            throw new BusinessException(400, "available copies cannot be greater than total copies");
        }

        Book book = new Book();
        book.setTitle(request.getTitle().trim());
        book.setAuthor(request.getAuthor().trim());
        book.setIsbn(request.getIsbn().trim());
        book.setPublisher(normalizeOptional(request.getPublisher()));
        book.setDescription(normalizeOptional(request.getDescription()));
        book.setCategory(category);
        book.setShelfStatus(parseShelfStatus(request.getShelfStatus()));
        bookMapper.insert(book);

        Inventory inventory = new Inventory();
        inventory.setBook(book);
        inventory.setTotalCopies(request.getTotalCopies());
        inventory.setAvailableCopies(request.getAvailableCopies());
        inventoryMapper.insert(inventory);

        return toManageVo(book, inventory);
    }

    @Override
    @Transactional
    public BookManageVo updateBook(Long bookId, BookUpdateRequest request) {
        Book existingBook = requireBook(bookId);
        Category category = requireCategory(request.getCategoryId());

        String nextIsbn = request.getIsbn().trim();
        Book duplicated = bookMapper.selectByIsbn(nextIsbn);
        if (duplicated != null && !duplicated.getId().equals(bookId)) {
            throw new BusinessException(400, "isbn already exists");
        }

        existingBook.setTitle(request.getTitle().trim());
        existingBook.setAuthor(request.getAuthor().trim());
        existingBook.setIsbn(nextIsbn);
        existingBook.setPublisher(normalizeOptional(request.getPublisher()));
        existingBook.setDescription(normalizeOptional(request.getDescription()));
        existingBook.setCategory(category);
        bookMapper.update(existingBook);

        return toManageVo(existingBook, inventoryMapper.selectByBookId(existingBook.getId()));
    }

    @Override
    @Transactional
    public BookManageVo updateInventory(Long bookId, InventoryUpdateRequest request) {
        Book book = requireBook(bookId);
        if (request.getAvailableCopies() > request.getTotalCopies()) {
            throw new BusinessException(400, "available copies cannot be greater than total copies");
        }

        Inventory inventory = inventoryMapper.selectByBookId(bookId);
        if (inventory == null) {
            inventory = new Inventory();
            inventory.setBook(book);
            inventory.setTotalCopies(request.getTotalCopies());
            inventory.setAvailableCopies(request.getAvailableCopies());
            inventoryMapper.insert(inventory);
        } else {
            inventory.setTotalCopies(request.getTotalCopies());
            inventory.setAvailableCopies(request.getAvailableCopies());
            inventoryMapper.update(inventory);
        }

        return toManageVo(book, inventoryMapper.selectByBookId(bookId));
    }

    @Override
    @Transactional
    public BookManageVo updateShelfStatus(Long bookId, ShelfStatusUpdateRequest request) {
        Book book = requireBook(bookId);
        book.setShelfStatus(parseShelfStatus(request.getShelfStatus()));
        bookMapper.update(book);
        return toManageVo(book, inventoryMapper.selectByBookId(bookId));
    }

    @Override
    @Transactional
    public void deleteBook(Long bookId) {
        Book book = requireBook(bookId);
        bookMapper.softDeleteById(bookId);

        Inventory inventory = inventoryMapper.selectByBookId(bookId);
        if (inventory != null) {
            inventory.setTotalCopies(0);
            inventory.setAvailableCopies(0);
            inventoryMapper.update(inventory);
        }
    }

    @Override
    public List<BookManageVo> listBooks() {
        return bookMapper.selectAll().stream()
                .map(book -> toManageVo(book, inventoryMapper.selectByBookId(book.getId())))
                .toList();
    }

    private Book requireBook(Long bookId) {
        Book book = bookMapper.selectById(bookId);
        if (book == null) {
            throw new BusinessException(404, "book not found");
        }
        return book;
    }

    private Category requireCategory(Long categoryId) {
        Category category = categoryMapper.selectById(categoryId);
        if (category == null) {
            throw new BusinessException(404, "category not found");
        }
        if (!Boolean.TRUE.equals(category.getEnabled())) {
            throw new BusinessException(400, "category is disabled");
        }
        return category;
    }

    private ShelfStatus parseShelfStatus(String rawStatus) {
        try {
            return ShelfStatus.valueOf(rawStatus.trim().toUpperCase());
        } catch (Exception ignored) {
            throw new BusinessException(400, "invalid shelf status");
        }
    }

    private String normalizeOptional(String value) {
        if (value == null) {
            return null;
        }
        String normalized = value.trim();
        return normalized.isEmpty() ? null : normalized;
    }

    private BookManageVo toManageVo(Book book, Inventory inventory) {
        return BookManageVo.builder()
                .bookId(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .isbn(book.getIsbn())
                .categoryId(book.getCategory() == null ? null : book.getCategory().getId())
                .categoryName(book.getCategory() == null ? null : book.getCategory().getName())
                .publisher(book.getPublisher())
                .description(book.getDescription())
                .totalCopies(inventory == null ? 0 : inventory.getTotalCopies())
                .availableCopies(inventory == null ? 0 : inventory.getAvailableCopies())
                .shelfStatus(book.getShelfStatus() == null ? null : book.getShelfStatus().name())
                .build();
    }
}
