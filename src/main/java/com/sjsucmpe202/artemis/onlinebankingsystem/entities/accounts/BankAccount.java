package com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSubTypes({
        @JsonSubTypes.Type(CheckingsAccount.class),
        @JsonSubTypes.Type(SavingsAccount.class) }
)
@Data
@Entity
public abstract class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false,unique = true)
    private Long accountNumber;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date accountOpenDate;

    private Double accountBalance;
    private Long accountRoutingNumber;
    private String accountType;
    private String accountInfo;
    private Double minimumBalance;
    private Double interestRate;
    private Double accountFee;

    public abstract Double getBankAccountFee();
    public abstract Double getBankAccountInterestRate();
    public abstract Double getBankAccountMinimumBalance();
    public abstract String getBankAccountType();
    public abstract String getBankAccountInformation();

    public BankAccount() {
    }

    @PrePersist
    protected void onCreate(){
        this.accountOpenDate = new Date();
    }
}
