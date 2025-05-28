// src/CustomerComponents/TransactionComponent.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionComponent.css';

const TransactionComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8087/api/transactions/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions.');
        console.error('Fetch transactions error:', err);
      }
    };
    fetchTransactions();
  }, [userId, token]);

  const handleCancelTransaction = async () => {
    try {
      await axios.delete(`http://localhost:8087/api/transactions/${selectedTransactionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Transaction cancelled successfully.');
      setTransactions(transactions.filter((t) => t.id !== selectedTransactionId));
      setShowConfirm(false);
    } catch (err) {
      setError('Failed to cancel transaction.');
      console.error('Cancel transaction error:', err);
    }
  };

  return (
    <div className="transaction-container">
      <h1>Transactions</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.type}</td>
              <td>{transaction.status}</td>
              <td>
                {transaction.status === 'PENDING' && (
                  <button
                    onClick={() => {
                      setSelectedTransactionId(transaction.id);
                      setShowConfirm(true);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirm && (
        <div className="confirm-popup">
          <p>Are you sure you want to cancel this transaction?</p>
          <button onClick={handleCancelTransaction}>Yes, Cancel</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TransactionComponent;