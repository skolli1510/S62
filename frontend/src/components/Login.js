import React, { useState } from 'react';
import { login } from '../services/api';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login({ username, password });
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
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
      </form>
    </div>
  );
}

export default Login;
