package com.sjsucmpe202.artemis.onlinebankingsystem.repositories;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.ExternalPayee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExternalPayeeRepository extends CrudRepository<ExternalPayee, String> {
    Iterable<ExternalPayee> findByCustomerId(String customerId);
}
