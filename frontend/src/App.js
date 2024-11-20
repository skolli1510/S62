import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Reports from './components/Reports';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { jwtDecode } from 'jwt-decode';
import './styles/NavBar.css';
import Footer from './components/Footer';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token')); // Manage authentication token

  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      return exp > currentTime;
    } catch (error) {
      console.error("Invalid token:", error);
      return false;
    }
  };

  useEffect(() => {
    // Save token to localStorage to persist login across page refreshes
    if (token && isTokenValid(token)) {
      localStorage.setItem('token', token);
    } else {
      setToken(null); // Clear token if invalid
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
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/summary"
          element={<PrivateRoute><Summary /></PrivateRoute>}
        />
        <Route
          path="/reports"
          element={<PrivateRoute><Reports /></PrivateRoute>}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

