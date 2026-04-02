package com.team.lms.librarian.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class FineStatusUpdateRequest {
    @NotBlank(message = "status is required")
    private String status;
}
