package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.Utils.TransactionUtil;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.mappers.TransactionMapper;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionTemplateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class TransactionTemplateService {

    private TransactionTemplateRepository transactionTemplateRepository;
    private TransactionUtil transactionUtil;
    private AccountRepository accountRepository;
    private TransactionMapper transactionMapper;
    private TransactionService transactionService;

    public TransactionTemplateService(TransactionTemplateRepository transactionTemplateRepository, TransactionUtil transactionUtil, AccountRepository accountRepository, TransactionMapper transactionMapper, TransactionService transactionService) {
        this.transactionTemplateRepository = transactionTemplateRepository;
        this.transactionUtil = transactionUtil;
        this.accountRepository = accountRepository;
        this.transactionMapper = transactionMapper;
        this.transactionService = transactionService;
    }

    public TransactionTemplate save(TransactionTemplate transactionTemplate, String fromAccountId, String toAccountNumber){
        transactionTemplate.setTxn_template_id(UUID.randomUUID().toString());
        BankAccount fromAccount = accountRepository.findById(fromAccountId).get();
        BankAccount toAccount = accountRepository.findByAccountNumber(toAccountNumber);
        transactionTemplate.setFromBankAccount(fromAccount);
        transactionTemplate.setToBankAccount(toAccount);
        if(transactionTemplate.getStartDate().equals(LocalDate.now())){
            Transaction fromTxn = transactionMapper.toTransactionDTOForFromAccount(transactionTemplate);
            Transaction toTxn = transactionMapper.toTransactionDTOForToAccount(transactionTemplate);
            transactionService.save(fromTxn, fromAccount.getId());
            transactionService.save(toTxn, toAccount.getId());
        }
        transactionTemplate.setNextTriggerDate(transactionUtil.calculateNextTriggerDate(transactionTemplate));
        return transactionTemplateRepository.save(transactionTemplate);
    }
}
