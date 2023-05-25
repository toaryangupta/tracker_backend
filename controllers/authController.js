// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

// Register a new admin
const registerAdmin = async (req, res) => {
  try {
    // Check if admin already exists
    const adminExists = await Employee.findOne({ isAdmin: true });
    if (adminExists) {
      return responseHandler.error(res, 'Admin already exists', 400);
    }

    // Create a new admin
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Employee.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    responseHandler.success(res, { admin }, 'Admin registered successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

// Login an employee
const login = async (req, res) => {
  try {
    // Find the employee by email
    const employee = await Employee.findOne({ email: req.body.email });
    // console.log("I am at employee")
    // console.log(employee)
    // Check if employee exists and password matches
    if (!employee || !(await bcrypt.compare(req.body.password, employee.password))) {
      return responseHandler.error(res, 'Invalid email or password', 401);
    }

    // Generate and send JWT token
    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET);
    // console.log("----")
    // console.log(token)
    responseHandler.success(res, { token }, 'Login successful');

  } catch (error) {
    // console.log("I am here")
    errorHandler.handleError(res, error);
  }
};

module.exports = { registerAdmin, login };
