package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequests;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin
@RequestMapping("/api/getrefundrequest")
public class AdminTransactionController {

    @Autowired
    private RefundService refundService;
   @GetMapping
    public List<RefundRequests> getRefundRequestsLists(){
        return refundService.getRefundRequestsList();
    }

    @PostMapping
    public void addRequests(@RequestBody RefundRequests refundRequests){
       refundService.addRefundRequests(refundRequests);
    }

}
