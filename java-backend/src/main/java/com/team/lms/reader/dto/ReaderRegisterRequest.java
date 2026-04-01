package com.team.lms.reader.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReaderRegisterRequest {
    @NotBlank(message = "username is required")
    private String username;

    @NotBlank(message = "password is required")
    private String password;

    @NotBlank(message = "fullName is required")
    private String fullName;

    @NotBlank(message = "studentNo is required")
    private String studentNo;

    @NotBlank(message = "phone is required")
    private String phone;
}
