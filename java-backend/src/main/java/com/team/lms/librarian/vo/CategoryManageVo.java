package com.team.lms.librarian.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryManageVo {
    private Long categoryId;
    private String code;
    private String name;
    private Boolean enabled;
}
