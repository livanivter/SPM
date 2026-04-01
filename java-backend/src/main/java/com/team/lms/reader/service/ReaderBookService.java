package com.team.lms.reader.service;

import com.team.lms.reader.dto.ReaderBorrowRequestCreateRequest;
import com.team.lms.reader.vo.ReaderBookVo;
import com.team.lms.reader.vo.ReaderBorrowRequestVo;

import java.util.List;

public interface ReaderBookService {
    List<ReaderBookVo> listVisibleBooks(String keyword);

    ReaderBorrowRequestVo submitBorrowRequest(String authorizationHeader, ReaderBorrowRequestCreateRequest request);
}
