package com.examly.springbank.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "fixed_deposits")
public class FixedDeposit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fdId;

    private String username;

    private BigDecimal principalAmount;

    private double interestRate;

    private int tenureMonths;

    private LocalDate startDate;

    private String status; // ACTIVE, CLOSED

    // Constructors, getters, setters

    public FixedDeposit() {}

    public FixedDeposit(String username, BigDecimal principalAmount, double interestRate, int tenureMonths, LocalDate startDate, String status) {
        this.username = username;
        this.principalAmount = principalAmount;
        this.interestRate = interestRate;
        this.tenureMonths = tenureMonths;
        this.startDate = startDate;
        this.status = status;
    }

    // getters and setters

    public Long getFdId() {
        return fdId;
    }

    public void setFdId(Long fdId) {
        this.fdId = fdId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public BigDecimal getPrincipalAmount() {
        return principalAmount;
    }

    public void setPrincipalAmount(BigDecimal principalAmount) {
        this.principalAmount = principalAmount;
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
        return "FixedDeposit{" +
                "fdId=" + fdId +
                ", username='" + username + '\'' +
                ", principalAmount=" + principalAmount +
                ", interestRate=" + interestRate +
                ", tenureMonths=" + tenureMonths +
                ", startDate=" + startDate +
                ", status='" + status + '\'' +
                '}';
    }
}
