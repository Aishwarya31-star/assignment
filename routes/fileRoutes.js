const express = require('express');
const { uploadFile } = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');

var router = express.Router();

router.post('/upload', authMiddleware, uploadFile);

module.exports = router;
