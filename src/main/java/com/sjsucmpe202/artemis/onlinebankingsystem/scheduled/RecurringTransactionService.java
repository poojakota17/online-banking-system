package com.sjsucmpe202.artemis.onlinebankingsystem.scheduled;

import com.sjsucmpe202.artemis.onlinebankingsystem.Utils.TransactionUtil;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.mappers.TransactionMapper;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.TransactionTemplateRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.codehaus.plexus.util.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;


@Service
@Slf4j
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
    public void createRecurringTransaction() {
        //Get the list of transaction templates for the current date
        Iterable<TransactionTemplate> transactionTemplates = transactionTemplateRepository.findAllByNextTriggerDateEquals(LocalDate.now());

        //Iterate over each template
        for(TransactionTemplate template: transactionTemplates){
            try{
                saveRecurringTransaction(template);
                log.info("Successfully saved the transaction");
            }
            catch (Exception e){
                log.error("Exception occured while saving this transaction. e={}", ExceptionUtils.getStackTrace(e));
            }
        }
    }

    @Transactional
    public void saveRecurringTransaction(TransactionTemplate template) {
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
