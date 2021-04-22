package com.sjsucmpe202.artemis.onlinebankingsystem.entities;

import com.sjsucmpe202.artemis.onlinebankingsystem.enums.CustomerType;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
public class Customer {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String phoneNumber;
    private String Address;
    private CustomerType customerType;
    private String SSN;
}
