package com.bezkoder.spring.jwt.mongodb.controllers;

import com.bezkoder.spring.jwt.mongodb.models.LogFile;
import com.bezkoder.spring.jwt.mongodb.repository.LogFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/file")
public class LogFileController {

    @Autowired
    LogFileRepository logFileRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllLogFiles() {
        try{
            List<LogFile> logFiles = logFileRepository.findAll();
            return ResponseEntity.ok().body(logFiles);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(e.getMessage());
        }
    }
}