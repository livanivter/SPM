package com.team.lms.entity;

import com.team.lms.common.enums.BorrowRequestStatus;
import com.team.lms.common.model.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class BorrowRequest extends BaseEntity {
    private User reader;
    private Book book;
    private BorrowRequestStatus status;
    private String requestNote;
    private String rejectReason;
    private User processedBy;
    private LocalDateTime processedAt;
}
