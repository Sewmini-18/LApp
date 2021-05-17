package com.spring.mongodb.service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

import org.springframework.stereotype.Service;

@Service
public class TempTokenGenerateService {
    private static final Integer EXPIRE_MINS = 15;
    private LoadingCache<String, Integer> tokenCache;

    public TempTokenGenerateService() {
        tokenCache = CacheBuilder.newBuilder().
                expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES).build(new CacheLoader<String, Integer>() {
            @Override
            public Integer load(String key) throws Exception {
                return 0;
            }
        });
    }

    public int generateToken(String key){
        Random random = new Random();
        int token = 100000 + random.nextInt(900000);
        tokenCache.put(key, token);
        return token;
    }
    public int getToken(String key){
        try {
            return tokenCache.get(key);
        } catch (Exception e) {
            return -1;
        }
    }
    public void clearToken(String key){
        tokenCache.invalidate(key);
    }
}
