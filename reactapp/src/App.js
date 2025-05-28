// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './CustomerComponents/LoginComponent';
import RegisterComponent from './CustomerComponents/RegisterComponent';
import TransactionHistoryComponent from './CustomerComponents/TransactionHistoryComponent';
import TransactionComponent from './CustomerComponents/TransactionComponent';
import PrivateRoute from './PrivateRoute';
import ManagerNavbar from './ManagerComponents/ManagerNavbar';
import FixedDepositsComponent from './ManagerComponents/FixedDepositsComponent';
import RecurringDepositsComponent from './ManagerComponents/RecurringDepositsComponent';
import TransactionsComponent from './ManagerComponents/TransactionsComponent';
import ViewAllAccountsComponent from './ManagerComponents/ViewAllAccountsComponent';
import TellerNavbar from './TellerComponents/TellerNavbar';
import ManageAccounts from './TellerComponents/ManageAccounts';
import TransactionComponentTeller from './TellerComponents/TransactionComponent';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />

          {/* Customer Routes */}
          <Route
            path="/customer/transaction-history"
            element={
              <PrivateRoute allowedRoles={['CUSTOMER']}>
                <TransactionHistoryComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/customer/transactions"
            element={
              <PrivateRoute allowedRoles={['CUSTOMER']}>
                <TransactionComponent />
              </PrivateRoute>
            }
          />

          {/* Manager Routes */}
          <Route
            path="/manager"
            element={
              <PrivateRoute allowedRoles={['MANAGER']}>
                <ManagerNavbar />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/view-all-accounts"
            element={
              <PrivateRoute allowedRoles={['MANAGER']}>
                <ManagerNavbar />
                <ViewAllAccountsComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/fixed-deposits"
            element={
              <PrivateRoute allowedRoles={['MANAGER']}>
                <ManagerNavbar />
                <FixedDepositsComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/recurring-deposits"
            element={
              <PrivateRoute allowedRoles={['MANAGER']}>
                <ManagerNavbar />
                <RecurringDepositsComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/manager/transactions"
            element={
              <PrivateRoute allowedRoles={['MANAGER']}>
                <ManagerNavbar />
                <TransactionsComponent />
              </PrivateRoute>
            }
          />

          {/* Teller Routes */}
          <Route
            path="/teller"
            element={
              <PrivateRoute allowedRoles={['TELLER']}>
                <TellerNavbar />
              </PrivateRoute>
            }
          />
          <Route
            path="/teller/manage-accounts"
            element={
              <PrivateRoute allowedRoles={['TELLER']}>
                <TellerNavbar />
                <ManageAccounts />
              </PrivateRoute>
            }
          />
          <Route
            path="/teller/transactions"
            element={
              <PrivateRoute allowedRoles={['TELLER']}>
                <TellerNavbar />
                <TransactionComponentTeller />
              </PrivateRoute>
            }
          />

          {/* Default Route */}
          <Route path="*" element={<LoginComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;