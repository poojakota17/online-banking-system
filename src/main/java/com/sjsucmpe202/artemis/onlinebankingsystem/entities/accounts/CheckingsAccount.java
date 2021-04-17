package com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts;

import javax.persistence.Entity;

@Entity
public class CheckingsAccount extends BankAccount{
    public CheckingsAccount() {
    }

    @Override
    public Double getBankAccountFee() {
        return 200.00;
    }

    @Override
    public Double getBankAccountInterestRate() {
        return 8.0;
    }

    @Override
    public Double getBankAccountMinimumBalance() {
        return 1000.00;
    }

    @Override
    public String getBankAccountType() {
        return "Checkings Account";
    }

    @Override
    public String getBankAccountInformation() {
        return "This is a Checkings Account";
    }
}
