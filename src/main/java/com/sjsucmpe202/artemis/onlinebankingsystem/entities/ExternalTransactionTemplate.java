package com.sjsucmpe202.artemis.onlinebankingsystem.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.Frequency;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.OperationsType;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
public class ExternalTransactionTemplate {
    @Id
    private String external_txn_template_id;
    private BigDecimal txnAmount;
    private String memo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private BankAccount bankAccount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "external_payee_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private ExternalPayee externalPayee;
    private LocalDate startDate;
    private LocalDate nextTriggerDate;
    private Frequency frequency;
    private OperationsType operationsType;
}
