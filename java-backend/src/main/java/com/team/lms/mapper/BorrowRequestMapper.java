package com.team.lms.mapper;

import com.team.lms.entity.BorrowRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BorrowRequestMapper {
    int insert(BorrowRequest borrowRequest);
    BorrowRequest selectById(Long id);
    List<BorrowRequest> selectByReaderId(Long readerId);
    List<BorrowRequest> selectPendingRequests();
    List<BorrowRequest> selectByStatus(@Param("status") String status);
    int update(BorrowRequest borrowRequest);
}
