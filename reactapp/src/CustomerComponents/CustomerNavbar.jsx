// src/CustomerComponents/CustomerNavbar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import './CustomerNavbar.css';

const CustomerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="customer-navbar">
      <NavLink to="/customer/accounts">Accounts</NavLink>
      <NavLink to="/customer/fixed-deposits">Fixed Deposits</NavLink>
      <NavLink to="/customer/recurring-deposits">Recurring Deposits</NavLink>
      <NavLink to="/customer/transactions">Transactions</NavLink>
      <NavLink to="/customer/transaction-history">Transaction History</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default CustomerNavbar;