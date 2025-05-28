// src/CustomerComponents/RecurringDepositComponent.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecurringDepositComponent.css';

const RecurringDepositComponent = () => {
  const [recurringDeposits, setRecurringDeposits] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecurringDeposits = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recurring-deposits/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecurringDeposits(response.data);
      } catch (err) {
        setError('Failed to fetch recurring deposits.');
        console.error('Fetch recurring deposits error:', err);
      }
    };
    fetchRecurringDeposits();
  }, [userId, token]);

  return (
    <div className="recurring-deposit-container">
      <h1>Recurring Deposits</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={() => navigate('/customer/open-rd')}>Open New Recurring Deposit</button>
      <table>
        <thead>
          <tr>
            <th>RD ID</th>
            <th>Monthly Amount</th>
            <th>Tenure</th>
            <th>Interest Rate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {recurringDeposits.map((rd) => (
            <tr key={rd.id}>
              <td>{rd.id}</td>
              <td>${rd.amount.toFixed(2)}</td>
              <td>{rd.tenure} months</td>
              <td>{rd.interestRate}%</td>
              <td>{rd.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecurringDepositComponent;