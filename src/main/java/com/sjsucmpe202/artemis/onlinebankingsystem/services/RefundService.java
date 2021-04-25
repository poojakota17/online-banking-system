package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Customer;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequest;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.CustomerRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.RefundRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RefundService {

    private RefundRequestRepository refundRequestRepository;
    private CustomerRepository customerRepository;

    @Autowired
    public RefundService(RefundRequestRepository refundRequestRepository, CustomerRepository customerRepository){
        this.customerRepository=customerRepository;
        this.refundRequestRepository = refundRequestRepository;
    }

    public Iterable<RefundRequest> getRefundRequestsByStatus(StatusType status){
        return refundRequestRepository.findRefundRequestByStatusEquals(status);
    }

    public Iterable<RefundRequest> getRefundRequestById(String id){
        return  refundRequestRepository.findByCustomerId(id);
    }

    public RefundRequest save(RefundRequest refundRequest, String customerId){
            refundRequest.setRequestId(UUID.randomUUID().toString());
            refundRequest.setStatus(StatusType.OPEN);
            Customer customer;
            customer= customerRepository.findById(customerId).get();
            refundRequest.setCustomer(customer);
            refundRequest.setFirstName(customer.getFirstName());
            refundRequest.setLastName(customer.getLastName());
            return refundRequestRepository.save(refundRequest);
    }

}




