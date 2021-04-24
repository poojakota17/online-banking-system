package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Customer;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.CustomerType;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {

    private CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer save(Customer customer){
        if(customer.getId() == null){
            customer.setId(UUID.randomUUID().toString());
        }
        return customerRepository.save(customer);
    }

    public void delete(String customerId){
        Customer customer = customerRepository.findById(customerId).get();
        customerRepository.delete(customer);
    }

    public Customer getCustomerById(String customerId) {
        return customerRepository.findById(customerId).get();
    }

    public Iterable<Customer> getAllCustomerUsers(){
        return customerRepository.findAllByCustomerTypeEquals(CustomerType.CUSTOMER);
    }
}
