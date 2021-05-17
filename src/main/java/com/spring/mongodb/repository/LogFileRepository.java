package com.spring.mongodb.repository;

import com.spring.mongodb.models.LogFile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LogFileRepository extends MongoRepository<LogFile, String> {
    List<LogFile> getAllByIsBackupInCloudIsNullOrIsBackupInCloudIsFalse();
}