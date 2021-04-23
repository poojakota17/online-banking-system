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

    public Iterable<RefundRequests> getRefundRequestsByStatus(String status){

        return refundRequestsRepository.findRefundRequestsByStatusEquals(status);
    }



    public List<RefundRequests> getRefundRequestbyId(String id){
        List<RefundRequests> requestsList= new ArrayList<>();
         refundRequestsRepository.getrequests(id).forEach(requestsList::add);
        return  requestsList;

    }
    public void addRefundRequests(RefundRequests refundRequests){
        refundRequests.setRequestId(UUID.randomUUID().toString());
        refundRequests.setStatus(StatusType.OPEN.toString());
        refundRequestsRepository.save(refundRequests);
    }

    public void updateRefundRequest(String requestId){
    refundRequestsRepository.setRequestStatusByRequestId(requestId);
    }
}




