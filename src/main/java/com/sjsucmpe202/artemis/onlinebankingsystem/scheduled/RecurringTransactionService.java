package com.sjsucmpe202.artemis.onlinebankingsystem.scheduled;

import com.sjsucmpe202.artemis.onlinebankingsystem.Utils.TransactionUtil;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.mappers.TransactionMapper;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionTemplateRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Service
public class RecurringTransactionService {

    private TransactionTemplateRepository transactionTemplateRepository;
    private TransactionMapper transactionMapper;
    private TransactionUtil transactionUtil;
    private TransactionService transactionService;

    @Autowired
    public RecurringTransactionService(TransactionTemplateRepository transactionTemplateRepository, TransactionMapper transactionMapper, TransactionUtil transactionUtil, TransactionService transactionService) {
        this.transactionTemplateRepository = transactionTemplateRepository;
        this.transactionMapper = transactionMapper;
        this.transactionUtil = transactionUtil;
        this.transactionService = transactionService;
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "America/Los_Angeles")
    @Transactional
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
