package com.spring.mongodb.schedule;


import com.google.firebase.cloud.StorageClient;
import com.spring.mongodb.models.LogFile;
import com.spring.mongodb.models.LogRecord;
import com.spring.mongodb.models.LogRecordCollection;
import com.spring.mongodb.repository.LogFileRepository;
import com.spring.mongodb.repository.LogRecordRepository;
import com.spring.mongodb.util.LogFileCreator;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;


@Component
public class DocumentBackupScheduler {
    private final StorageClient storageClient;
    private final LogFileRepository logFileRepository;
    private final LogFileCreator logFileCreator;
    private final LogRecordRepository logRecordRepository;
    public DocumentBackupScheduler(StorageClient storageClient, LogFileRepository logFileRepository, LogFileCreator logFileCreator, LogRecordRepository logRecordRepository) {
        this.storageClient = storageClient;
        this.logFileRepository = logFileRepository;
        this.logFileCreator = logFileCreator;
        this.logRecordRepository = logRecordRepository;
    }

    @Scheduled(fixedRate = 1209600 * 1000) // 16 days
    public void schedule(){
        List<LogFile> logFiles = logFileRepository.getAllByIsBackupInCloudIsNullOrIsBackupInCloudIsFalse();
        for (LogFile logFile : logFiles) {
            try {
                processToBackup(logFile);
                setEnableTrue(logFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        saveList(logFiles);
    }

    private void saveList(List<LogFile> logFiles) {

        logFileRepository.saveAll(logFiles);
    }

    private void setEnableTrue(LogFile logFile) {
        logFile.setBackupInCloud(true);
    }

    private void processToBackup(LogFile logFile) throws IOException {
        File file = generateFile(logFile);
        FileInputStream fileInputStream = new FileInputStream(file);

        storageClient.bucket("logging-solution-system.appspot.com").create(file.getName(), fileInputStream, "text/csv");
    }

    private File generateFile(LogFile logFile) throws IOException {
        LogRecordCollection logRecordCollection = new LogRecordCollection();
        logRecordCollection.setCollectionName(logFile.get_id());
        List<LogRecord> all = logRecordRepository.findAll();
        File file = logFileCreator.createFile(logFile.getFileName(), all);
        return file;
    }
}
