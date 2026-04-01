package com.team.lms.entity;

import com.team.lms.common.enums.ReservationStatus;
import com.team.lms.common.model.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Reservation extends BaseEntity {
    private User reader;
    private Book book;
    private ReservationStatus status;
    private Integer queueNo;
}
