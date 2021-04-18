package com.sjsucmpe202.artemis.onlinebankingsystem.entities;

import java.math.BigDecimal;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Transaction {
	
	@Id
	String id;
	String accountNumber;
	BigDecimal transactionAmount;
	Timestamp transactionDateTime;
}
