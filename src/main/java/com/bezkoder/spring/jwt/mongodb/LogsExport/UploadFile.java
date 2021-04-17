package com.bezkoder.spring.jwt.mongodb.LogsExport;

import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

public class UploadFile {
    @Autowired
    private FTPClient con;

    @PostMapping("/api/auth/uploadfiles")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {

        try {
            boolean result = con.storeFile(file.getOriginalFilename(), file.getInputStream());
            System.out.println(result);

        } catch (Exception e) {
            System.out.println("File store failed");
        }

        return "redirect:/";
    }

}
