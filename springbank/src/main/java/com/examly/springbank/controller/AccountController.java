package com.examly.springbank.controller;

import com.examly.springbank.model.Account;
import com.examly.springbank.repository.AccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountRepository accountRepository;

    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // GET /api/accounts/user - get accounts of logged in user
    @GetMapping("/user")
    public List<Account> getUserAccounts(Authentication authentication) {
        String username = authentication.getName();
        return accountRepository.findByUsername(username);
    }

    // POST /api/accounts - create account (Manager only)
    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody Account account) {
        // For demo, balance starts at zero
        account.setBalance(BigDecimal.ZERO);
        accountRepository.save(account);
        return ResponseEntity.ok(account);
    }

    // More endpoints (update, delete) as per spec
}
