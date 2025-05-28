package com.examly.springbank.service;

import com.examly.springbank.model.FixedDeposit;
import com.examly.springbank.repository.FixedDepositRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class FixedDepositServiceImpl implements FixedDepositService {

    @Autowired
    private FixedDepositRepository fdRepository;

    @Override
    public FixedDeposit createFixedDeposit(FixedDeposit fd, Long accountId) {
        fd.setAccountId(accountId);
        fd.setStartDate(LocalDate.now());
        fd.setStatus("Active");
        return fdRepository.save(fd);
    }

    @Override
    public List<FixedDeposit> getFixedDepositsByAccountId(Long accountId) {
        return fdRepository.findByAccountId(accountId);
    }
}