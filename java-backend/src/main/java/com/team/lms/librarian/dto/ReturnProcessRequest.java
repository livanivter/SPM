package com.team.lms.librarian.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ReturnProcessRequest {
    @NotNull(message = "approve is required")
    private Boolean approve;

    @PositiveOrZero(message = "fineAmount must be >= 0")
    private BigDecimal fineAmount;

    private String rejectReason;
}
