package com.examly.springbank.service;

import com.examly.springbank.model.Account;
import com.examly.springbank.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public Account createAccount(Account account, Long userId) {
        account.setUserId(userId);
        account.setDateCreated(LocalDate.now());
        account.setStatus("Active");
        return accountRepository.save(account);
    }

    @Override
    public List<Account> getAccountsByUserId(Long userId) {
        return accountRepository.findByUserId(userId);
    }
}