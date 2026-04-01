package com.team.lms.reader.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReaderBorrowRequestVo {
    private Long requestId;
    private Long bookId;
    private String bookTitle;
    private String status;
    private String message;
}
