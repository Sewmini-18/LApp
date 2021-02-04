package com.bezkoder.spring.jwt.mongodb.repository;
import com.bezkoder.spring.jwt.mongodb.models.CustomerDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRequestRepository extends MongoRepository<CustomerDetails,String>{

}


