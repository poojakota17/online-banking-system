package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionService;

@RestController
@CrossOrigin
@RequestMapping("/api/transaction")
public class TransactionController {

	private TransactionService transactionService;

	@Autowired
	public TransactionController(TransactionService transactionService) {
		this.transactionService = transactionService;
	}

	@PostMapping("/{accountId}")
	public Transaction save(@RequestBody Transaction transaction, @PathVariable String accountId) {
		return transactionService.save(transaction, accountId);
	}

	@GetMapping("/{accountId}")
	public Iterable<Transaction> getAllTransactionsFromAccountId(@PathVariable String accountId){
		return transactionService.findAllTransactionsByAccountId(accountId);
	}

}
