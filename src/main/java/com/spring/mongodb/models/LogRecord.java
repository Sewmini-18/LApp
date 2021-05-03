package com.spring.mongodb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "#{T(com.spring.mongodb.models.LogRecordCollection).getCollectionName()}")
public class LogRecord {
    @Id
    private String _id;
    //private double no;
    private String time;
    private String source;
    private String destination;
    private String protocol;
    private double length;

    //private String info;

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    /*public double getNo() {
        return no;
    }

    public void setNo(double no) {
        this.no = no;
    }*/

    public String getTime() {
        return String.valueOf(time);
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

}
