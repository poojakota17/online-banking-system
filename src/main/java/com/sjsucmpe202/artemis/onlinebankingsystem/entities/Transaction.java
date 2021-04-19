package com.sjsucmpe202.artemis.onlinebankingsystem.entities;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import com.sjsucmpe202.artemis.onlinebankingsystem.enums.OperationsType;
import com.sjsucmpe202.artemis.onlinebankingsystem.enums.TransactionType;

import lombok.Data;

@Entity
@Data
public class Transaction {
	
	@Id
	String id;
	String memo;
	BigDecimal runningBalance;
	OperationsType operationsType;
	TransactionType transactionType;
	BigDecimal transactionAmount;
	@CreatedDate
	Date transactionDateTime;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "account_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JsonIgnore
	private BankAccount bankAccount;
}
