package com.examly.springbank.service;

import com.examly.springbank.model.Account;
import java.util.List;

public interface AccountService {
    Account createAccount(Account account, Long userId);
    List<Account> getAccountsByUserId(Long userId);
}