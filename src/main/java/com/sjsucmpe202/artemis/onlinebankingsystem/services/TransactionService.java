package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionRepository;

@Service
public class TransactionService {

	TransactionRepository transactionRepository;

	@Autowired
	public TransactionService(TransactionRepository transactionRepository) {
		this.transactionRepository = transactionRepository;
	}

	public Transaction save(Transaction transaction) {

		transaction.setId(UUID.randomUUID().toString());

		return transactionRepository.save(transaction);
	}

}
