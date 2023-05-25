// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const Employee = require('../models/employeeModel');
const errorHandler = require('../utils/errorHandler');

// Authenticate and authorize the user
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return errorHandler.handleError(res, 'No token provided', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Employee.findById(decoded.id);

    if (!user) {
      return errorHandler.handleError(res, 'User not found', 404);
    }

    req.user = user;
    next();
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

module.exports = authMiddleware;
