// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Reports from './components/Reports';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import './styles/NavBar.css';
import Footer from './components/Footer';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // Manage authentication token

  useEffect(() => {
    // Save token to localStorage to persist login across page refreshes
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <Router>
      <NavBar setToken={setToken} />
      <Routes>
        {/* Redirect root path ("/") to "/login" if not authenticated */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        
        {/* Login Route */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        
        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={<PrivateRoute isAuthenticated={token}><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/summary"
          element={<PrivateRoute isAuthenticated={token}><Summary /></PrivateRoute>}
        />
        <Route
          path="/reports"
          element={<PrivateRoute isAuthenticated={token}><Reports /></PrivateRoute>}
        />
      </Routes>
      <Footer /> {/* Add the Footer here */}
    </Router>
  );
}

export default App;
