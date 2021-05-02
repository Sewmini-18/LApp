package com.bezkoder.spring.jwt.mongodb.LogsExport;

import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.PrintWriter;

@Configuration
public class FTPConfig {
    @Bean
    public FTPClient client() throws IOException {
        var ftp = new FTPClient();
        ftp.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
        ftp.connect("localhost", 2121);
        System.out.println(ftp.getReplyCode());
        ftp.login("anonymous", "abc12345");

        ftp.setFileType(FTP.BINARY_FILE_TYPE);

        return ftp;
    }


}
