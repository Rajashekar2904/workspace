// src/CustomerComponents/TransactionHistoryComponent.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionHistoryComponent.css';

const TransactionHistoryComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/transactions/user/${userId}/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transaction history.');
        console.error('Fetch transaction history error:', err);
      }
    };
    fetchTransactionHistory();
  }, [userId, token]);

  return (
    <div className="transaction-history-container">
      <h1>Transaction History</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Account ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.accountId}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.type}</td>
              <td>{transaction.status}</td>
              <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistoryComponent;