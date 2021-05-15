package com.spring.mongodb.repository;

import com.spring.mongodb.models.ConfirmationToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmationTokenRepository extends MongoRepository<ConfirmationToken, Long> {
    ConfirmationToken findByConfirmationToken(String token);
}
