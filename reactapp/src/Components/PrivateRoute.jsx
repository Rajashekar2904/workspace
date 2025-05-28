// src/Components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/error" />;
  }

  return <Outlet />;
};

export default PrivateRoute;