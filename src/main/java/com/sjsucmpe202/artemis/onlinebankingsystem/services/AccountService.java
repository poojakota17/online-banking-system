package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.*;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.CheckingsAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.SavingsAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private AccountRepository accountRepository;
    private CustomerRepository customerRepository;

    public AccountService(AccountRepository accountRepository, CustomerRepository customerRepository) {
        this.accountRepository = accountRepository;
        this.customerRepository = customerRepository;
    }

    public Iterable<BankAccount> findAllAccounts() {
        return accountRepository.findAll();
    }

    public BankAccount startAccount(String customerId, AccountDTO account){
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
            BankAccount bankAccountInstance = bankAccount;

            return customerRepository.findById(customerId).map(customer -> {
                bankAccountInstance.setCustomer(customer);
                return accountRepository.save(bankAccountInstance);
            }).orElseThrow(() -> new Exception("Customer with id: " + customerId + " not found"));

        }catch(Exception e){
            System.out.println("Error"+e);
        }
        return null;
    }

    public Iterable<BankAccount> getAccountsByCustomerId(String customerId){
        return accountRepository.findByCustomerId(customerId);
    }

    public void deleteAccount(String customerId, Long accountId) {
        try{
            BankAccount account = accountRepository.findByIdAndCustomerId(accountId,customerId);
            if(account == null){
                throw new Exception("Account Id:"+accountId+" doesn't exists");
            }
            accountRepository.delete(account);
        }catch(Exception e){
            System.out.println(e);
        }
    }
}

