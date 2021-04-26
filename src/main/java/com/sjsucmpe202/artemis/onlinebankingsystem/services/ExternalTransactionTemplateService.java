package com.sjsucmpe202.artemis.onlinebankingsystem.services;

import com.sjsucmpe202.artemis.onlinebankingsystem.Utils.TransactionUtil;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.ExternalPayee;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.ExternalTransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.mappers.TransactionMapper;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.AccountRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.ExternalPayeeRepository;
import com.sjsucmpe202.artemis.onlinebankingsystem.repositories.ExternalTransactionTemplateRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class ExternalTransactionTemplateService {

    private AccountRepository accountRepository;
    private ExternalPayeeRepository externalPayeeRepository;
    private TransactionMapper transactionMapper;
    private TransactionService transactionService;
    private TransactionUtil transactionUtil;
    private ExternalTransactionTemplateRepository externalTransactionTemplateRepository;

    public ExternalTransactionTemplateService(AccountRepository accountRepository, ExternalPayeeRepository externalPayeeRepository, TransactionMapper transactionMapper, TransactionService transactionService, TransactionUtil transactionUtil, ExternalTransactionTemplateRepository externalTransactionTemplateRepository) {
        this.accountRepository = accountRepository;
        this.externalPayeeRepository = externalPayeeRepository;
        this.transactionMapper = transactionMapper;
        this.transactionService = transactionService;
        this.transactionUtil = transactionUtil;
        this.externalTransactionTemplateRepository = externalTransactionTemplateRepository;
    }

    public ExternalTransactionTemplate save(ExternalTransactionTemplate transactionTemplate, String fromAccountId, String toExternalPayeeId){
        transactionTemplate.setExternal_txn_template_id(UUID.randomUUID().toString());
        BankAccount fromAccount = accountRepository.findById(fromAccountId).get();
        ExternalPayee externalPayee = externalPayeeRepository.findById(toExternalPayeeId).get();
        transactionTemplate.setBankAccount(fromAccount);
        transactionTemplate.setExternalPayee(externalPayee);
        if(transactionTemplate.getStartDate().equals(LocalDate.now())){
            Transaction fromTxn = transactionMapper.toTransactionDTOForFromAccount(transactionTemplate);
            transactionService.save(fromTxn, fromAccount.getId());
        }
        transactionTemplate.setNextTriggerDate(transactionUtil.calculateNextTriggerDate(transactionTemplate));
        return externalTransactionTemplateRepository.save(transactionTemplate);
    }

    @Transactional
    public void saveOnetimeExternalTransaction(ExternalTransactionTemplate transactionTemplate, String fromAccountId,
                                       String toExternalPayeeId) {
        BankAccount fromAccount = accountRepository.findById(fromAccountId).get();
        ExternalPayee toAccount = externalPayeeRepository.findById(toExternalPayeeId).get();
        // Create TXN
        if(toAccount != null) {
            Transaction fromTxn = transactionMapper.toTransactionDTOForFromAccount(transactionTemplate);
            transactionService.save(fromTxn, fromAccount.getId());
        }
    }
}
