package com.team.lms.admin.service;

import com.team.lms.admin.dto.AdminCreateUserRequest;
import com.team.lms.admin.vo.AdminUserVo;

import java.util.List;

public interface AdminUserService {
    AdminUserVo createUser(AdminCreateUserRequest request);
    List<AdminUserVo> listUsers();
}
