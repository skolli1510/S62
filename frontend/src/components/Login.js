import React, { useState } from 'react';
import { login } from '../services/api';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send credentials to backend
      const { token } = await login({ username, password });
      localStorage.setItem('token', token);
      setToken(token);  // Set token in the parent component (App.js)
      navigate('/dashboard');  // Redirect to dashboard
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
      setErrorMessage('Invalid username or password. Please try again.');  // Display error message
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form" aria-labelledby="login-header">
        <h2 id="login-header" className="header">Login</h2>

        <label htmlFor="username" className="visually-hidden">Username</label>
        <input
          id="username"
          name="username"
          placeholder="Username"
          className="input"
          onChange={(e) => setUsername(e.target.value)}
          aria-required="true"
          aria-describedby="username-desc"
        />
        
        <label htmlFor="password" className="visually-hidden">Password</label>
        <input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          aria-required="true"
          aria-describedby="password-desc"
        />
        
        <button type="submit" className="button" aria-label="Submit login form">Login</button>

        {/* Display error message if login fails */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default Login;
