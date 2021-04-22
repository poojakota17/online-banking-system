package com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class AccountDTO {

    public AccountDTO() {
    }

    private String accountNumber;
    private Date accountOpenDate;
    private BigDecimal accountBalance;
    private String accountRoutingNumber;
    private String accountType;
    private String accountInfo;
    private Double minimumBalance;
    private Double interestRate;
    private Double accountFee;

}
