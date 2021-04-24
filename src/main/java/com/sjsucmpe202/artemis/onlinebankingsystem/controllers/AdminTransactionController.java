package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequests;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.RefundService;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@CrossOrigin
@RequestMapping("/api/getrefundrequest")
public class AdminTransactionController {


    private RefundService refundService;
    public TransactionService transactionService;

    @Autowired
   public AdminTransactionController(RefundService refundService, TransactionService transactionService, AccountRepository accountRepository){
       this.refundService=refundService;
       this.transactionService=transactionService;

   }

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
    { return refundService.updateRefundRequest(requestId);
    }

    @PostMapping("/toandfromrefundprocess")
    public void toAndFromRefundProcessTransaction(@RequestParam String accountNo, @RequestParam BigDecimal amount){
        transactionService.toAndFromTransactionByAdmin(accountNo,amount);
    }
}
