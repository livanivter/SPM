package com.team.lms.reader.service.impl;

import com.team.lms.common.enums.BorrowRequestStatus;
import com.team.lms.common.enums.RoleType;
import com.team.lms.common.support.CurrentUserSupport;
import com.team.lms.entity.Book;
import com.team.lms.entity.BorrowRequest;
import com.team.lms.entity.Inventory;
import com.team.lms.entity.User;
import com.team.lms.exception.BusinessException;
import com.team.lms.mapper.BookMapper;
import com.team.lms.mapper.BorrowRequestMapper;
import com.team.lms.mapper.InventoryMapper;
import com.team.lms.reader.dto.ReaderBorrowRequestCreateRequest;
import com.team.lms.reader.service.ReaderBookService;
import com.team.lms.reader.vo.ReaderBookVo;
import com.team.lms.reader.vo.ReaderBorrowRequestVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReaderBookServiceImpl implements ReaderBookService {

    private final BookMapper bookMapper;
    private final InventoryMapper inventoryMapper;
    private final BorrowRequestMapper borrowRequestMapper;
    private final CurrentUserSupport currentUserSupport;

    @Override
    public List<ReaderBookVo> listVisibleBooks(String keyword) {
        List<Book> books = (keyword == null || keyword.isBlank())
                ? bookMapper.selectAllVisible()
                : bookMapper.selectVisibleByKeyword(keyword.trim());

        List<ReaderBookVo> result = new ArrayList<>();
        for (Book book : books) {
            Inventory inventory = inventoryMapper.selectByBookId(book.getId());
            result.add(ReaderBookVo.builder()
                    .bookId(book.getId())
                    .title(book.getTitle())
                    .author(book.getAuthor())
                    .categoryName(book.getCategory() == null ? null : book.getCategory().getName())
                    .availableCopies(inventory == null ? 0 : inventory.getAvailableCopies())
                    .shelfStatus(book.getShelfStatus() == null ? null : book.getShelfStatus().name())
                    .build());
        }
        return result;
    }

    @Override
    public ReaderBorrowRequestVo submitBorrowRequest(String authorizationHeader, ReaderBorrowRequestCreateRequest request) {
        User reader = currentUserSupport.requireUser(authorizationHeader);
        if (reader.getRole() != RoleType.READER) {
            throw new BusinessException(403, "current user is not a reader");
        }

        Book book = bookMapper.selectById(request.getBookId());
        if (book == null) {
            throw new BusinessException(404, "book not found");
        }

        Inventory inventory = inventoryMapper.selectByBookId(book.getId());
        if (inventory == null || inventory.getAvailableCopies() == null || inventory.getAvailableCopies() <= 0) {
            throw new BusinessException(400, "book is currently unavailable for borrowing");
        }

        BorrowRequest borrowRequest = new BorrowRequest();
        borrowRequest.setReader(reader);
        borrowRequest.setBook(book);
        borrowRequest.setStatus(BorrowRequestStatus.PENDING);
        borrowRequest.setRequestNote(request.getRequestNote());
        borrowRequestMapper.insert(borrowRequest);

        return ReaderBorrowRequestVo.builder()
                .requestId(borrowRequest.getId())
                .bookId(book.getId())
                .bookTitle(book.getTitle())
                .status(borrowRequest.getStatus().name())
                .message("borrow request submitted and waiting for librarian approval")
                .build();
    }
}
