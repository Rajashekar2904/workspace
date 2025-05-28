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
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('DEPOSIT');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/transactions/user/${userId}`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/transactions',
        { userId, accountId, amount: parseFloat(amount), type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Transaction created successfully!');
      const response = await axios.get(`http://localhost:8080/api/transactions/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data);
      setAccountId('');
      setAmount('');
      setType('DEPOSIT');
    } catch (err) {
      setError('Failed to create transaction.');
      console.error('Create transaction error:', err);
    }
  };

  const handleCancelTransaction = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/transactions/${selectedTransactionId}`, {
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
      <div className="transaction-form">
        <input
          type="number"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccount