package com.sjsucmpe202.artemis.onlinebankingsystem.entities;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;

import com.sjsucmpe202.artemis.onlinebankingsystem.model.OperationsType;
import com.sjsucmpe202.artemis.onlinebankingsystem.model.TransactionType;

import lombok.Data;

@Entity
@Data
public class Transaction {
	
	@Id
	String id;
	//onetomany for accounts
	String memo;
	BigDecimal runningBalance;
	OperationsType operationsType;
	TransactionType transactionType;
	BigDecimal transactionAmount;
	@CreatedDate
	Date transactionDateTime;
}
