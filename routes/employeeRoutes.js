// routes/employeeRoutes.js

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new employee (admin-only)
router.post('/', authMiddleware, employeeController.createEmployee);

// Get all employees (admin-only)
router.get('/', authMiddleware, employeeController.getAllEmployees);

// Get a specific employee (admin-only)
router.get('/:id', authMiddleware, employeeController.getEmployeeById);

// Get projects associated with a specific employee (admin-only)
router.get('/:id/projects', authMiddleware, employeeController.getEmployeeProjects);

module.exports = router;
