package com.examly.springbank.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    private Long accountId;

    private BigDecimal amount;

    private String type; // CREDIT, DEBIT, TRANSFER

    private LocalDateTime transactionDate;

    private String status; // PENDING, COMPLETED, CANCELLED

    private String description;

    // Constructors, getters, setters

    public Transaction() {}

    public Transaction(Long accountId, BigDecimal amount, String type, LocalDateTime transactionDate, String status, String description) {
        this.accountId = accountId;
        this.amount = amount;
        this.type = type;
        this.transactionDate = transactionDate;
        this.status = status;
        this.description = description;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getTransactionDate() {
        return transactionDate;
    }

    public void setTransactionDate(LocalDateTime transactionDate) {
        this.transactionDate = transactionDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionId=" + transactionId +
                ", accountId=" + accountId +
                ", amount=" + amount +
                ", type='" + type + '\'' +
                ", transactionDate=" + transactionDate +
                ", status='" + status + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
