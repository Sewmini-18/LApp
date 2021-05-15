package com.spring.mongodb.repository;

import com.spring.mongodb.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findByUsername(String username);
  Boolean existsByUsername(String username);


  Boolean existsByNic(String nic);

//  @Query("SELECT emailVerified FROM User WHERE email = ?1")
  @Query(value = "{ 'username': ?0 }", fields = "{ 'emailVerified': 1}")
  User findEmailVerifiedByUsername(String username);



}
