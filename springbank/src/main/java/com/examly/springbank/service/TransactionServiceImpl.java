package com.examly.springbank.service;

import com.examly.springbank.model.Transaction;
import com.examly.springbank.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transaction createTransaction(Transaction transaction, Long accountId) {
        transaction.setAccountId(accountId);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setStatus("Pending");
        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionsByAccountId(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

    @Override
    public Transaction approveTransaction(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        transaction.setStatus("Completed");
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction rejectTransaction(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        transaction.setStatus("Rejected");
        return transactionRepository.save(transaction);
    }
}