package com.team.lms.mapper;

import com.team.lms.entity.BorrowRecord;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BorrowRecordMapper {
    int insert(BorrowRecord borrowRecord);
    List<BorrowRecord> selectByReaderId(Long readerId);
}
