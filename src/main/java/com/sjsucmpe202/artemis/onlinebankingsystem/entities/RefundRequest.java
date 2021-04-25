package com.sjsucmpe202.artemis.onlinebankingsystem.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.StatusType;
import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Data
public class RefundRequest {
    @Id
    String requestId;
    BigDecimal amount;
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
