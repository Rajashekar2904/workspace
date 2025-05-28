// src/ManagerComponents/RecurringDepositsComponent.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './RecurringDepositsComponent.css';

const RecurringDepositsComponent = () => {
  const [recurringDeposits, setRecurringDeposits] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecurringDeposits = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recurring-deposits', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecurringDeposits(response.data);
      } catch (err) {
        setError('Failed to fetch recurring deposits.');
        console.error('Fetch recurring deposits error:', err);
      }
    };
    fetchRecurringDeposits();
  }, [token]);

  const handleApprove = async (rdId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/recurring-deposits/${rdId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecurringDeposits(
        recurringDeposits.map((rd) =>
          rd.id === rdId ? { ...rd, status: 'APPROVED' } : rd
        )
      );
    } catch (err) {
      setError('Failed to approve recurring deposit.');
      console.error('Approve recurring deposit error:', err);
    }
  };

  return (
    <div className="recurring-deposits-container">
      <h1>All Recurring Deposits</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>RD ID</th>
            <th>User ID</th>
            <th>Account ID</th>
            <th>Monthly Amount</th>
            <th>Tenure</th>
            <th>Interest Rate</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recurringDeposits.map((rd) => (
            <tr key={rd.id}>
              <td>{rd.id}</td>
              <td>{rd.userId}</td>
              <td>{rd.accountId}</td>
              <td>${rd.amount.toFixed(2)}</td>
              <td>{rd.tenure} months</td>
              <td>{rd.interestRate}%</td>
              <td>{rd.status}</td>
              <td>
                {rd.status === 'PENDING' && (
                  <button onClick={() => handleApprove(rd.id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecurringDepositsComponent;