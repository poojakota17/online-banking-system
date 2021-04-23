package com.sjsucmpe202.artemis.onlinebankingsystem.repositories;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.RefundRequests;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface RefundRequestsRepository extends CrudRepository<RefundRequests,String> {

@Query(value=" select rr from RefundRequests rr where rr.id=?1")
List<RefundRequests> getrequests(String id);
//String status= StatusType.CLOSE.toString();
@Transactional
@Modifying
@Query(value ="UPDATE  RefundRequests r set r.status= 'CLOSE' where r.requestId =:requestId")
   void setRequestStatusByRequestId(@Param("requestId") String requestId);
@Query(value="Select rr from RefundRequests rr where rr.status='OPEN'")
   List<RefundRequests> getOpenRefundRequests();
@Query(value="Select rr from RefundRequests rr where rr.status='ClOSE'")
   List<RefundRequests> getClosedRefundRequests();
}

