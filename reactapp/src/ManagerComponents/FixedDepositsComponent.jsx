// src/ManagerComponents/FixedDepositsComponent.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './FixedDepositsComponent.css';

const FixedDepositsComponent = () => {
  const [fixedDeposits, setFixedDeposits] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFixedDeposits = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/fixed-deposits', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFixedDeposits(response.data);
      } catch (err) {
        setError('Failed to fetch fixed deposits.');
        console.error('Fetch fixed deposits error:', err);
      }
    };
    fetchFixedDeposits();
  }, [token]);

  const handleApprove = async (fdId) => {
    try {
      await axios.put(
        `http://localhost:8080/api/fixed-deposits/${fdId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFixedDeposits(
        fixedDeposits.map((fd) =>
          fd.id === fdId ? { ...fd, status: 'APPROVED' } : fd
        )
      );
    } catch (err) {
      setError('Failed to approve fixed deposit.');
      console.error('Approve fixed deposit error:', err);
    }
  };

  return (
    <div className="fixed-deposits-container">
      <h1>All Fixed Deposits</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>FD ID</th>
            <th>User ID</th>
            <th>Account ID</th>
            <th>Amount</th>
            <th>Tenure</th>
            <th>Interest Rate</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fixedDeposits.map((fd) => (
            <tr key={fd.id}>
              <td>{fd.id}</td>
              <td>{fd.userId}</td>
              <td>{fd.accountId}</td>
              <td>${fd.amount.toFixed(2)}</td>
              <td>{fd.tenure} months</td>
              <td>{fd.interestRate}%</td>
              <td>{fd.status}</td>
              <td>
                {fd.status === 'PENDING' && (
                  <button onClick={() => handleApprove(fd.id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FixedDepositsComponent;