package com.team.lms.entity;

import com.team.lms.common.model.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class OperationLog extends BaseEntity {
    private String moduleName;
    private String actionName;
    private String operatorName;
    private String resultMessage;
}
