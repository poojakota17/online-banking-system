package com.sjsucmpe202.artemis.onlinebankingsystem.entities;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class RefundRequests {


    @Id

    String requestId;
    Integer amount;
    String firstName;
    String lastName;
    Long accountNumber;
    String reason;
    String status;
}
