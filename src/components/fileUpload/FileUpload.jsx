import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout, AiOutlineCloudUpload } from 'react-icons/ai'; 
import '../styles/FileUpload.css';

const uploadFile = async (file, token, userId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId); 

  try {
    const response = await fetch('http://localhost:3000/file/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'Failed to upload the file. Please try again.' };
  }
};

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // File size validation (max 5MB)
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB. Please choose a smaller file.');
      setFile(null); // Clear file input if invalid
    } else {
      setFile(selectedFile);
      setError('');
      setSuccess('');
    }
  };

  // Handle form submission (file upload)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const token = localStorage.getItem('token'); 
    const userId = localStorage.getItem('userId'); 

    if (!token) {
      setError('User not logged in. Please log in to upload files.');
      return;
    }
    if (!userId) {
      setError('User ID not found. Please log in to upload files.');
      return;
    }

    const result = await uploadFile(file, token, userId); 

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess('File uploaded successfully!');
      setFile(null); 

      // Reset the input field manually
      document.querySelector('.file-input').value = '';

      setTimeout(() => {
        navigate('/dashboard'); // Redirect user after successful upload
      }, 2000);
    }
  };

  const handleLogout = () => {
    // Clear the token and userId from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <div className="upload-container">
        <div className="title-container">
          <h2>
            <AiOutlineCloudUpload size={30} /> File Storage
          </h2>
        </div>
        
      <h2>Upload File</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          accept=".jpg,.jpeg,.png,.pdf,.docx" 
        />
        <button type="submit" className="upload-btn">
          Upload
        </button>
      </form>

      <div className="logout-icon" onClick={handleLogout}>
        <AiOutlineLogout size={30} />
      </div>
    </div>
  );
};

export default FileUpload;
