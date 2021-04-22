package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.TransactionType;
import com.sjsucmpe202.artemis.onlinebankingsystem.mappers.TransactionMapper;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class TransactionService {

	private TransactionRepository transactionRepository;
	private AccountRepository accountRepository;
	private TransactionMapper transactionMapper;

	@Autowired
	public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository, TransactionMapper transactionMapper) {
		this.transactionRepository = transactionRepository;
		this.accountRepository = accountRepository;
		this.transactionMapper = transactionMapper;
	}

	@Transactional
	public Transaction save(Transaction transaction, String accountId) {
		transaction.setId(UUID.randomUUID().toString());
		BankAccount account = accountRepository.findById(accountId).get();
		if(transaction.getTransactionType().equals(TransactionType.CREDIT)){
			BigDecimal amount = account.getAccountBalance().add(transaction.getTransactionAmount());
			account.setAccountBalance(amount);
		} else if(transaction.getTransactionType().equals(TransactionType.DEBIT)){
			BigDecimal txnAmount = transaction.getTransactionAmount().abs();
			BigDecimal amount = account.getAccountBalance().subtract(txnAmount);
			account.setAccountBalance(amount);
		}
		accountRepository.save(account);
		transaction.setBankAccount(account);
		transaction.setRunningBalance(account.getAccountBalance());
		transaction.setTxnDate(LocalDate.now());
		return transactionRepository.save(transaction);
	}

	public Iterable<Transaction> findAllTransactionsByAccountId(String accountId){
		return transactionRepository.findAllByBankAccountId(accountId);
	}

	public void saveOnetimeTransaction(TransactionTemplate transactionTemplate, String fromAccountId, Long toAccountNumber){
		BankAccount fromAccount = accountRepository.findById(fromAccountId).get();
		BankAccount toAccount = accountRepository.findByAccountNumber(toAccountNumber);
		//Create TXN
		Transaction fromTxn = transactionMapper.toTransactionDTOForFromAccount(transactionTemplate);
		Transaction toTxn = transactionMapper.toTransactionDTOForToAccount(transactionTemplate);
		save(fromTxn, fromAccount.getId());
		save(toTxn, toAccount.getId());
	}

}
