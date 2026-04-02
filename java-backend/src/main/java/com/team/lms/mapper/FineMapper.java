package com.team.lms.mapper;

import com.team.lms.entity.Fine;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FineMapper {
    Fine selectById(Long id);
    List<Fine> selectAll();
    List<Fine> selectUnpaid();
    int insert(Fine fine);
    int update(Fine fine);
}
