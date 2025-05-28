package com.examly.springbank.repository;

import com.examly.springbank.model.RecurringDeposit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecurringDepositRepository extends JpaRepository<RecurringDeposit, Long> {
    List<RecurringDeposit> findByAccountId(Long accountId);
}