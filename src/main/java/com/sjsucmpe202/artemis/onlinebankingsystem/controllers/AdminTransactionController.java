package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequest;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.RefundService;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/refundrequest")
public class AdminTransactionController {

    @Autowired
    private RefundService refundService;
    private TransactionService transactionService;


   public AdminTransactionController(RefundService refundService, TransactionService transactionService){
       this.refundService=refundService;
       this.transactionService=transactionService;

   }

   @GetMapping
    public Iterable<RefundRequest> getOpenRefundRequestsLists(@RequestParam StatusType status){
        return refundService.getRefundRequestsByStatus(status);
    }


    @PostMapping("/{customerId}")
    public RefundRequest addRefundRequests(@RequestBody RefundRequest refundRequest, @PathVariable String customerId){
      return refundService.save(refundRequest,customerId);
    }

    @GetMapping("/customerid")
    public Iterable<RefundRequest> getRefundRequestsByCustomerId(@RequestParam String id){
       return refundService.getRefundRequestById(id);
    }

//    @PutMapping("/requestid")
//    public RefundRequests updateRefundStatus(@RequestParam String requestId)
//    { return refundService.updateRefundRequest(requestId);
//    }

    @PostMapping("/toandfromrefundprocess")
    public void toAndFromRefundProcessTransaction(@RequestBody RefundRequest refundRequest, @RequestParam String accountNo){
        transactionService.toAndFromTransactionByAdmin(refundRequest, accountNo);
    }
}
