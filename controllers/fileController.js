const File = require('../model/fileModel');
const path = require('path');
const fs = require('fs');

// Upload file
module.exports.uploadFile = async (req, res) => {
  try {

    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;

    // Validate file size for 5 mb
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size should not exceed 5MB' });
    }

    // Check file extension 
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
    const extname = path.extname(file.name).toLowerCase();
    if (!allowedExtensions.includes(extname)) {
      return res.status(400).json({ error: 'Invalid file type. Only images and PDFs are allowed.' });
    }

    // Create unique file name
    const fileName = Date.now() + '-' + file.name;
    const uploadDir = path.join(__dirname, '../uploads');

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    // Move file to upload directory
    await file.mv(filePath);

    // Save file info to database
    const newFile = new File({
      userId: req.body.userId,
      fileName,
      filePath,
      fileSize: file.size,
    });
    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully'});
  } catch (error) {
    console.log('error=============',error)
    res.status(500).json({ error: 'Failed to upload file' });
  }
};
