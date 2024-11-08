import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = ({ setToken }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar" aria-label="Main navigation">
      {token ? (
        <>
          {/* Accessible links for logged-in users */}
          <Link to="/dashboard" className="nav-link" aria-label="Go to Dashboard">Dashboard</Link>
          <Link to="/summary" className="nav-link" aria-label="Go to Summary">Summary</Link>
          <Link to="/reports" className="nav-link" aria-label="Go to Reports">Reports</Link>
          <button
            className="logout-button"
            onClick={handleLogout}
            aria-label="Log out"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          
        </>
      )}
    </nav>
  );
};

export default NavBar;
