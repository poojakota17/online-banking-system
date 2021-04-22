package com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Customer;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.Transaction;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSubTypes({
        @JsonSubTypes.Type(CheckingsAccount.class),
        @JsonSubTypes.Type(SavingsAccount.class) }
)
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public abstract class BankAccount {

    public BankAccount() {
    }

    @Id
    private String id;

    @Column(updatable = false,unique = true)
    private String accountNumber;

    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date accountOpenDate;

    private BigDecimal accountBalance;
    private String accountRoutingNumber;
    private String accountType;
    private String accountInfo;
    private Double minimumBalance;
    private Double interestRate;
    private Double accountFee;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Customer customer;

    public abstract Double getBankAccountFee();
    public abstract Double getBankAccountInterestRate();
    public abstract Double getBankAccountMinimumBalance();
    public abstract String getBankAccountType();
    public abstract String getBankAccountInformation();

}
