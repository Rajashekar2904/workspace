package com.examly.springbank.controller;

import com.examly.springbank.model.Transaction;
import com.examly.springbank.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('TELLER')")
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction, @RequestHeader("Authorization") String token) {
        try {
            Long accountId = extractAccountIdFromToken(token);
            Transaction createdTransaction = transactionService.createTransaction(transaction, accountId);
            return new ResponseEntity<>(createdTransaction, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error creating transaction: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/account/{accountId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('TELLER')")
    public ResponseEntity<List<Transaction>> getTransactionsByAccountId(@PathVariable Long accountId, @RequestHeader("Authorization") String token) {
        try {
            List<Transaction> transactions = transactionService.getTransactionsByAccountId(accountId);
            return transactions.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error fetching transactions: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/teller/approve/{transactionId}")
    @PreAuthorize("hasRole('TELLER')")
    public ResponseEntity<Transaction> approveTransaction(@PathVariable Long transactionId, @RequestHeader("Authorization") String token) {
        try {
            Transaction approvedTransaction = transactionService.approveTransaction(transactionId);
            return new ResponseEntity<>(approvedTransaction, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error approving transaction: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/teller/reject/{transactionId}")
    @PreAuthorize("hasRole('TELLER')")
    public ResponseEntity<Transaction> rejectTransaction(@PathVariable Long transactionId, @RequestHeader("Authorization") String token) {
        try {
            Transaction rejectedTransaction = transactionService.rejectTransaction(transactionId);
            return new ResponseEntity<>(rejectedTransaction, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error rejecting transaction: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Long extractAccountIdFromToken(String token) {
        return 1L; // Placeholder; implement JWT parsing
    }
}