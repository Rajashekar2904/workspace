package com.examly.springbank.service;

import com.examly.springbank.model.FixedDeposit;
import java.util.List;

public interface FixedDepositService {
    FixedDeposit createFixedDeposit(FixedDeposit fd, Long accountId);
    List<FixedDeposit> getFixedDepositsByAccountId(Long accountId);
}