package com.sjsucmpe202.artemis.onlinebankingsystem.mappers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.ExternalTransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.OperationsType;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.TransactionType;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    public Transaction toTransactionDTOForFromAccount(TransactionTemplate transactionTemplate){
        Transaction transaction = new Transaction();
        transaction.setBankAccount(transactionTemplate.getFromBankAccount());
        transaction.setMemo(transactionTemplate.getMemo());
        transaction.setTransactionAmount(transactionTemplate.getTxnAmount().negate());
        transaction.setOperationsType(transactionTemplate.getOperationsType());
        transaction.setTransactionType(TransactionType.DEBIT);
        return transaction;
    }

    public Transaction toTransactionDTOForToAccount(TransactionTemplate transactionTemplate){
        Transaction transaction = new Transaction();
        transaction.setBankAccount(transactionTemplate.getToBankAccount());
        transaction.setMemo(transactionTemplate.getMemo());
        transaction.setTransactionAmount(transactionTemplate.getTxnAmount());
        transaction.setOperationsType(transactionTemplate.getOperationsType());
        transaction.setTransactionType(TransactionType.CREDIT);
        return transaction;
    }

    public Transaction toTransactionDTOForFromAccount(ExternalTransactionTemplate transactionTemplate){
        Transaction transaction = new Transaction();
        transaction.setBankAccount(transactionTemplate.getBankAccount());
        transaction.setMemo(transactionTemplate.getMemo());
        transaction.setTransactionAmount(transactionTemplate.getTxnAmount().negate());
        transaction.setOperationsType(transactionTemplate.getOperationsType());
        transaction.setTransactionType(TransactionType.DEBIT);
        return transaction;
    }
}
