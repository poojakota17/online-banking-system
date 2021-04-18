package com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts;

import lombok.Data;

import java.util.Date;

@Data
public class AccountDTO {

    public AccountDTO() {
    }

    private Long accountNumber;
    private Date accountOpenDate;
    private Double accountBalance;
    private Long accountRoutingNumber;
    private String accountType;
    private String accountInfo;
    private Double minimumBalance;
    private Double interestRate;
    private Double accountFee;

}
