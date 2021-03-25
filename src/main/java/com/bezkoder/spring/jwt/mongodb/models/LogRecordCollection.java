package com.bezkoder.spring.jwt.mongodb.models;

public class LogRecordCollection {
    private static String collectionName = "undefined";

    public static String getCollectionName(){
        return collectionName;
    }

    public void setCollectionName(String collectionName){
        this.collectionName = collectionName;
    }

}
