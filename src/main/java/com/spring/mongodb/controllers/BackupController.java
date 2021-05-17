package com.spring.mongodb.controllers;


import com.spring.mongodb.models.LogFile;
import com.spring.mongodb.models.LogRecord;
import com.spring.mongodb.models.LogRecordCollection;
import com.spring.mongodb.payload.request.BackupRequest;
import com.spring.mongodb.repository.LogFileRepository;
import com.spring.mongodb.repository.LogRecordRepository;
import com.spring.mongodb.util.LogFileCreator;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.validation.Valid;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RequestMapping("/api/auth/file")
@RestController
public class BackupController {
    @Autowired
    private LogRecordRepository logRecordRepository;
    @Autowired
    private LogFileRepository logFileRepository;
    @Autowired
    private LogFileCreator logFileCreator;

    @PostMapping(produces = "application/zip")
    public ResponseEntity<StreamingResponseBody> backupFile(@Valid @RequestBody BackupRequest request) throws IOException {

        List<String> ids = request.getRecordIds();

        ArrayList<File> fileList = new ArrayList<>();
        for (String oneRecordId : ids) {
            var fileOptional = logFileRepository.findById(oneRecordId);
            if (!fileOptional.isPresent()) {
                continue;
            }
            List<LogRecord> records = getLogFiles(oneRecordId);
            File file = logFileCreator.createFile(fileOptional.get().getFileName(), records);

            fileList.add(file);
        }

        return getResource((out) -> {
                    ZipOutputStream zipOutputStream = new ZipOutputStream(out);

                    // package files
                    for (File file : fileList) {
                        //new zip entry and copying inputstream with file to zipOutputStream, after all closing streams
                        zipOutputStream.putNextEntry(new ZipEntry(file.getName()));
                        FileInputStream fileInputStream = new FileInputStream(file);

                        IOUtils.copy(fileInputStream, zipOutputStream);

                        fileInputStream.close();
                        zipOutputStream.closeEntry();
                    }
                    zipOutputStream.close();
                    deleteFiles(fileList);
                },
                UUID.randomUUID().toString() + ".zip");
    }

    private List<LogRecord> getLogFiles(String oneRecordId) {
        LogRecordCollection logRecordCollection = new LogRecordCollection();
        logRecordCollection.setCollectionName(oneRecordId);

        List<LogRecord> logRecords = logRecordRepository.findAll();
        return logRecords;
    }

    private void deleteFiles(ArrayList<File> fileList) {
        for (File file : fileList) {
            file.delete();
        }
    }

    public ResponseEntity<StreamingResponseBody> getResource(StreamingResponseBody resource, String fileName) throws IOException {
        if (resource == null) {
            return ResponseEntity.notFound().build();
        }
        MediaType mediaType = MediaType.parseMediaType("application/zip");
        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }


}
