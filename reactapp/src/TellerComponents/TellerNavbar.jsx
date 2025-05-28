// src/TellerComponents/TellerNavbar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import './TellerNavbar.css';

const TellerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="teller-navbar">
      <NavLink to="/teller/manage-accounts">Manage Accounts</NavLink>
      <NavLink to="/teller/transactions">Transactions</NavLink>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default TellerNavbar;