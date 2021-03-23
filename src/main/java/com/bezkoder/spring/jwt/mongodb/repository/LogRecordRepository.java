package com.bezkoder.spring.jwt.mongodb.repository;

import com.bezkoder.spring.jwt.mongodb.models.LogRecord;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface LogRecordRepository extends MongoRepository<LogRecord, String> {

    @Query(value = "{approval: {'$ne': null}}", fields = "{ _id: 1 }")
    Page<LogRecord> getAllLogRecords(Pageable pageable);
}
