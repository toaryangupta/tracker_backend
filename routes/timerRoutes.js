// routes/timerRoutes.js

const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');
const authMiddleware = require('../middleware/authMiddleware');

// Start a new timer for the authenticated employee on a specific project
router.post('/start', authMiddleware, timerController.startTimer);

// Update the mouse click and keyboard count for the timer with the specified ID
router.patch('/:id', authMiddleware, timerController.updateTimer);

// Stop the timer with the specified ID
router.patch('/:id/stop', authMiddleware, timerController.stopTimer);

module.exports = router;
