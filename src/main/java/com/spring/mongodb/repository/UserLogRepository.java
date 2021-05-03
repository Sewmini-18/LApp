package com.spring.mongodb.repository;

import com.spring.mongodb.models.UserLogRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserLogRepository extends MongoRepository<UserLogRecord, String> {
}
