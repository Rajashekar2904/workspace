package com.examly.springbank.service;

import com.examly.springbank.model.Transaction;
import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Transaction transaction, Long accountId);
    List<Transaction> getTransactionsByAccountId(Long accountId);
    Transaction approveTransaction(Long transactionId);
    Transaction rejectTransaction(Long transactionId);
}