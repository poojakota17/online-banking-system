package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.Account;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.CheckingsAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.SavingsAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public BankAccount startAccount(Account account){
        BankAccount bankAccount = null;
        try{
            if (account.getAccountType().equals("C")){
                bankAccount = new CheckingsAccount();
            } else if (account.getAccountType().equals("S")) {
                bankAccount = new SavingsAccount();
            } else {
                System.out.println("Invalid type");
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
