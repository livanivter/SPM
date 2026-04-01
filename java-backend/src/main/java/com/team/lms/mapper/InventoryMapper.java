package com.team.lms.mapper;

import com.team.lms.entity.Inventory;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InventoryMapper {
    Inventory selectByBookId(Long bookId);
    int insert(Inventory inventory);
    int update(Inventory inventory);
}
