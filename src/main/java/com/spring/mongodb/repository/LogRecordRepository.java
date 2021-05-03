package com.spring.mongodb.repository;

import com.spring.mongodb.models.LogRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LogRecordRepository extends MongoRepository<LogRecord, String>{}
