// routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new project (admin-only)
router.post('/', authMiddleware, projectController.createProject);

// Get all projects
router.get('/', projectController.getAllProjects);

// Get a specific project
router.get('/:id', projectController.getProjectById);

// Get employees associated with a specific project
router.get('/:id/employees', projectController.getProjectEmployees);

module.exports = router;
