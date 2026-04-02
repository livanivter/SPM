package com.team.lms.librarian.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ShelfStatusUpdateRequest {
    @NotBlank(message = "shelfStatus is required")
    private String shelfStatus;
}
