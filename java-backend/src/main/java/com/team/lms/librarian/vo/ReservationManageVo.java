package com.team.lms.librarian.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReservationManageVo {
    private Long reservationId;
    private Long bookId;
    private String bookTitle;
    private Long readerId;
    private String readerUsername;
    private String status;
    private Integer queueNo;
    private String message;
}
