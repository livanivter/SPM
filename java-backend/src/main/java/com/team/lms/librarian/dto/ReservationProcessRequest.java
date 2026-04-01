package com.team.lms.librarian.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReservationProcessRequest {
    @NotBlank(message = "action is required")
    private String action;
}
