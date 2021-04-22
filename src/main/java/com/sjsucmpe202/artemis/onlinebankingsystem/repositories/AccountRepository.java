package com.sjsucmpe202.artemis.onlinebankingsystem.repositories;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends CrudRepository<BankAccount, String> {
    Iterable<BankAccount> findByCustomerId(String customerId);
    BankAccount findByIdAndCustomerId (String id, String customerId);
    BankAccount findByAccountNumber(Long AccountNumber);
}
