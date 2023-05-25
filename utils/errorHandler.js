// utils/errorHandler.js

const errorHandler = {
  handleError(res, error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  },
};

module.exports = errorHandler;
