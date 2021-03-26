package com.bezkoder.spring.jwt.mongodb.repository;

import com.bezkoder.spring.jwt.mongodb.models.UserLogRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserLogRepository extends MongoRepository<UserLogRecord, String> {
}
