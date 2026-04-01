package com.team.lms.common.support;

import com.team.lms.entity.User;
import com.team.lms.exception.BusinessException;
import com.team.lms.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CurrentUserSupport {

    private static final String BEARER_PREFIX = "Bearer ";
    private static final String MOCK_TOKEN_PREFIX = "mock-token-for-";

    private final UserMapper userMapper;

    public User requireUser(String authorizationHeader) {
        String username = extractUsername(authorizationHeader);
        User user = userMapper.selectByUsername(username);
        if (user == null) {
            throw new BusinessException(401, "user not found for current token");
        }
        return user;
    }

    public String extractUsername(String authorizationHeader) {
        if (authorizationHeader == null || authorizationHeader.isBlank()) {
            throw new BusinessException(401, "authorization header is required");
        }
        if (!authorizationHeader.startsWith(BEARER_PREFIX)) {
            throw new BusinessException(401, "authorization header must use Bearer token");
        }
        String token = authorizationHeader.substring(BEARER_PREFIX.length()).trim();
        if (!token.startsWith(MOCK_TOKEN_PREFIX)) {
            throw new BusinessException(401, "unsupported token format");
        }
        return token.substring(MOCK_TOKEN_PREFIX.length());
    }
}
