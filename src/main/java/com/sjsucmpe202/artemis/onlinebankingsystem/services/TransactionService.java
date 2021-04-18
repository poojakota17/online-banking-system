package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.model.TransferBalanceRequest;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionRepository;

@Service
public class TransactionService {

	TransactionRepository transactionRepository;

	@Autowired
	public TransactionService(TransactionRepository transactionRepository) {
		this.transactionRepository = transactionRepository;
	}

	public Transaction sendMoney(TransferBalanceRequest transferBalanceRequest, Transaction transaction) {
		
		String fromAccountNumber = transferBalanceRequest.getFromAccountNumber();
        String toAccountNumber = transferBalanceRequest.getToAccountNumber();
        BigDecimal amount = transferBalanceRequest.getAmount();
        
        transaction.setId(UUID.randomUUID().toString());
        transaction.setAccountNumber(fromAccountNumber);
        transaction.setTransactionAmount(amount);
        transaction.setTransactionDateTime(new Timestamp(System.currentTimeMillis()));
        transaction = transactionRepository.save(transaction);
        return transaction;
	}

}
