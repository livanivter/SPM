package com.team.lms.librarian.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryCreateRequest {
    @NotBlank(message = "code is required")
    private String code;

    @NotBlank(message = "name is required")
    private String name;

    private Boolean enabled;
}
