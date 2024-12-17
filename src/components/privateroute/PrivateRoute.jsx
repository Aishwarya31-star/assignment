import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('token'); // Check if the user has a token (i.e., is logged in)

  return (
    <Route
      {...rest}
      element={token ? <Element /> : <Navigate to="/login" />} // Redirect to login if no token
    />
  );
};

export default PrivateRoute;
