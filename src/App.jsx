import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/user/Login';
import RegisterUser from './components/user/RegisterUser';
import FileUpload from './components/fileUpload/FileUpload';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<FileUpload/>} />
      </Routes>
    </Router>
  );
};

export default App;
