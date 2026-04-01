package com.team.lms.librarian.dto;

import lombok.Data;

@Data
public class BorrowRequestProcessRequest {
    private boolean approve;
    private String rejectReason;
}
