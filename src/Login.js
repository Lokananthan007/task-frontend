// Login.js
import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4455/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData.error || 'Unknown error');
      } else {
        console.log('Login successful');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login container-fluid">
      <form onSubmit={handleLogin}>
        <p>
          <IoIosLock className="me-1 mb-1" />
          Please Enter Your Login Details
        </p>
        <hr></hr>
        <label>
          <FaRegUser className="me-1" />
          Username:<br />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
        </label>
        <br />
        <br />
        <label>
          <IoIosLock /> Password:<br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </label>
        <br />
        <br />
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
