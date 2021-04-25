package com.sjsucmpe202.artemis.onlinebankingsystem.repositories;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequest;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefundRequestRepository extends CrudRepository<RefundRequest,String> {
    Iterable<RefundRequest> findByCustomerId(String id);
    Iterable<RefundRequest> findRefundRequestByStatusEquals(StatusType Status);
}

