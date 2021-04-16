package com.bezkoder.spring.jwt.mongodb.LogImport;

import com.bezkoder.spring.jwt.mongodb.models.LogFile;
import com.bezkoder.spring.jwt.mongodb.repository.LogFileRepository;
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
    public LogImport(LogFileRepository logfileRepo) {
        this.logfileRepo = logfileRepo;
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
                        dataArray(arr, formatter, obj, packet1.getArrivalTime(), packet1.getSourceIP(), packet1.getDestinationIP(), packet1.getProtocol(), packet1.getTotalLength());

                    } else if (packet.hasProtocol(Protocol.UDP)) {
                        UDPPacket packet2 = (UDPPacket) packet.getPacket(Protocol.UDP);
                        dataArray(arr, formatter, obj, packet2.getArrivalTime(), packet2.getSourceIP(), packet2.getDestinationIP(), packet2.getProtocol(), packet2.getTotalLength());
                    }


                    return packet.getNextPacket() != null;
                }
        );
        //System.out.println(arr);
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

    private void dataArray(JSONArray arr, SimpleDateFormat formatter, JSONObject obj, long arrivalTime, String sourceIP, String destinationIP, Protocol protocol, long totalLength) {
        String Time = formatter.format(new Date(arrivalTime / 1000));
        String dataProtocol = protocol.toString();
        Long Length = totalLength;

        obj.put("time", Time);
        obj.put("source", sourceIP);
        obj.put("destination", destinationIP);
        obj.put("protocol", dataProtocol);
        obj.put("length", Length);

        arr.add(obj);
    }

    private final LogFileRepository logfileRepo;
}
