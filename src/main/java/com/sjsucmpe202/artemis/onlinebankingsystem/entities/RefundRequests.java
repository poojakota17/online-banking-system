package com.sjsucmpe202.artemis.onlinebankingsystem.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class RefundRequests {


    @Id
    String requestId;
    Integer amount;
    String firstName;
    String lastName;
    String accountNumber;
    String reason;
    StatusType status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    @JsonIgnore
    Customer customer;


}
