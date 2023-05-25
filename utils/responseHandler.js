// utils/responseHandler.js

const responseHandler = {
  success(res, data, message) {
    res.json({ success: true, data, message });
  },
  error(res, message, status) {
    res.status(status).json({ success: false, message });
  },
};

module.exports = responseHandler;
