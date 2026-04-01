package com.team.lms.admin.service.impl;

import com.team.lms.admin.dto.AdminCreateUserRequest;
import com.team.lms.admin.service.AdminUserService;
import com.team.lms.admin.vo.AdminUserVo;
import com.team.lms.common.enums.RoleType;
import com.team.lms.entity.User;
import com.team.lms.exception.BusinessException;
import com.team.lms.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final UserMapper userMapper;

    @Override
    public AdminUserVo createUser(AdminCreateUserRequest request) {
        if (userMapper.selectByUsername(request.getUsername()) != null) {
            throw new BusinessException(400, "username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setFullName(request.getUsername());
        user.setRole(RoleType.READER);
        user.setEnabled(true);
        userMapper.insert(user);

        return AdminUserVo.builder()
                .username(user.getUsername())
                .status("CREATED")
                .build();
    }

    @Override
    public List<AdminUserVo> listUsers() {
        return userMapper.selectAllActive().stream()
                .map(user -> AdminUserVo.builder()
                        .username(user.getUsername())
                        .status(Boolean.TRUE.equals(user.getEnabled()) ? "ENABLED" : "DISABLED")
                        .build())
                .toList();
    }
}
