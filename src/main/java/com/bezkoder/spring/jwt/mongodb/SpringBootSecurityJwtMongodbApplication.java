package com.bezkoder.spring.jwt.mongodb;
import com.bezkoder.spring.jwt.mongodb.LogImport.FTPConfiguration;
import io.pkts.Pcap;
import io.pkts.packet.TCPPacket;
import io.pkts.packet.UDPPacket;
import io.pkts.protocol.Protocol;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@SpringBootApplication

public class SpringBootSecurityJwtMongodbApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootSecurityJwtMongodbApplication.class, args);
	}


	@Bean
	public ApplicationRunner runner(/*FTPConfiguration.Gate gate,*/ FTPConfiguration.GateFile gateFile) {
		return args -> {

			/*List list = gate.list(".");
			System.out.println("Result:" + list);*/
			List<File> files = gateFile.mget(".");
			for (File file : files) {
				System.out.println("Result:" + file.getAbsolutePath());
				run(file);
			}
		};
	}

	void run(File file) throws IOException {
		SimpleDateFormat formatter = new SimpleDateFormat("hh:mm:ss");

		Pcap pcap = Pcap.openStream(file);
		pcap.loop(
				packet -> {
					if (packet.hasProtocol(Protocol.TCP)) {
						TCPPacket packet1 = (TCPPacket) packet.getPacket(Protocol.TCP);
						System.out.printf("%s | %s | %s | %s | %d \n",
								formatter.format(new Date(packet1.getArrivalTime() / 1000)),
								packet1.getSourceIP(),
								packet1.getDestinationIP(),
								packet1.getProtocol().toString(),
								packet1.getTotalLength()
						);
					} else if (packet.hasProtocol(Protocol.UDP)) {
						UDPPacket packet1 = (UDPPacket) packet.getPacket(Protocol.UDP);
						System.out.printf("%s | %s | %s | %s | %d\n",
								formatter.format(new Date(packet1.getArrivalTime() / 1000)),
								packet1.getSourceIP(),
								packet1.getDestinationIP(),
								packet1.getProtocol().toString(),
								packet1.getTotalLength()
						);
					} else {
						System.out.println("Not found protocol. | " + packet.getProtocol());
					}
					return packet.getNextPacket() != null;
				}
		);
	}
}
