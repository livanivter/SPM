package com.team.lms.librarian.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class InventoryUpdateRequest {
    @NotNull(message = "totalCopies is required")
    @PositiveOrZero(message = "totalCopies must be >= 0")
    private Integer totalCopies;

    @NotNull(message = "availableCopies is required")
    @PositiveOrZero(message = "availableCopies must be >= 0")
    private Integer availableCopies;
}
