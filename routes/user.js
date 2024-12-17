var express = require('express');
var router = express.Router();

const {registerUser , loginUser} = require('../controllers/userController')
const {validateUserInput} = require('../middleware/validateUser')

router.post('/register' , validateUserInput,registerUser);

router.post('/login', loginUser);

module.exports = router;
