package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequests;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.RefundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin
@RequestMapping("/api/getrefundrequest")
public class AdminTransactionController {

    @Autowired
    private RefundService refundService;
    private RefundRequests refundRequests;



   @GetMapping
    public Iterable<RefundRequests> getOpenRefundRequestsLists(@RequestParam StatusType status){
        return refundService.getRefundRequestsByStatus(status);
    }


    @PostMapping("/{customerId}")
    public RefundRequests addRefundRequests(@RequestBody RefundRequests refundRequests,@PathVariable String customerId){
      return refundService.addRefundRequests(refundRequests,customerId);
    }
    @GetMapping("/customerid")
    public Iterable<RefundRequests> getRefundRequestsByCustomerId(@RequestParam String id){

       return refundService.getRefundRequestById(id);
    }
    @PutMapping("/requestid")
    public RefundRequests updateRefundStatus(@RequestParam String requestId)
    {

        return refundService.updateRefundRequest(requestId);
    }

}
