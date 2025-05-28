package com.examly.springbank.controller;

import com.examly.springbank.model.FixedDeposit;
import com.examly.springbank.service.FixedDepositService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fixeddeposit")
public class FixedDepositController {

    @Autowired
    private FixedDepositService fdService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('TELLER')")
    public ResponseEntity<FixedDeposit> createFixedDeposit(@RequestBody FixedDeposit fd, @RequestHeader("Authorization") String token) {
        try {
            Long accountId = extractAccountIdFromToken(token);
            FixedDeposit createdFD = fdService.createFixedDeposit(fd, accountId);
            return new ResponseEntity<>(createdFD, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating fixed deposit: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/account/{accountId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('TELLER')")
    public ResponseEntity<List<FixedDeposit>> getFixedDepositsByAccountId(@PathVariable Long accountId, @RequestHeader("Authorization") String token) {
        try {
            List<FixedDeposit> fds = fdService.getFixedDepositsByAccountId(accountId);
            return fds.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(fds, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching fixed deposits: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Long extractAccountIdFromToken(String token) {
        return 1L; // Placeholder; implement JWT parsing
    }
}