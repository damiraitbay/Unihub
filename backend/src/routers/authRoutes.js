// src/routes/authRoutes.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/send-code', authController.sendVerificationCode);
router.post('/verify-code', authController.verifyAndRegister);
router.post('/login', authController.login);

module.exports = router;