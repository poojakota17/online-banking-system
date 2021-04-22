package com.sjsucmpe202.artemis.onlinebankingsystem.controllers;

import com.sjsucmpe202.artemis.onlinebankingsystem.entities.ExternalPayee;
import com.sjsucmpe202.artemis.onlinebankingsystem.entities.accounts.BankAccount;
import com.sjsucmpe202.artemis.onlinebankingsystem.services.ExternalPayeeService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/external_payee")
public class ExternalPayeeController {

    private ExternalPayeeService externalPayeeService;

    public ExternalPayeeController(ExternalPayeeService externalPayeeService) {
        this.externalPayeeService = externalPayeeService;
    }

    @PostMapping("/{customerId}")
    public ExternalPayee save(@PathVariable String customerId, @RequestBody ExternalPayee externalPayee){
        return externalPayeeService.save(externalPayee, customerId);
    }

    @GetMapping("/{customerId}/accounts")
    public Iterable<ExternalPayee> getExternalPayeesByCustomerId(@PathVariable String customerId){
        return externalPayeeService.getExternalPayeesByCustomerId(customerId);
    }

    @DeleteMapping()
    public void delete(String externalPayeeId){
        externalPayeeService.delete(externalPayeeId);
    }
}
