package com.bezkoder.spring.jwt.mongodb;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.File;
import java.util.List;

@SpringBootApplication
public class SpringBootSecurityJwtMongodbApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityJwtMongodbApplication.class, args);
	}

	//comment from janitha for test

	@Bean
	public ApplicationRunner runner(FTPConfiguration.Gate gate, FTPConfiguration.GateFile gateFile) {
		return args -> {
			List list = gate.list(".");
			System.out.println("Result:" + list);
			List<File> files = gateFile.mget(".");
			for (File file : files) {
				System.out.println(file.getAbsolutePath());
			}
		};
	}
}
