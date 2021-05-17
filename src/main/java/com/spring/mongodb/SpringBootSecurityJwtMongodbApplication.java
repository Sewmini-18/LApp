package com.spring.mongodb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.*;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.spring.mongodb.config.AppProperties;


@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/logFile")
@ComponentScan("com") //to scan packages mentioned
@EnableMongoRepositories("com") //to activate MongoDB repositories
@EnableScheduling
public class SpringBootSecurityJwtMongodbApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringBootSecurityJwtMongodbApplication.class, args);
    }
}