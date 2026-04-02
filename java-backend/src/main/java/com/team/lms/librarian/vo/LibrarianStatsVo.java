package com.team.lms.librarian.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LibrarianStatsVo {
    private Integer totalBooks;
    private Integer offShelfBooks;
    private Integer pendingBorrowRequests;
    private Integer pendingReturnRequests;
    private Integer pendingReservations;
    private Integer unpaidFines;
    private Integer activeBorrows;
}
