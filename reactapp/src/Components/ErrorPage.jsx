// src/Components/ErrorPage.jsx
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Error</h1>
      <p>Sorry, something went wrong or you don't have access to this page.</p>
      <a href="/">Return to Home</a>
    </div>
  );
};

export default ErrorPage;