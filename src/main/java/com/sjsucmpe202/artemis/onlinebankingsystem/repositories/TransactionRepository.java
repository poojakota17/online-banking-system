package com.sjsucmpe202.artemis.onlinebankingsystem.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, String> {
        Iterable<Transaction> findAllByBankAccountId(String accountId);
}
