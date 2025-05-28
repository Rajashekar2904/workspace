// src/CustomerComponents/OpenFDForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OpenFDForm.css';

const OpenFDForm = () => {
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('');
  const [accountId, setAccountId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/api/fixed-deposits',
        { userId, accountId, amount: parseFloat(amount), tenure: parseInt(tenure) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Fixed Deposit created successfully!');
      setTimeout(() => navigate('/customer/fixed-deposits'), 2000);
    } catch (err) {
      setError('Failed to create fixed deposit.');
      console.error('Create fixed deposit error:', err);
    }
  };

  return (
    <div className="open-fd-form-container">
      <h2>Open Fixed Deposit</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className="open-fd-form">
        <input
          type="number"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Tenure (months)"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          required
        />
        <button onClick={handleSubmit}>Create Fixed Deposit</button>
      </div>
    </div>
  );
};

export default OpenFDForm;