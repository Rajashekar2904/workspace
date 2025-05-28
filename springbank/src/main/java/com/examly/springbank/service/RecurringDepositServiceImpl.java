package com.examly.springbank.service;

import com.examly.springbank.model.RecurringDeposit;
import com.examly.springbank.repository.RecurringDepositRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class RecurringDepositServiceImpl implements RecurringDepositService {

    @Autowired
    private RecurringDepositRepository rdRepository;

    @Override
    public RecurringDeposit createRecurringDeposit(RecurringDeposit rd, Long accountId) {
        rd.setAccountId(accountId);
        rd.setStartDate(LocalDate.now());
        rd.setStatus("Active");
        return rdRepository.save(rd);
    }

    @Override
    public List<RecurringDeposit> getRecurringDepositsByAccountId(Long accountId) {
        return rdRepository.findByAccountId(accountId);
    }
}