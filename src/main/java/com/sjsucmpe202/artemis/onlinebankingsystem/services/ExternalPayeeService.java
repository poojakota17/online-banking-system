package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Customer;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.ExternalPayee;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.CustomerRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.ExternalPayeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ExternalPayeeService {

    private ExternalPayeeRepository externalPayeeRepository;

    private CustomerRepository customerRepository;

    @Autowired
    public ExternalPayeeService(ExternalPayeeRepository externalPayeeRepository, CustomerRepository customerRepository) {
        this.externalPayeeRepository = externalPayeeRepository;
        this.customerRepository = customerRepository;
    }

    public ExternalPayee save(ExternalPayee externalPayee, String customerId){
        Customer customer;
        customer = customerRepository.findById(customerId).get();
        externalPayee.setId(UUID.randomUUID().toString());
        externalPayee.setCustomer(customer);
        return externalPayeeRepository.save(externalPayee);
    }

    public void delete(String externalPayeeId){
        ExternalPayee externalPayee = externalPayeeRepository.findById(externalPayeeId).get();
        externalPayeeRepository.delete(externalPayee);
    }
}
