// src/ManagerComponents/ViewAllAccountsComponent.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAllAccountsComponent.css';

const ViewAllAccountsComponent = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAllAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8087/api/accounts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(response.data);
      } catch (err) {
        setError('Failed to fetch accounts.');
        console.error('Fetch all accounts error:', err);
      }
    };
    fetchAllAccounts();
  }, [token]);

  const handleApprove = async (accountId) => {
    try {
      await axios.put(
        `http://localhost:8087/api/accounts/${accountId}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAccounts(
        accounts.map((account) =>
          account.id === accountId ? { ...account, status: 'APPROVED' } : account
        )
      );
    } catch (err) {
      setError('Failed to approve account.');
      console.error('Approve account error:', err);
    }
  };

  const handleDeactivate = async (accountId) => {
    try {
      await axios.put(
        `http://localhost:8087/api/accounts/${accountId}/deactivate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAccounts(
        accounts.map((account) =>
          account.id === accountId ? { ...account, status: 'DEACTIVATED' } : account
        )
      );
    } catch (err) {
      setError('Failed to deactivate account.');
      console.error('Deactivate account error:', err);
    }
  };

  return (
    <div className="view-all-accounts-container">
      <h1>All Accounts</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Type</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.type}</td>
              <td>${account.balance.toFixed(2)}</td>
              <td>{account.status}</td>
              <td>
                {account.status === 'PENDING' && (
                  <button onClick={() => handleApprove(account.id)}>Approve</button>
                )}
                {account.status === 'APPROVED' && (
                  <button onClick={() => handleDeactivate(account.id)}>Deactivate</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllAccountsComponent;