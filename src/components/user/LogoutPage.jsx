import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the user's authentication token and userId from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h2>You have been logged out successfully!</h2>
    </div>
  );
};

export default LogoutPage;
