import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return exp > currentTime; // Check if token is still valid
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return isTokenValid(token) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

