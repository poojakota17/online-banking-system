package com.sjsucmpe202.artemis.onlinebankingsystem.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.Frequency;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.OperationsType;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class TransactionTemplate {
    @Id
    private String txn_template_id;
    private BigDecimal txnAmount;
    private String memo;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "from_account_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private BankAccount fromBankAccount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "to_account_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private BankAccount toBankAccount;
    private LocalDate startDate;
    private LocalDate nextTriggerDate;
    private Frequency frequency;
    private OperationsType operationsType;
}
