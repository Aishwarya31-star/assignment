import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { registerUser, resetUserState } from '../../components/user/store/action/User.action'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/Register.css';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { loading, error, success ,message} = useSelector((state) => state.user); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetUserState()); // Reset the user state before navigation
        navigate('/login');
      }, 1000);
    }
  }, [success, dispatch, navigate]); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)); // Dispatch the registration action
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username"
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="form-input"
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p className="login-link">
        Already have an account? <a href="/login">Login now</a>
      </p>
    </div>
  );
};

export default RegisterUser;
