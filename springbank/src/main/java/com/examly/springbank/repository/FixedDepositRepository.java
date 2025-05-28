package com.examly.springbank.repository;

import com.examly.springbank.model.FixedDeposit;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FixedDepositRepository extends JpaRepository<FixedDeposit, Long> {
    List<FixedDeposit> findByAccountId(Long accountId);
}