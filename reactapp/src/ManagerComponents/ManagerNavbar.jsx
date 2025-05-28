// src/ManagerComponents/ManagerNavbar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import './ManagerNavbar.css';

const ManagerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="manager-navbar">
      <NavLink to="/manager/view-all-accounts">All Accounts</NavLink>
      <NavLink to="/manager/fixed-deposits">Fixed Deposits</NavLink>
      <NavLink to="/manager/recurring-deposits">Recurring Deposits</NavLink>
      <NavLink to="/manager/transactions">Transactions</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default ManagerNavbar;