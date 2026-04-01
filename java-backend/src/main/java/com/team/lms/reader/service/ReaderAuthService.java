package com.team.lms.reader.service;

import com.team.lms.reader.dto.ReaderRegisterRequest;
import com.team.lms.reader.dto.ReaderLoginRequest;
import com.team.lms.reader.vo.ReaderAuthVo;

public interface ReaderAuthService {
    ReaderAuthVo register(ReaderRegisterRequest request);
    ReaderAuthVo login(ReaderLoginRequest request);
}
