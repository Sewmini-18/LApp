package com.bezkoder.spring.jwt.mongodb.schedule;

import com.bezkoder.spring.jwt.mongodb.LogImport.FTPConfiguration;
import com.bezkoder.spring.jwt.mongodb.LogImport.LogImport;
import org.json.simple.JSONArray;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Component
public class FTPScheduler {

    private final LogImport logimport;
    private final FTPConfiguration ftpConfiguration;
    final private FTPConfiguration.GateFile gateFile;

    public FTPScheduler(LogImport logimport, FTPConfiguration ftpConfiguration, FTPConfiguration.GateFile gateFile) {
        this.logimport = logimport;
        this.ftpConfiguration = ftpConfiguration;
        this.gateFile = gateFile;
    }

    @Scheduled(fixedRate = 60000)
    public void execute(){
        List<File> files = gateFile.mget(".");
        for (File file : files) {
            JSONArray arr = new JSONArray();
            try {
                logimport.run(file, arr);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
