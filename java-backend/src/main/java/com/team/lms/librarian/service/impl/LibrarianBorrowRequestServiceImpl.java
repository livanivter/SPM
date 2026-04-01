package com.team.lms.librarian.service.impl;

import com.team.lms.common.enums.BorrowRecordStatus;
import com.team.lms.common.enums.BorrowRequestStatus;
import com.team.lms.common.enums.RoleType;
import com.team.lms.common.support.CurrentUserSupport;
import com.team.lms.entity.BorrowRecord;
import com.team.lms.entity.BorrowRequest;
import com.team.lms.entity.Inventory;
import com.team.lms.entity.User;
import com.team.lms.exception.BusinessException;
import com.team.lms.librarian.dto.BorrowRequestProcessRequest;
import com.team.lms.librarian.service.LibrarianBorrowRequestService;
import com.team.lms.librarian.vo.BorrowRequestManageVo;
import com.team.lms.mapper.BorrowRecordMapper;
import com.team.lms.mapper.BorrowRequestMapper;
import com.team.lms.mapper.InventoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LibrarianBorrowRequestServiceImpl implements LibrarianBorrowRequestService {

    private final BorrowRequestMapper borrowRequestMapper;
    private final BorrowRecordMapper borrowRecordMapper;
    private final InventoryMapper inventoryMapper;
    private final CurrentUserSupport currentUserSupport;

    @Override
    public List<BorrowRequestManageVo> listPendingRequests() {
        return borrowRequestMapper.selectPendingRequests().stream()
                .map(request -> {
                    Inventory inventory = inventoryMapper.selectByBookId(request.getBook().getId());
                    return BorrowRequestManageVo.builder()
                            .requestId(request.getId())
                            .bookId(request.getBook().getId())
                            .bookTitle(request.getBook().getTitle())
                            .readerId(request.getReader().getId())
                            .readerUsername(request.getReader().getUsername())
                            .status(request.getStatus().name())
                            .remainingCopies(inventory == null ? 0 : inventory.getAvailableCopies())
                            .message("pending")
                            .build();
                })
                .toList();
    }

    @Override
    @Transactional
    public BorrowRequestManageVo processRequest(String authorizationHeader, Long requestId, BorrowRequestProcessRequest request) {
        User librarian = currentUserSupport.requireUser(authorizationHeader);
        if (librarian.getRole() != RoleType.LIBRARIAN) {
            throw new BusinessException(403, "current user is not a librarian");
        }

        BorrowRequest borrowRequest = borrowRequestMapper.selectById(requestId);
        if (borrowRequest == null) {
            throw new BusinessException(404, "borrow request not found");
        }
        if (borrowRequest.getStatus() != BorrowRequestStatus.PENDING) {
            throw new BusinessException(400, "borrow request has already been processed");
        }

        Inventory inventory = inventoryMapper.selectByBookId(borrowRequest.getBook().getId());
        if (inventory == null) {
            throw new BusinessException(500, "inventory record not found");
        }

        borrowRequest.setProcessedBy(librarian);
        borrowRequest.setProcessedAt(LocalDateTime.now());

        String message;
        if (request.isApprove()) {
            if (inventory.getAvailableCopies() <= 0) {
                throw new BusinessException(400, "no available copies left");
            }
            inventory.setAvailableCopies(inventory.getAvailableCopies() - 1);
            inventoryMapper.update(inventory);

            BorrowRecord borrowRecord = new BorrowRecord();
            borrowRecord.setReader(borrowRequest.getReader());
            borrowRecord.setBook(borrowRequest.getBook());
            borrowRecord.setBorrowRequest(borrowRequest);
            borrowRecord.setStatus(BorrowRecordStatus.BORROWED);
            borrowRecord.setBorrowDate(LocalDate.now());
            borrowRecord.setDueDate(LocalDate.now().plusDays(30));
            borrowRecordMapper.insert(borrowRecord);

            borrowRequest.setStatus(BorrowRequestStatus.APPROVED);
            borrowRequest.setRejectReason(null);
            message = "borrow request approved and inventory updated";
        } else {
            borrowRequest.setStatus(BorrowRequestStatus.REJECTED);
            borrowRequest.setRejectReason(request.getRejectReason() == null || request.getRejectReason().isBlank()
                    ? "rejected by librarian"
                    : request.getRejectReason().trim());
            message = borrowRequest.getRejectReason();
        }

        borrowRequestMapper.update(borrowRequest);
        Inventory latestInventory = inventoryMapper.selectByBookId(borrowRequest.getBook().getId());

        return BorrowRequestManageVo.builder()
                .requestId(borrowRequest.getId())
                .bookId(borrowRequest.getBook().getId())
                .bookTitle(borrowRequest.getBook().getTitle())
                .readerId(borrowRequest.getReader().getId())
                .readerUsername(borrowRequest.getReader().getUsername())
                .status(borrowRequest.getStatus().name())
                .remainingCopies(latestInventory == null ? 0 : latestInventory.getAvailableCopies())
                .message(message)
                .build();
    }
}
