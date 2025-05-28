// src/CustomerComponents/AccountComponent.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountComponent.css';

const AccountComponent = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8087/api/accounts/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(response.data);
      } catch (err) {
        setError('Failed to fetch accounts.');
        console.error('Fetch accounts error:', err);
      }
    };
    fetchAccounts();
  }, [userId, token]);

  return (
    <div className="account-container">
      <h1>My Accounts</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={() => navigate('/customer/open-account')}>Open New Account</button>
      <button onClick={() => navigate('/customer/open-fd')}>Open Fixed Deposit</button>
      <button onClick={() => navigate('/customer/open-rd')}>Open Recurring Deposit</button>
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.type}</td>
              <td>${account.balance.toFixed(2)}</td>
              <td>{account.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountComponent;