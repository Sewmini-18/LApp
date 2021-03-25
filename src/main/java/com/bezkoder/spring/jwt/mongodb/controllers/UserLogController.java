package com.bezkoder.spring.jwt.mongodb.controllers;

import com.bezkoder.spring.jwt.mongodb.models.LogRecord;
import com.bezkoder.spring.jwt.mongodb.models.LogRecordCollection;
import com.bezkoder.spring.jwt.mongodb.models.UserLogRecord;
import com.bezkoder.spring.jwt.mongodb.repository.UserLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/userLog")
public class UserLogController {

    @Autowired
    UserLogRepository userLogRepository;

    @GetMapping("")
    public ResponseEntity<?> getAlluserLogRecords() {
        try{
            List<UserLogRecord> userLogRecords = userLogRepository.findAll();
            return ResponseEntity.ok().body(userLogRecords);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(e.getMessage());
        }
    }
}
