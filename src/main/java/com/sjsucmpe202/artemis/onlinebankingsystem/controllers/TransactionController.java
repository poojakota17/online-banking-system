package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.ExternalTransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.ExternalTransactionTemplateService;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionTemplateService;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionService;

@RestController
@CrossOrigin
@RequestMapping("/api/transaction")
public class TransactionController {

	private TransactionService transactionService;
	private TransactionTemplateService templateService;
	private ExternalTransactionTemplateService externalTransactionTemplateService;

	@Autowired
	public TransactionController(TransactionService transactionService, TransactionTemplateService templateService, ExternalTransactionTemplateService externalTransactionTemplateService) {
		this.transactionService = transactionService;
		this.templateService = templateService;
		this.externalTransactionTemplateService = externalTransactionTemplateService;
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
	public TransactionTemplate save(@RequestBody TransactionTemplate transactionTemplate, @RequestParam String fromAccountId, @RequestParam String toAccountNumber){
		return templateService.save(transactionTemplate, fromAccountId, toAccountNumber);
	}

	@PostMapping("/one_time")
	public void saveOneTimeTransaction(@RequestBody TransactionTemplate transactionTemplate, @RequestParam String fromAccountId, @RequestParam String toAccountNumber){
		transactionService.saveOnetimeTransaction(transactionTemplate, fromAccountId, toAccountNumber);
	}
	
	@GetMapping("/view/{accountId}")
	public Iterable<Transaction> getAllTransactionsFromDate(
			@RequestParam("fromDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
			@RequestParam("toDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate,
			@PathVariable String accountId) throws Exception {
		return transactionService.findAllTransactionsByDate(fromDate,toDate, accountId);
	}

	@PostMapping("/external_transaction")
	public ExternalTransactionTemplate save(@RequestParam String fromAccountId, @RequestParam String toExternalPayeeId, @RequestBody ExternalTransactionTemplate externalTransactionTemplate){
		return externalTransactionTemplateService.save(externalTransactionTemplate, fromAccountId, toExternalPayeeId);
	}

	@PostMapping("/one_time_external")
	public void saveOneTimeExternalTransaction(@RequestBody ExternalTransactionTemplate transactionTemplate, @RequestParam String fromAccountId, @RequestParam String toExternalPayeeId){
		externalTransactionTemplateService.saveOnetimeExternalTransaction(transactionTemplate, fromAccountId, toExternalPayeeId);
	}
}
