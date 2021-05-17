package com.spring.mongodb.util;

import com.spring.mongodb.models.LogRecord;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;


@Component
public class LogFileCreator {

    public File createFile(String fileName, List<LogRecord> records) throws IOException {
        File file = new File(String.format("%s.csv", fileName));
        if (file.createNewFile()) {
             try (FileWriter fileWriter = new FileWriter(file);
                 CSVPrinter csvPrinter = new CSVPrinter(fileWriter, CSVFormat.EXCEL.withHeader(
                         "_id",
                         "time",
                         "source",
                         "destination",
                         "protocol",
                         "length"
                 ))) {
                for (LogRecord record : records) {
                    csvPrinter.printRecord(
                            record.get_id(),
                            record.getTime(),
                            record.getSource(),
                            record.getDestination(),
                            record.getProtocol(),
                            record.getLength()
                    );
                }
            }
        }
        return file;
    }
}
