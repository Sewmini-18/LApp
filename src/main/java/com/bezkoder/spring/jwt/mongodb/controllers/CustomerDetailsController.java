package com.bezkoder.spring.jwt.mongodb.controllers;

import com.bezkoder.spring.jwt.mongodb.models.CustomerDetails;
import com.bezkoder.spring.jwt.mongodb.payload.request.CustomerRequest;
import com.bezkoder.spring.jwt.mongodb.payload.response.MessageResponse;
import com.bezkoder.spring.jwt.mongodb.repository.CustomerRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;       
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")

public class CustomerDetailsController {


    @Autowired
    CustomerRequestRepository customerRequestRepository;
    
    //add request
    @PostMapping("/customer")
    public ResponseEntity<?> customerRequest(@Valid @RequestBody CustomerRequest customerRequest) {
        CustomerDetails request = new CustomerDetails(customerRequest.getEmail(),
                customerRequest.getC_name(),
                customerRequest.getC_nic(),
                customerRequest.getPhone(),
                customerRequest.getReason(),
                customerRequest.getDate()
                );

        customerRequestRepository.save(request);

        return ResponseEntity.ok(new MessageResponse("Customer request saved successfully!"));
    }

    //get requests
    @GetMapping("/requests")
    public List<CustomerDetails> getAllCustomerRequests() {
        System.out.println("Get all Customer Requests...");

        return customerRequestRepository.findAll();
    }

    //delete requests
    @DeleteMapping("/request/{id}")
    public ResponseEntity<HttpStatus> removeRequest(@PathVariable String id) {
        try {
            customerRequestRepository.deleteById(id);
            System.out.println("Deleted request of : "+ id);
            ResponseEntity.ok(new MessageResponse("request deleted!"));
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
