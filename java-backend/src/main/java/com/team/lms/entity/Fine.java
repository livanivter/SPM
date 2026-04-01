package com.team.lms.entity;

import com.team.lms.common.enums.FineStatus;
import com.team.lms.common.model.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
public class Fine extends BaseEntity {
    private User reader;
    private BorrowRecord borrowRecord;
    private BigDecimal amount;
    private FineStatus status;
}
