package com.sjsucmpe202.artemis.onlinebankingsystem.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class Customer {
    @Id
    String id;
    String firstName;
    String lastName;
}
