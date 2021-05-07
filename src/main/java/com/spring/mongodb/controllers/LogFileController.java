package com.spring.mongodb.controllers;

import com.spring.mongodb.models.LogFile;
import com.spring.mongodb.models.LogRecord;
import com.spring.mongodb.models.LogRecordCollection;
import com.spring.mongodb.payload.request.BackupRequest;
import com.spring.mongodb.payload.request.DeleteFileRequest;
import com.spring.mongodb.repository.LogFileRepository;
import com.spring.mongodb.repository.LogRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/file")
public class LogFileController {

    @Autowired
    LogFileRepository logFileRepository;
    @Autowired    private LogRecordRepository logRecordRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllLogFiles() {
        try{
            List<LogFile> logFiles = logFileRepository.findAll();
            return ResponseEntity.ok().body(logFiles);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(e.getMessage());
        }
    }

    @DeleteMapping
    public void deleteFiles(@Valid @RequestBody DeleteFileRequest request) {
        List<String> recordIds = request.getRecordIds();
        for (String recordId : recordIds) {

            logFileRepository.deleteById(recordId);
            LogRecordCollection collection = new LogRecordCollection();
            collection.setCollectionName(recordId);
            logRecordRepository.deleteAll();
        }
    }
}