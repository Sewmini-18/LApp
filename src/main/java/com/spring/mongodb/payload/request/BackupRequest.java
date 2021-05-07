package com.spring.mongodb.payload.request;

import javax.validation.constraints.NotEmpty;
import java.util.List;


public class BackupRequest {
    @NotEmpty
    private List<String> recordIds;

    public List<String> getRecordIds() {
        return recordIds;
    }

    public void setRecordIds(List<String> recordIds) {
        this.recordIds = recordIds;
    }
}
