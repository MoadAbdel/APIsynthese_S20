const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validateAuth = require('../middlewares/validateAuth.middleware');

router.post('/signup', validateAuth, authController.signup);
router.post('/login', validateAuth, authController.login);

module.exports = router;
