package com.spring.mongodb.repository;
import com.spring.mongodb.models.CustomerDetails;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CustomerRequestRepository extends MongoRepository<CustomerDetails,String>{

}


