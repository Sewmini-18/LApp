package com.bezkoder.spring.jwt.mongodb.repository;

import com.bezkoder.spring.jwt.mongodb.models.LogRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LogRecordRepository extends MongoRepository<LogRecord, String>{}
