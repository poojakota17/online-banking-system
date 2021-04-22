package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionService;

@RestController
@CrossOrigin
@RequestMapping("/api/transaction")
public class TransactionController {

	private TransactionService transactionService;
	private TransactionTemplateService templateService;

	@Autowired
	public TransactionController(TransactionService transactionService, TransactionTemplateService templateService) {
		this.transactionService = transactionService;
		this.templateService = templateService;
	}

	@PostMapping("/{accountId}")
	public Transaction save(@RequestBody Transaction transaction, @PathVariable String accountId) {
		return transactionService.save(transaction, accountId);
	}

	@GetMapping("/{accountId}")
	public Iterable<Transaction> getAllTransactionsFromAccountId(@PathVariable String accountId){
		return transactionService.findAllTransactionsByAccountId(accountId);
	}

	@PostMapping
	public TransactionTemplate save(@RequestBody TransactionTemplate transactionTemplate, @RequestParam String fromAccountId, @RequestParam Long toAccountNumber){
		return templateService.save(transactionTemplate, fromAccountId, toAccountNumber);
	}
}
