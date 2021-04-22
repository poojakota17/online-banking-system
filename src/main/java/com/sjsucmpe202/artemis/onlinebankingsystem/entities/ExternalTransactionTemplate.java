package com.sjsucmpe202.artemis.onlinebankingsystem.entities;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.Frequency;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
public class ExternalTransactionTemplate {
    @Id
    private String external_txn_template_id;
    private BigDecimal txnAmount;
    private String memo;
    @OneToOne
    private BankAccount bankAccount;
    @OneToOne
    private ExternalPayee externalPayee;
    private Date startDate;
    private Date nextTriggerDate;
    private Frequency frequency;
}
