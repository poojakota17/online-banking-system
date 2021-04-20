package com.sjsucmpe202.artemis.onlinebankingsystem.services;


import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequests;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.RefundRequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class RefundService {

    @Autowired
    private RefundRequestsRepository refundRequestsRepository;
    public List<RefundRequests> getRefundRequestsList()

    {
        List<RefundRequests> refundRequestsList = new ArrayList<RefundRequests>();
        refundRequestsRepository.findAll().forEach(refundRequestsList::add);
        return refundRequestsList;
    }
}




