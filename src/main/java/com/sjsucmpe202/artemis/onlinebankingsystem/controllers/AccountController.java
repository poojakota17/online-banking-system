package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.AccountDTO;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/account")
public class AccountController {

    private AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }
    @GetMapping("/all")
    public Iterable<BankAccount> getAllAccounts(){
        return accountService.findAllAccounts();
    }

    @GetMapping("/{customerId}/accounts")
    public Iterable<BankAccount> getAccountsByCustomerId(@PathVariable String customerId){
            return accountService.getAccountsByCustomerId(customerId);
    }

    @GetMapping("/{accountnumber}")
    public BankAccount getAccountByAccountnumber(@PathVariable String accountnumber){
        return accountService.findAccountByAccountNumber(accountnumber);
    }
    @PostMapping("/new/{customerId}")
    public BankAccount createNewAccount(@PathVariable String customerId, @RequestBody AccountDTO account){
        return accountService.startAccount(customerId , account);
    }

    @DeleteMapping("/remove/{customerId}/{accountId}")
    public void deleteExistingAccount(@PathVariable String customerId, @PathVariable String accountId){
        accountService.deleteAccount(customerId,accountId);
    }
}
