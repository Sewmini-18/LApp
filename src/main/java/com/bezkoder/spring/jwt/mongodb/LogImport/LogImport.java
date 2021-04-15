package com.bezkoder.spring.jwt.mongodb.LogImport;

import com.bezkoder.spring.jwt.mongodb.models.LogFile;
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
import org.json.simple.JSONObject;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class LogImport {
    public LogImport(LogFileRepository logfileRepo, LogRecordRepository logrecordRepo) {
        this.logfileRepo = logfileRepo;
        this.logrecordRepo = logrecordRepo;
    }

    public void run(File file, JSONArray arr) throws IOException {
        SimpleDateFormat formatter = new SimpleDateFormat("hh:mm:ss");
        Pcap pcap = Pcap.openStream(file);

        String fileName = file.getName();
        pcap.loop(
                packet -> {
                    JSONObject obj = new JSONObject();

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

                    }
                    obj.put("fileName", fileName);
                    arr.add(obj);
                    return packet.getNextPacket() != null;
                }
        );
        System.out.println(arr);
        //System.out.println(fileName);
        Calendar calendar = Calendar.getInstance();
        String now = String.valueOf(calendar.getTime());

        ObjectId logId = new ObjectId();
        logfileRepo.save(new LogFile(String.valueOf(logId), fileName, now));
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
