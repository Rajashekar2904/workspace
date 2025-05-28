package com.examly.springbank.service;

import com.examly.springbank.model.RecurringDeposit;
import java.util.List;

public interface RecurringDepositService {
    RecurringDeposit createRecurringDeposit(RecurringDeposit rd, Long accountId);
    List<RecurringDeposit> getRecurringDepositsByAccountId(Long accountId);
}