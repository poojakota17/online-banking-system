package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.*;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public BankAccount startAccount(AccountDTO account){
        BankAccount bankAccount = null;
        try{
            if (account.getAccountType().toUpperCase().equals(AccountType.CHECKINGSACCOUNT.toString())){
                bankAccount = new CheckingsAccount();
            } else if (account.getAccountType().toUpperCase().equals(AccountType.SAVINGSACCOUNT.toString())) {
                bankAccount = new SavingsAccount();
            } else {
                throw new Exception("Invalid Account Type");
            }

            bankAccount.setAccountFee(bankAccount.getBankAccountFee());
            bankAccount.setMinimumBalance(bankAccount.getBankAccountMinimumBalance());
            bankAccount.setAccountType(bankAccount.getBankAccountType());
            bankAccount.setInterestRate(bankAccount.getBankAccountInterestRate());
            bankAccount.setAccountInfo(bankAccount.getBankAccountInformation());
            bankAccount.setAccountNumber(account.getAccountNumber());
            bankAccount.setAccountBalance(account.getAccountBalance());
            bankAccount.setAccountRoutingNumber(account.getAccountRoutingNumber());

            return accountRepository.save(bankAccount);
        }catch(Exception e){
            System.out.println("Error"+e);
        }
        return null;
    }
}
