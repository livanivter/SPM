package com.team.lms.reader.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReaderBorrowRequestCreateRequest {
    @NotNull(message = "bookId is required")
    private Long bookId;

    private String requestNote;
}
