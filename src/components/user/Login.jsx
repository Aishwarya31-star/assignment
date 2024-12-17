import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../components/user/store/action/User.action';
import { RESET_USER_STATE } from '../../components/user/store/action/User.action'; // Import the reset action
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success, message, token } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)); 
  };

  useEffect(() => {
    if (success && token) {
      localStorage.setItem('token', token); 

      // Decode token to get userId
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; 

      localStorage.setItem('userId', userId); 

      // Dispatch RESET_USER_STATE to reset success message
      dispatch({ type: RESET_USER_STATE });

      setTimeout(() => {
        navigate('/dashboard'); 
      }, 2000);
    }
  }, [success, token, navigate, dispatch]); 

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{message}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Register prompt */}
      <p className="register-link">
        Don't have an account? <a href="/">Register now</a>
      </p>
    </div>
  );
};

export default Login;
