package com.sjsucmpe202.artemis.onlinebankingsystem.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, String> {
        Iterable<Transaction> findAllByBankAccountId(String accountId);
        
        Iterable<Transaction> findAllByBankAccountIdAndTxnDateBetween(String accountId, LocalDate fromDate,
    			LocalDate toDate, Sort sort);
}
