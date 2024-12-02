const express = require('express');
const { register, login, uploadAssignment, getAdmins } = require('../Controller/userController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', auth, uploadAssignment);
router.get('/admins', getAdmins);

module.exports = router;
