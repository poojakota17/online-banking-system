package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.AccountDTO;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.SavingsAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.CustomerRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Random;
import java.util.UUID;

@RunWith(MockitoJUnitRunner.class)
public class AccountServiceTest {

    @InjectMocks
    private AccountService accountService;

    @Mock
    private AccountRepository accountRepository;
    @Mock
    private CustomerRepository customerRepository;

    @Test
    public void findAllAccountsTest(){
        accountService.findAllAccounts();
        Mockito.verify(accountRepository, Mockito.times(1)).findAll();
    }

    @Test
    public void getAccountsByCustomerIdTest(){
        accountService.getAccountsByCustomerId("asdw-1234-asdrf-assdfcc");
        Mockito.verify(accountRepository, Mockito.times(1)).findByCustomerId("asdw-1234-asdrf-assdfcc");
    }

    @Test
    public void startAccountTest(){
        AccountDTO account = new AccountDTO();
        account.setAccountType("SAVINGSACCOUNT");
        account.setAccountRoutingNumber(123212431254L);
        accountService.startAccount("aswe-aswert-wertyu-dggh",account);
        Mockito.verify(customerRepository, Mockito.times(1)).findById("aswe-aswert-wertyu-dggh");
    }

    @Test
    public void deleteAccountTest(){
        accountService.deleteAccount("aswe-aswert-wertyu-dggh","ytyr-tyui-etryu");
        Mockito.verify(accountRepository, Mockito.times(1)).findByIdAndCustomerId("ytyr-tyui-etryu","aswe-aswert-wertyu-dggh");
    }

}
