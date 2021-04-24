package com.sjsucmpe202.artemis.onlinebankingsystem.scheduled;

import com.sjsucmpe202.artemis.onlinebankingsystem.Utils.TransactionUtil;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.ExternalTransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.mappers.TransactionMapper;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.ExternalTransactionTemplateRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionService;
import lombok.extern.slf4j.Slf4j;
import org.codehaus.plexus.util.ExceptionUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Slf4j
public class RecurringTransactionExternalPayeeService {

    private TransactionMapper transactionMapper;
    private TransactionService transactionService;
    private TransactionUtil transactionUtil;
    private ExternalTransactionTemplateRepository externalTransactionTemplateRepository;

    public RecurringTransactionExternalPayeeService(TransactionMapper transactionMapper, TransactionService transactionService, TransactionUtil transactionUtil, ExternalTransactionTemplateRepository externalTransactionTemplateRepository) {
        this.transactionMapper = transactionMapper;
        this.transactionService = transactionService;
        this.transactionUtil = transactionUtil;
        this.externalTransactionTemplateRepository = externalTransactionTemplateRepository;
    }

    @Scheduled(cron = "0 0 0 * * *", zone = "America/Los_Angeles")
    public void createRecurringTransaction() {
        //Get the list of transaction templates for the current date
        Iterable<ExternalTransactionTemplate> transactionTemplates = externalTransactionTemplateRepository.findAllByNextTriggerDateEquals(LocalDate.now());

        //Iterate over each template
        for(ExternalTransactionTemplate template: transactionTemplates){
            try{
                saveRecurringTransaction(template);
                log.info("Successfully saved the external Payee transaction");
            }
            catch (Exception e){
                log.error("Exception occured while saving external payee transaction. e={}", ExceptionUtils.getStackTrace(e));
            }
        }
    }

    @Transactional
    void saveRecurringTransaction(ExternalTransactionTemplate template) {
        BankAccount fromAccount = template.getBankAccount();

        //Create TXN
        Transaction fromTxn = transactionMapper.toTransactionDTOForFromAccount(template);
        transactionService.save(fromTxn, fromAccount.getId());

        // Update Next Trigger Date;
        template.setNextTriggerDate(transactionUtil.calculateNextTriggerDate(template));
        externalTransactionTemplateRepository.save(template);
    }
}
