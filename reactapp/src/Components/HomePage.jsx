// src/Components/HomePage.jsx
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Banking Transaction Management System</h1>
      <p>Manage your accounts, deposits, and transactions securely.</p>
      <div className="home-links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;