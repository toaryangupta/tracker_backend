// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new admin
router.post('/register', authController.registerAdmin);

// Login an employee
router.post('/login', authController.login);

// Example of protected route
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;
