package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.Utils.TransactionUtil;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.mappers.TransactionMapper;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionTemplateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class RecuTxnCheckService {

    private TransactionUtil transactionUtil;
    private TransactionTemplateRepository transactionTemplateRepository;
    private TransactionMapper transactionMapper;
    private TransactionService transactionService;

    public RecuTxnCheckService(TransactionUtil transactionUtil, TransactionTemplateRepository transactionTemplateRepository, TransactionMapper transactionMapper, TransactionService transactionService) {
        this.transactionUtil = transactionUtil;
        this.transactionTemplateRepository = transactionTemplateRepository;
        this.transactionMapper = transactionMapper;
        this.transactionService = transactionService;
    }


    public void createRecurringTransaction() {
        //Get the list of transaction templates for the current date
        Iterable<TransactionTemplate> transactionTemplates = transactionTemplateRepository.findAllByNextTriggerDateEquals(LocalDate.now());

        //Iterate over each template
        for(TransactionTemplate template: transactionTemplates){
            BankAccount fromAccount = template.getFromBankAccount();
            BankAccount toAccount = template.getToBankAccount();

            //Create TXN
            Transaction fromTxn = transactionMapper.toTransactionDTOForFromAccount(template);
            Transaction toTxn = transactionMapper.toTransactionDTOForToAccount(template);
            transactionService.save(fromTxn, fromAccount.getId());
            transactionService.save(toTxn, toAccount.getId());

            // Update Next Trigger Date;
            template.setNextTriggerDate(transactionUtil.calculateNextTriggerDate(template));
            transactionTemplateRepository.save(template);
        }
    }
}
