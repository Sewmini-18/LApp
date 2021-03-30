package com.bezkoder.spring.jwt.mongodb;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import io.pkts.PacketHandler;
import io.pkts.buffer.Buffer;
import io.pkts.packet.Packet;
import io.pkts.packet.TCPPacket;
import io.pkts.packet.UDPPacket;
import io.pkts.protocol.Protocol;
import org.bson.Document;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import io.pkts.Pcap;

import java.io.File;
import java.io.IOException;
import java.util.List;

@SpringBootApplication
public class SpringBootSecurityJwtMongodbApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityJwtMongodbApplication.class, args);
	}

	//comment from janitha for test

	@Bean
	public ApplicationRunner runner(/*FTPConfiguration.Gate gate,*/ FTPConfiguration.GateFile gateFile) {
		return args -> {

			/*List list = gate.list(".");
			System.out.println("Result:" + list);*/
			List<File> files = gateFile.mget(".");
			/*for (File file : files) {
				final Pcap pcap = Pcap.openStream(file);

				pcap.loop(new PacketHandler() {
					@Override
					public boolean nextPacket(Packet packet) throws IOException {

						if (packet.hasProtocol(Protocol.TCP)) {

							TCPPacket tcpPacket = (TCPPacket) packet.getPacket(Protocol.TCP);
							Buffer buffer = tcpPacket.getPayload();
							if (buffer != null) {
								System.out.println("TCP: " + buffer);
							}
						} else if (packet.hasProtocol(Protocol.UDP)) {

							UDPPacket udpPacket = (UDPPacket) packet.getPacket(Protocol.UDP);
							Buffer buffer = udpPacket.getPayload();
							if (buffer != null) {
								System.out.println("UDP: " + buffer);
							}
						}
						return true;
					}
				});
			}*/

		};
	}
	

}
