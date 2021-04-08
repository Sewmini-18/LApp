package com.bezkoder.spring.jwt.mongodb;

import com.bezkoder.spring.jwt.mongodb.LogImport.FTPConfiguration;
import com.bezkoder.spring.jwt.mongodb.models.LogFile;
import com.bezkoder.spring.jwt.mongodb.models.LogRecordCollection;
import com.bezkoder.spring.jwt.mongodb.repository.LogFileRepository;
import com.bezkoder.spring.jwt.mongodb.repository.LogRecordRepository;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import io.pkts.Pcap;
import io.pkts.packet.TCPPacket;
import io.pkts.packet.UDPPacket;
import io.pkts.protocol.Protocol;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.json.simple.JSONArray;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.json.simple.JSONObject;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@SpringBootApplication
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/logFile")
@ComponentScan("com.bezkoder") //to scan packages mentioned
@EnableMongoRepositories("com.bezkoder") //to activate MongoDB repositories
public class SpringBootSecurityJwtMongodbApplication {

    public SpringBootSecurityJwtMongodbApplication(LogFileRepository logfileRepo, LogRecordRepository logrecordRepo) {
        this.logfileRepo = logfileRepo;
        this.logrecordRepo = logrecordRepo;
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringBootSecurityJwtMongodbApplication.class, args);
    }

    @Bean
    public ApplicationRunner runner(FTPConfiguration.GateFile gateFile) {
        return args -> {
            List<File> files = gateFile.mget(".");
            for (File file : files) {
                JSONArray arr = new JSONArray();
                System.out.println("Result:" + file.getAbsolutePath());
                run(file, arr);
            }
        };
    }

    void run(File file, JSONArray arr) throws IOException {
        SimpleDateFormat formatter = new SimpleDateFormat("hh:mm:ss");
        Pcap pcap = Pcap.openStream(file);

        String fileName = file.getName();
        pcap.loop(
                packet -> {
                    JSONObject obj = new JSONObject();
                    /*String Time = null;
                    String Source = null;
                    String Destination = null;
                    String dataProtocol = null;
                    Long Length = null;*/

                    if (packet.hasProtocol(Protocol.TCP)) {
                        TCPPacket packet1 = (TCPPacket) packet.getPacket(Protocol.TCP);
                        String Time = formatter.format(new Date(packet1.getArrivalTime() / 1000));
                        String Source = packet1.getSourceIP();
                        String Destination = packet1.getDestinationIP();
                        String dataProtocol = packet1.getProtocol().toString();
                        Long Length = packet1.getTotalLength();

                        obj.put("time", Time);
                        obj.put("source", Source);
                        obj.put("destination", Destination);
                        obj.put("protocol", dataProtocol);
                        obj.put("length", Length);

                    } else if (packet.hasProtocol(Protocol.UDP)) {
                        UDPPacket packet1 = (UDPPacket) packet.getPacket(Protocol.UDP);
                        String Time = formatter.format(new Date(packet1.getArrivalTime() / 1000));
                        String Source = packet1.getSourceIP();
                        String Destination = packet1.getDestinationIP();
                        String dataProtocol = packet1.getProtocol().toString();
                        Long Length = packet1.getTotalLength();

                        obj.put("time", Time);
                        obj.put("source", Source);
                        obj.put("destination", Destination);
                        obj.put("protocol", dataProtocol);
                        obj.put("length", Length);

                    } else {
                        System.out.println("Not found protocol. | " + packet.getProtocol());
                    }
                    arr.add(obj);
                    return packet.getNextPacket() != null;
                }
        );
        System.out.println(arr);
        System.out.println(fileName);
        Calendar calendar = Calendar.getInstance();
        String now = String.valueOf(calendar.getTime());

        ObjectId logId = new ObjectId();
        LogFile data =logfileRepo.save(new LogFile(String.valueOf(logId), fileName, now));
        List<Document> documents = (List<Document>) arr.stream()
                .map(jsonStr -> Document.parse(String.valueOf(jsonStr)))
                .collect(Collectors.toList());
        MongoClient mongo = new MongoClient(new
                MongoClientURI("mongodb+srv://rusiru:rusiru@cluster0.xemlu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"));
        MongoDatabase database = mongo.getDatabase("LApp");
        database.createCollection(String.valueOf(logId));
        database.getCollection(String.valueOf(logId)).insertMany(documents);
    }

    private final LogFileRepository logfileRepo;
    private final LogRecordRepository logrecordRepo;
}