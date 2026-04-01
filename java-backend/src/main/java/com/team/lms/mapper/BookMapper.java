package com.team.lms.mapper;

import com.team.lms.entity.Book;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BookMapper {
    Book selectById(Long id);
    List<Book> selectAllVisible();
    List<Book> selectVisibleByKeyword(@Param("keyword") String keyword);
    List<Book> selectAll();
    Book selectByIsbn(@Param("isbn") String isbn);
    int insert(Book book);
    int update(Book book);
    int softDeleteById(@Param("id") Long id);
}
