package com.examly.springbank.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "recurring_deposits")
public class RecurringDeposit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rdId;

    private String username;

    private BigDecimal monthlyAmount;

    private double interestRate;

    private int tenureMonths;

    private LocalDate startDate;

    private String status; // ACTIVE, CLOSED

    // Constructors, getters, setters

    public RecurringDeposit() {}

    public RecurringDeposit(String username, BigDecimal monthlyAmount, double interestRate, int tenureMonths, LocalDate startDate, String status) {
        this.username = username;
        this.monthlyAmount = monthlyAmount;
        this.interestRate = interestRate;
        this.tenureMonths = tenureMonths;
        this.startDate = startDate;
        this.status = status;
    }

    // getters and setters

    public Long getRdId() {
        return rdId;
    }

    public void setRdId(Long rdId) {
        this.rdId = rdId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public BigDecimal getMonthlyAmount() {
        return monthlyAmount;
    }

    public void setMonthlyAmount(BigDecimal monthlyAmount) {
        this.monthlyAmount = monthlyAmount;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public int getTenureMonths() {
        return tenureMonths;
    }

    public void setTenureMonths(int tenureMonths) {
        this.tenureMonths = tenureMonths;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "RecurringDeposit{" +
                "rdId=" + rdId +
                ", username='" + username + '\'' +
                ", monthlyAmount=" + monthlyAmount +
                ", interestRate=" + interestRate +
                ", tenureMonths=" + tenureMonths +
                ", startDate=" + startDate +
                ", status='" + status + '\'' +
                '}';
    }

    public void setAccountId(Long accountId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setAccountId'");
    }
}
