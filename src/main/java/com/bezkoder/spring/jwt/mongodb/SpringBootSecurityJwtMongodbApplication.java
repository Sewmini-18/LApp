package com.bezkoder.spring.jwt.mongodb;

import com.bezkoder.spring.jwt.mongodb.LogImport.FTPConfiguration;
import org.json.simple.JSONArray;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import com.bezkoder.spring.jwt.mongodb.LogImport.LogImport;

import java.io.File;
import java.util.*;

@SpringBootApplication
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/logFile")
@ComponentScan("com.bezkoder") //to scan packages mentioned
@EnableMongoRepositories("com.bezkoder") //to activate MongoDB repositories
@EnableScheduling
public class SpringBootSecurityJwtMongodbApplication {

//    public SpringBootSecurityJwtMongodbApplication(LogImport logimport, FTPConfiguration ftpConfiguration) {
//        this.logimport = logimport;
//        this.ftpConfiguration = ftpConfiguration;
//    }

    public static void main(String[] args) {
        SpringApplication.run(SpringBootSecurityJwtMongodbApplication.class, args);
    }

//    @Bean
//    public ApplicationRunner runner(FTPConfiguration.GateFile gateFile) {
//        return args -> {
//            List<File> files = gateFile.mget(".");
//            for (File file : files) {
//                JSONArray arr = new JSONArray();
//                logimport.run(file, arr);
//            }
//        };
//    }

//
//    final
//    LogImport logimport;
//    final
//    FTPConfiguration ftpConfiguration;
}