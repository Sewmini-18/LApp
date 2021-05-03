package com.spring.mongodb.controllers;

import com.spring.mongodb.models.UserLogRecord;
import com.spring.mongodb.repository.UserLogRepository;
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
    public ResponseEntity<?> getAllUserLogRecords() {
        try{
            List<UserLogRecord> userLogRecords = userLogRepository.findAll();
            return ResponseEntity.ok().body(userLogRecords);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(e.getMessage());
        }
    }
}
