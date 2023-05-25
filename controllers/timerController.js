// controllers/timerController.js

const Timer = require('../models/timerModel');
const errorHandler = require('../utils/errorHandler');
const responseHandler = require('../utils/responseHandler');

// Start a new timer for the authenticated employee on a specific project
const startTimer = async (req, res) => {
  try {
    const { projectId } = req.body;

    const timer = await Timer.create({
      employee: req.user.id,
      project: projectId,
      startTime: new Date(),
    });

    responseHandler.success(res, { timer }, 'Timer started successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

// Update the mouse click and keyboard count for the timer with the specified ID
const updateTimer = async (req, res) => {
  try {
    const { mouseClick, keyboardCount } = req.body;

    const timer = await Timer.findByIdAndUpdate(
      req.params.id,
      { mouseClick, keyboardCount },
      { new: true }
    );

    if (!timer) {
      return responseHandler.error(res, 'Timer not found', 404);
    }

    responseHandler.success(res, { timer }, 'Timer updated successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

// Stop the timer with the specified ID
const stopTimer = async (req, res) => {
  try {
    const timer = await Timer.findById(req.params.id);

    if (!timer) {
      return responseHandler.error(res, 'Timer not found', 404);
    }

    timer.endTime = new Date();
    await timer.save();

    responseHandler.success(res, { timer }, 'Timer stopped successfully');
  } catch (error) {
    errorHandler.handleError(res, error);
  }
};

module.exports = { startTimer, updateTimer, stopTimer };
