package com.team.lms.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.team.lms.mapper")
public class MyBatisConfig {
}
