package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class AccountServiceTest {

    @InjectMocks
    private AccountService accountService;

    @Mock
    private AccountRepository accountRepository;

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

}
