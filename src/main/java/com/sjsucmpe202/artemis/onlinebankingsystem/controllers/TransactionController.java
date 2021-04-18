package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.model.TransferBalanceRequest;
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

	@PostMapping
	public Transaction sendMoney(@RequestBody TransferBalanceRequest transferBalanceRequest, Transaction transaction) {

		return transactionService.sendMoney(transferBalanceRequest, transaction);
	}

}
