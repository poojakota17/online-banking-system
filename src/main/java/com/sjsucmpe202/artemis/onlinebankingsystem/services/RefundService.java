package com.sjsucmpe202.artemis.onlinebankingsystem.services;


import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequests;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.RefundRequestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
    public void addRefundRequests(RefundRequests refundRequests){
        refundRequests.setRequestId(UUID.randomUUID().toString());
        refundRequests.setStatus(StatusType.OPEN.toString());
        refundRequestsRepository.save(refundRequests);
    }
}




