package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequest;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.OperationsType;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.TransactionType;
import com.sjsucmpe202.artemis.onlinebankingsystem.mappers.TransactionMapper;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.RefundRequestRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class TransactionService {

	private TransactionRepository transactionRepository;
	private AccountRepository accountRepository;
	private TransactionMapper transactionMapper;
	private RefundRequestRepository refundRequestRepository;

	@Autowired
	public TransactionService(RefundRequestRepository refundRequestRepository, TransactionRepository transactionRepository, AccountRepository accountRepository,
							  TransactionMapper transactionMapper) {
		this.transactionRepository = transactionRepository;
		this.accountRepository = accountRepository;
		this.transactionMapper = transactionMapper;
		this.refundRequestRepository = refundRequestRepository;
	}

	@Transactional
	public Transaction save(Transaction transaction, String accountId) {
		transaction.setId(UUID.randomUUID().toString());
		BankAccount account = accountRepository.findById(accountId).get();
		if (transaction.getTransactionType().equals(TransactionType.CREDIT)) {
			BigDecimal amount = account.getAccountBalance().add(transaction.getTransactionAmount());
			account.setAccountBalance(amount);
		} else if (transaction.getTransactionType().equals(TransactionType.DEBIT)) {
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

	public Iterable<Transaction> findAllTransactionsByAccountId(String accountId) {
		return transactionRepository.findAllByBankAccountId(accountId);
	}

	@Transactional
	public void saveOnetimeTransaction(TransactionTemplate transactionTemplate, String fromAccountId,
			String toAccountNumber) {
		BankAccount fromAccount = accountRepository.findById(fromAccountId).get();
		BankAccount toAccount = accountRepository.findByAccountNumber(toAccountNumber);
		// Create TXN
		Transaction fromTxn = transactionMapper.toTransactionDTOForFromAccount(transactionTemplate);
		Transaction toTxn = transactionMapper.toTransactionDTOForToAccount(transactionTemplate);
		save(fromTxn, fromAccount.getId());
		save(toTxn, toAccount.getId());
	}
	@Transactional
	public void toAndFromTransactionByAdmin(RefundRequest refundRequest, String accountNo){
		RefundRequest refundRequest1 = refundRequestRepository.findById(refundRequest.getRequestId()).get();
		Transaction fromTransaction= new Transaction();
		Transaction toTransaction=new Transaction();
		BankAccount toBankAccount= accountRepository.findByAccountNumber(accountNo);
		fromTransaction.setTransactionType(TransactionType.DEBIT);
		fromTransaction.setTransactionAmount(refundRequest1.getAmount());
		fromTransaction.setOperationsType(OperationsType.CHEQUE);
		fromTransaction.setMemo("Refund");
		toTransaction.setTransactionType(TransactionType.CREDIT);
		toTransaction.setTransactionAmount(refundRequest1.getAmount());
		toTransaction.setOperationsType(OperationsType.CHEQUE);
		toTransaction.setMemo("Refund");
		save(fromTransaction,"86ffb5cd-a5cf-4f48-8924-55ee34ca0588");
		save(toTransaction,toBankAccount.getId());
		refundRequest1.setStatus(StatusType.CLOSE);
		 refundRequestRepository.save(refundRequest1);
	}

	public Iterable<Transaction> findAllTransactionsByDate(LocalDate startDate, LocalDate endDate, String accountId)
			throws Exception {
		if (endDate.isAfter(startDate.plusMonths(18))) {
			throw new Exception("Date Range exceeds 18Months: Please select a Date range of 18Months");
		}
		return transactionRepository.findAllByBankAccountIdAndTxnDateBetweenOrderByTxnDateDesc(accountId, startDate,
				endDate);
	}

}
