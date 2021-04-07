package com.bezkoder.spring.jwt.mongodb.controllers;

import com.bezkoder.spring.jwt.mongodb.models.LogRecord;
import com.bezkoder.spring.jwt.mongodb.models.LogRecordCollection;
import com.bezkoder.spring.jwt.mongodb.repository.LogRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/log")
public class LogRecordController {

    @Autowired
    LogRecordRepository logRecordRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllLogRecordsByLogFileId(@RequestParam("fileId") String fileId) {
        try{
            LogRecordCollection logRecordCollection = new LogRecordCollection();
            logRecordCollection.setCollectionName(fileId);
            // List<LogRecord> logRecords = logRecordRepository.findAll(PageRequest.of(1, 10, Sort.by(Sort.Direction.ASC, "no"))).getContent();
            List<LogRecord> logRecords = logRecordRepository.findAll();
            return ResponseEntity.ok().body(logRecords);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(e.getMessage());
        }
    }

}
