package com.team.lms.entity;

import com.team.lms.common.enums.RoleType;
import com.team.lms.common.model.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {
    private String username;
    private String password;
    private String fullName;
    private String studentNo;
    private String phone;
    private RoleType role;
    private Boolean enabled;
}
