// controllers/employeeController.js

const Employee = require('../models/employeeModel');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

// Create a new employee (admin-only)
const createEmployee = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return responseHandler.error(res, 'Unauthorized', 401);
    }

    const { name, email, password } = req.body;
    const employee = await Employee.create({ name, email, password });
    responseHandler.success(res, { employee }, 'Employee created successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

// Get all employees (admin-only)
const getAllEmployees = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return responseHandler.error(res, 'Unauthorized', 401);
    }

    const employees = await Employee.find();
    responseHandler.success(res, { employees }, 'Employees retrieved successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

// Get a specific employee (admin-only)
const getEmployeeById = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return responseHandler.error(res, 'Unauthorized', 401);
    }

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return responseHandler.error(res, 'Employee not found', 404);
    }

    responseHandler.success(res, { employee }, 'Employee retrieved successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

// Get projects associated with a specific employee (admin-only)
const getEmployeeProjects = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return responseHandler.error(res, 'Unauthorized', 401);
    }

    const employee = await Employee.findById(req.params.id).populate('projects');
    if (!employee) {
      return responseHandler.error(res, 'Employee not found', 404);
    }

    responseHandler.success(res, { projects: employee.projects }, 'Projects retrieved successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

module.exports = { createEmployee, getAllEmployees, getEmployeeById, getEmployeeProjects };
