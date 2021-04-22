package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.OperationsType;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.TransactionType;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionRepository;

@RunWith(MockitoJUnitRunner.class)
public class TransactionServiceTest {

	@InjectMocks
	private TransactionService transactionService;

	@Mock
	private AccountRepository accountRepository;

	@Mock
	private TransactionRepository transactionRepository;

	@Test
	public void findAllTransactionsByAccountIdTest() {
		transactionService.findAllTransactionsByAccountId("12345");
		Mockito.verify(transactionRepository, Mockito.times(1)).findAllByBankAccountId("12345");
	}

	@Test
	public void saveTest() {
		Transaction transaction = new Transaction();
		transaction.setId("1L");
		transaction.setMemo("Gift Token");
		transaction.setOperationsType(OperationsType.CHEQUE);
		transaction.setTransactionType(TransactionType.DEBIT);
		transaction.setTransactionAmount(new BigDecimal(2000));

		BankAccount account = new BankAccount() {

			@Override
			public String getBankAccountType() {
				return "CHECKINGS";
			}

			@Override
			public Double getBankAccountMinimumBalance() {
				return 1000.0;
			}

			@Override
			public Double getBankAccountInterestRate() {
				return 2.0;
			}

			@Override
			public String getBankAccountInformation() {
				return "AccountInfo";
			}

			@Override
			public Double getBankAccountFee() {
				return 100.0;
			}
		};

		account.setId("09876");
		account.setAccountBalance(new BigDecimal(100000));

		transaction.setBankAccount(account);

		Mockito.when(accountRepository.findById("09876")).thenReturn(Optional.of(account));

		transactionService.save(transaction, "09876");
		Mockito.verify(transactionRepository, Mockito.times(1)).save(transaction);

	}
}
