package com.sjsucmpe202.artemis.onlinebankingsystem.repositories;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.ExternalTransactionTemplate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExternalTransactionTemplateRepository extends CrudRepository<ExternalTransactionTemplate, String> {
}
