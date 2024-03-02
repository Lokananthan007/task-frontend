import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4455/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', name); 
        alert('Login successful');
        navigate('dashboard');
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError('Internal Server Error');
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
          Name:<br />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          <IoIosLock /> Password:<br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit" className="btn">
          Login
        </button>

        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;
