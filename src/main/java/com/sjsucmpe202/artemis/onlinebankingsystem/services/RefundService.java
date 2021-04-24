package com.sjsucmpe202.artemis.onlinebankingsystem.services;


import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Customer;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequests;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.CustomerRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.RefundRequestsRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RefundService {


    private RefundRequestsRepository refundRequestsRepository;
    private CustomerRepository customerRepository;

    public RefundService(RefundRequestsRepository refundRequestsRepository,CustomerRepository customerRepository){
        this.customerRepository=customerRepository;
        this.refundRequestsRepository=refundRequestsRepository;
    }

    public Iterable<RefundRequests> getRefundRequestsByStatus(StatusType status){
        return refundRequestsRepository.findRefundRequestsByStatusEquals(status);
    }

    public Iterable<RefundRequests> getRefundRequestById(String id){
        return  refundRequestsRepository.findByCustomerId(id);
    }
    public RefundRequests addRefundRequests(RefundRequests refundRequests,String customerId){

            refundRequests.setRequestId(UUID.randomUUID().toString());
            refundRequests.setStatus(StatusType.OPEN);
            Customer customer;
            customer= customerRepository.findById(customerId).get();
            refundRequests.setCustomer(customer);
            refundRequests.setFirstName(customer.getFirstName());
            refundRequests.setLastName(customer.getLastName());
            return refundRequestsRepository.save(refundRequests);
    }

}




