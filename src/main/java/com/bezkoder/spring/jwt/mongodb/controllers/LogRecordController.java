package com.bezkoder.spring.jwt.mongodb.controllers;

import com.bezkoder.spring.jwt.mongodb.models.LogRecord;
import com.bezkoder.spring.jwt.mongodb.repository.LogRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/log")
public class LogRecordController {

    @Autowired
    LogRecordRepository logRecordRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllCustomerRequests() {
        try{
            List<LogRecord> logRecords = logRecordRepository.findAll(PageRequest.of(1, 10, Sort.by(Sort.Direction.ASC, "no"))).getContent();
            return ResponseEntity.ok().body(logRecords);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(e.getMessage());
        }
    }

}
