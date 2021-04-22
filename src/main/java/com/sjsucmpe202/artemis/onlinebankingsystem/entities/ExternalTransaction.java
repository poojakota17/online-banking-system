package com.sjsucmpe202.artemis.onlinebankingsystem.entities;

import com.sjsucmpe202.artemis.onlinebankingsystem.enums.Frequency;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.OperationsType;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.TransactionType;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.math.BigDecimal;

@Entity
@Data
public class ExternalTransaction {
    @Id
    private String id;
    String memo;
    BigDecimal runningBalance;
    OperationsType operationsType;
    TransactionType transactionType;
    BigDecimal transactionAmount;
    Frequency frequency;
    @OneToOne
    ExternalPayee externalPayee;
}
