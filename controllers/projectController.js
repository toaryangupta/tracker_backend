// controllers/projectController.js

const Project = require('../models/projectModel');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

// Create a new project (admin-only)
const createProject = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return responseHandler.error(res, 'Unauthorized', 401);
    }

    const { name, description } = req.body;
    const project = await Project.create({ name, description });
    responseHandler.success(res, { project }, 'Project created successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    responseHandler.success(res, { projects }, 'Projects retrieved successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

// Get a specific project
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return responseHandler.error(res, 'Project not found', 404);
    }

    responseHandler.success(res, { project }, 'Project retrieved successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

// Get employees associated with a specific project
const getProjectEmployees = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('employees');
    if (!project) {
      return responseHandler.error(res, 'Project not found', 404);
    }

    responseHandler.success(res, { employees: project.employees }, 'Employees retrieved successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

module.exports = { createProject, getAllProjects, getProjectById, getProjectEmployees };
