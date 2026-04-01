package com.team.lms.common.api;

public abstract class BaseController {

    protected <T> ApiResponse<T> success(T data) {
        return ApiResponse.success(data);
    }
}
