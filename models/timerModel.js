// models/timerModel.js

const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    mouseClick: { type: Number, default: 0 },
    keyboardCount: { type: Number, default: 0 },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
  },
  { timestamps: true }
);

const Timer = mongoose.model('Timer', timerSchema);

module.exports = Timer;
