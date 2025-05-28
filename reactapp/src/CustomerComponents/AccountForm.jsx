// src/CustomerComponents/AccountForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountForm.css';

const AccountForm = () => {
  const [accountType, setAccountType] = useState('SAVINGS');
  const [initialBalance, setInitialBalance] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/accounts',
        { userId, type: accountType, balance: parseFloat(initialBalance) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Account created successfully!');
      setTimeout(() => navigate('/customer/accounts'), 2000);
    } catch (err) {
      setError('Failed to create account.');
      console.error('Create account error:', err);
    }
  };

  return (
    <div className="account-form-container">
      <h2>Open New Account</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="account-form">
        <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
          <option value="SAVINGS">Savings</option>
          <option value="CHECKING">Checking</option>
        </select>
        <input
          type="number"
          placeholder="Initial Balance"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          required
        />
        <button onClick={handleSubmit}>Create Account</button>
      </div>
    </div>
  );
};

export default AccountForm;