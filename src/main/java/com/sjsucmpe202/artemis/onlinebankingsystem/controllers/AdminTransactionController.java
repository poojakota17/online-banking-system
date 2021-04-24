package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequests;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.OperationsType;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.TransactionType;
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

    @Autowired
    private RefundService refundService;
    public TransactionService transactionService;
    private AccountRepository accountRepository;

   public AdminTransactionController(RefundService refundService, TransactionService transactionService, AccountRepository accountRepository){
       this.refundService=refundService;
       this.transactionService=transactionService;
       this.accountRepository=accountRepository;
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
    {

        return refundService.updateRefundRequest(requestId);
    }

    @PostMapping("/toandfromrefundprocess")
    public void toAndFromRefundProcessTransaction(@RequestParam String accountid, @RequestParam BigDecimal amount){
       Transaction fromTransaction= new Transaction();
       Transaction toTransaction=new Transaction();
        BankAccount toBankAccount= accountRepository.findByAccountNumber(accountid);
       fromTransaction.setTransactionType(TransactionType.DEBIT);
       fromTransaction.setTransactionAmount(amount);
       fromTransaction.setOperationsType(OperationsType.CHEQUE);
        transactionService.save(fromTransaction,"86ffb5cd-a5cf-4f48-8924-55ee34ca0588");
        toTransaction.setTransactionType(TransactionType.CREDIT);
        toTransaction.setTransactionAmount(amount);
        toTransaction.setOperationsType(OperationsType.CHEQUE);
        transactionService.save(toTransaction,toBankAccount.getId());
    }
}
