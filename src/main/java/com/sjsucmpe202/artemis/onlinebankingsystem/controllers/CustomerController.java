package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Customer;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class CustomerController {

    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public Customer save(Customer customer){
        return customerService.save(customer);
    }
}
