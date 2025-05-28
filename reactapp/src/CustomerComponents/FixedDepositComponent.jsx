import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FixedDepositComponent.css';

const FixedDepositComponent = () => {
  const [fixedDeposits, setFixedDeposits] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFixedDeposits = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/fixed-deposits/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFixedDeposits(response.data);
      } catch (err) {
        setError('Failed to fetch fixed deposits.');
        console.error('Fetch fixed deposits error:', err);
      }
    };
    fetchFixedDeposits();
  }, [userId, token]);

  return (
    <div className="fixed-deposit-container">
      <h1>Fixed Deposits</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={() => navigate('/customer/open-fd')}>Open New Fixed Deposit</button>
      <table>
        <thead>
          <tr>
            <th>FD ID</th>
            <th>Amount</th>
            <th>Tenure</th>
            <th>Interest Rate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fixedDeposits.map((fd) => (
            <tr key={fd.id}>
              <td>{fd.id}</td>
              <td>${fd.amount.toFixed(2)}</td>
              <td>{fd.tenure} months</td>
              <td>{fd.interestRate}%</td>
              <td>{fd.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FixedDepositComponent;