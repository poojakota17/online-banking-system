package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Customer;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Customer save(@RequestBody Customer customer){
        return customerService.save(customer);
    }

    @GetMapping("/{customerId}")
    public Customer getCustomerById(@PathVariable String customerId){
        return customerService.getCustomerById(customerId);
    }

    @DeleteMapping("/{customerId}")
    public void delete(@PathVariable String customerId){
        customerService.delete(customerId);
    }

    @GetMapping
    public Iterable<Customer> getAllCustomer(){
        return customerService.getAllCustomerUsers();
    }
}

