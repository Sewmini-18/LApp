package com.spring.mongodb.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;


@Component
public class FirebaseStorageConfig {

    @Value("${app.firebase-config}")
    private String firebaseConfig;

    @Bean
    private FirebaseApp initializeFirebase() {
        try {
            FirebaseOptions options = new FirebaseOptions.
                    Builder()
                    .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(firebaseConfig).getInputStream())).build();

            FirebaseApp firebaseApp;
            if (FirebaseApp.getApps().isEmpty()) {
                firebaseApp = FirebaseApp.initializeApp(options);
            } else {
                firebaseApp = FirebaseApp.getInstance();
            }
            return firebaseApp;
        } catch (IOException e) {
            System.out.println("Create FirebaseApp Error" + e.getMessage());
        }
        return null;
    }

    @Bean
    private StorageClient firebaseStorage(@Autowired FirebaseApp firebaseApp){
        return StorageClient.getInstance(firebaseApp);
    }
}
