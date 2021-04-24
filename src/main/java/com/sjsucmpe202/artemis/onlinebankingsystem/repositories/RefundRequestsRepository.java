package com.sjsucmpe202.artemis.onlinebankingsystem.repositories;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequests;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RefundRequestsRepository extends CrudRepository<RefundRequests,String> {

Iterable<RefundRequests> findByCustomerId(String id);
Iterable<RefundRequests> findRefundRequestsByStatusEquals(StatusType Status);
}

