package com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonSubTypes;

import javax.persistence.*;
import java.util.Date;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSubTypes({
        @JsonSubTypes.Type(CheckingsAccount.class),
        @JsonSubTypes.Type(SavingsAccount.class) }
)
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Date getAccountOpenDate() {
        return accountOpenDate;
    }

    public void setAccountOpenDate(Date accountOpenDate) {
        this.accountOpenDate = accountOpenDate;
    }

    public Double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(Double accountBalance) {
        this.accountBalance = accountBalance;
    }

    public Long getAccountRoutingNumber() {
        return accountRoutingNumber;
    }

    public void setAccountRoutingNumber(Long accountRoutingNumber) {
        this.accountRoutingNumber = accountRoutingNumber;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }

    public String getAccountInfo() {
        return accountInfo;
    }

    public void setAccountInfo(String accountInfo) {
        this.accountInfo = accountInfo;
    }

    public Double getMinimumBalance() {
        return minimumBalance;
    }

    public void setMinimumBalance(Double minimumBalance) {
        this.minimumBalance = minimumBalance;
    }

    public Double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }

    public Double getAccountFee() {
        return accountFee;
    }

    public void setAccountFee(Double accountFee) {
        this.accountFee = accountFee;
    }

    @PrePersist
    protected void onCreate(){
        this.accountOpenDate = new Date();
    }
}
