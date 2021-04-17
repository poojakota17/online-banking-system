package com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts;

import javax.persistence.Entity;

@Entity
public class SavingsAccount extends BankAccount{
    @Override
    public Double getBankAccountFee() {
        return 500.0;
    }

    @Override
    public Double getBankAccountInterestRate() {
        return 9.0;
    }

    @Override
    public Double getBankAccountMinimumBalance() {
        return 5000.00;
    }

    @Override
    public String getBankAccountType() {
        return "Savings Account";
    }

    @Override
    public String getBankAccountInformation() {
        return "This is a Savings Account";
    }
}
