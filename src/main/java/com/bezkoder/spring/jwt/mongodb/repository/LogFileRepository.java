package com.bezkoder.spring.jwt.mongodb.repository;

import com.bezkoder.spring.jwt.mongodb.models.LogFile;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface LogFileRepository extends MongoRepository<LogFile, String> {

}
