package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.TransactionType;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionRepository;
import javax.transaction.Transactional;

@Service
public class TransactionService {

	private TransactionRepository transactionRepository;

	private AccountRepository accountRepository;

	@Autowired
	public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
		this.transactionRepository = transactionRepository;
		this.accountRepository = accountRepository;
	}

	@Transactional
	public Transaction save(Transaction transaction, String accountId) {
		transaction.setId(UUID.randomUUID().toString());
		BankAccount account = accountRepository.findById(accountId).get();
		if(transaction.getTransactionType().equals(TransactionType.CREDIT)){
			BigDecimal amount = account.getAccountBalance().add(transaction.getTransactionAmount());
			account.setAccountBalance(amount);
		} else if(transaction.getTransactionType().equals(TransactionType.DEBIT)){
			BigDecimal amount = account.getAccountBalance().subtract(transaction.getTransactionAmount());
			account.setAccountBalance(amount);
		}
		accountRepository.save(account);
		transaction.setBankAccount(account);
		transaction.setRunningBalance(account.getAccountBalance());
		return transactionRepository.save(transaction);
	}

	public Iterable<Transaction> findAllTransactionsByAccountId(String accountId){
		return transactionRepository.findAllByBankAccountId(accountId);
	}

}
