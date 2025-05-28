// src/CustomerComponents/AccountViewComponent.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountViewComponent.css';

const AccountViewComponent = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/accounts/user/${userId}`, {
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
    <div className="account-view-container">
      <h1>Account Details</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.type}</td>
              <td>${account.balance.toFixed(2)}</td>
              <td>{account.status}</td>
              <td>{new Date(account.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountViewComponent;