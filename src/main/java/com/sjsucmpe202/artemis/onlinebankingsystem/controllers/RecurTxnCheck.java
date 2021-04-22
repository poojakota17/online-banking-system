package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.services.RecuTxnCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/recurtxn")
public class RecurTxnCheck {

    @Autowired
    private RecuTxnCheckService recuTxnCheckService;

    @PostMapping
    public void createRecurrTxn(){
        recuTxnCheckService.createRecurringTransaction();
    }
}
