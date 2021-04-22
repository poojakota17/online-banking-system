package com.sjsucmpe202.artemis.onlinebankingsystem.repositories;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.TransactionTemplate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TransactionTemplateRepository extends CrudRepository<TransactionTemplate, String> {
    Iterable<TransactionTemplate> findAllByNextTriggerDateEquals(LocalDate date);
}
