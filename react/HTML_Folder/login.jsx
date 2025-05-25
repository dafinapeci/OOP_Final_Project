import React, { useState } from 'react';
import '../CSS_Stylesheets/loginStyle.css';
import logo from '../../src/images/logo.png'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // State for email/username input
  const [email, setEmail] = useState('');
  // State for password input
  const [password, setPassword] = useState('');
  // State for error messages
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission for login
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submit behavior
    try {
      // Send POST request to login endpoint with username and password
      const response = await axios.post('http://localhost:---secure---', {
        username: email,
        password: password
      });
      console.log('Login Success:', response.data);
      navigate('/mainPage');  // Redirect to main page on success
    } catch (err) {
      setError('Failed to login. Please check your credentials.'); // Show error message on failure
      console.error('Login Error:', err);
    }
  };

  return (
    <div className='LogIn'>
      <div className="total-container">
        <div className="box-container">

          {/* Logo and header */}
          <div className="logo-header">
            <img src={logo} alt="Spotify Logo" className="logo" />
            <h2 id="loginHeader">Log in to Le Spotify</h2>
          </div>

          {/* Login form */}
          <div>
            <form onSubmit={handleLogin} method="post" className="login-form">

              {/* Email or username input */}
              <label>Email or username</label>
              <input
                type="text"
                name="username"
                placeholder="Email or username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password input */}
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Submit button */}
              <button type="submit" className="login-button">Log In</button>
            </form>

            {/* Show error message if login fails */}
            {error && <p className="error-message">{error}</p>}

            {/* Forgot password link */}
            <a href="#" className="forgot-password">Forgot your password?</a>

            {/* Link to signup page */}
            <div className="create-account-section">
              <p>Don't have an account? <Link to="/signup" className="create-account">Sign up for Le Spotify</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
