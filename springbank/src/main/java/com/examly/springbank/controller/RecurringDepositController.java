package com.examly.springbank.controller;

import com.examly.springbank.model.RecurringDeposit;
import com.examly.springbank.service.RecurringDepositService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recurringdeposit")
public class RecurringDepositController {

    @Autowired
    private RecurringDepositService rdService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('TELLER')")
    public ResponseEntity<RecurringDeposit> createRecurringDeposit(@RequestBody RecurringDeposit rd, @RequestHeader("Authorization") String token) {
        try {
            Long accountId = extractAccountIdFromToken(token);
            RecurringDeposit createdRD = rdService.createRecurringDeposit(rd, accountId);
            return new ResponseEntity<>(createdRD, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating recurring deposit: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/account/{accountId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('TELLER')")
    public ResponseEntity<List<RecurringDeposit>> getRecurringDepositsByAccountId(@PathVariable Long accountId, @RequestHeader("Authorization") String token) {
        try {
            List<RecurringDeposit> rds = rdService.getRecurringDepositsByAccountId(accountId);
            return rds.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(rds, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching recurring deposits: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Long extractAccountIdFromToken(String token) {
        return 1L; // Placeholder; implement JWT parsing
    }
}