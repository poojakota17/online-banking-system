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
   @GetMapping("/open")
    public List<RefundRequests> getOpenRefundRequestsLists(){
        return refundService.getOpenRefundRequestsList();
    }
    @GetMapping("/closed")
    public List<RefundRequests> getClosedRefundRequestsLists(){
       return refundService.getClosedRefundRequestsList();
    }

    @PostMapping
    public void addRefundRequests(@RequestBody RefundRequests refundRequests){
       refundService.addRefundRequests(refundRequests);
    }
    @GetMapping("/customerid")
    public List<RefundRequests> getRefundRequestsByCustomerId(@RequestParam String id){

       return refundService.getRefundRequestbyId(id);
    }
    @PutMapping("/requestid")
    public void updateRefundStatus(@RequestParam String requestId)
    {
        refundService.updateRefundRequest(requestId);
    }

}
