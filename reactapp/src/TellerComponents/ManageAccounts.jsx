// src/TellerComponents/ManageAccounts.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageAccounts.css';

const ManageAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/accounts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAccounts(response.data);
      } catch (err) {
        setError('Failed to fetch accounts.');
        console.error('Fetch accounts error:', err);
      }
    };
    fetchAccounts();
  }, [token]);

  const handleUpdateStatus = async (accountId, status) => {
    try {
      await axios.put(
        `http://localhost:8080/api/accounts/${accountId}/${status.toLowerCase()}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAccounts(
        accounts.map((account) =>
          account.id === accountId ? { ...account, status } : account
        )
      );
    } catch (err) {
      setError(`Failed to ${status.toLowerCase()} account.`);
      console.error(`${status} account error:`, err);
    }
  };

  return (
    <div className="manage-accounts-container">
      <h1>Manage Accounts</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>User ID</th>
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
              <td>{account.userId}</td>
              <td>{account.type}</td>
              <td>${account.balance.toFixed(2)}</td>
              <td>{account.status}</td>
              <td>
                {account.status === 'PENDING' && (
                  <button onClick={() => handleUpdateStatus(account.id, 'APPROVED')}>
                    Approve
                  </button>
                )}
                {account.status === 'APPROVED' && (
                  <button onClick={() => handleUpdateStatus(account.id, 'DEACTIVATED')}>
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAccounts;