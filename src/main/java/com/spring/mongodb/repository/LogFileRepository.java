package com.spring.mongodb.repository;

import com.spring.mongodb.models.LogFile;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface LogFileRepository extends MongoRepository<LogFile, String> {

}