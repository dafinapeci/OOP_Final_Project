import React, { useState } from 'react';
import '../CSS_Stylesheets/signupStyle.css';
import logo from '../images/logo.png'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  // State to store form input values
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    age: 0,
    email: '',
    username: '',
    password: ''
  });

  // State to store potential error messages
  const [errorMessage, setErrorMessage] = useState('');

  // Handle changes in form fields and update state accordingly
  const handleChange = async(e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission for user signup
  const handleSignup = async (e) => {
    e.preventDefault();  // Prevent default form submission

    try {
      // Send POST request to backend API to register user
      const response = await axios({
        method: "post",
        baseURL: "http://localhost:---secure---",  // Backend URL
        url: "/---secure---",        // API endpoint
        data: formData,                    // Data payload (user info)
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("User registered successfully", response.data);

      if (response.status === 200) {
        alert('Register success!');
        navigate('/login');  // Redirect to login page on success
      } else {
        alert(response.data.message || 'Registration failed');
      }

    } catch (error) {
      console.error("Error during registration:", error);
      alert('Something went wrong');  // Show error alert on failure
    }
  };

  return (
    <div className='SignUp'>
      <div className="total-container">
        <div className="box-container">

          {/* Logo and header */}
          <div className="logo-header">
            <img src={logo} alt="Spotify Logo" className="logo"/>
            <h2 id="signUpHeader">Sign up for Le Spotify</h2>
          </div>

          {/* Signup form */}
          <form onSubmit={handleSignup} method="post" className="sign-up-form">
            {/* First Name input */}
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Last Name input */}
            <label htmlFor="surname">Last Name</label>
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder="Last Name"
              value={formData.surname}
              onChange={handleChange}
              required
            />

            {/* Age input */}
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              min="13"
              required
            />

            {/* Email input */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Username input */}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            {/* Password input */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Submit button */}
            <button type="submit" className="sign-up-button">Sign Up</button>
          </form>

          {/* Link to login page */}
          <div className="login-link">
            <p>Already have an account? <Link to="/login" className="login-link-text">Log in</Link></p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
