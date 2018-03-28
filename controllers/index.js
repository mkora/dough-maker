const logger = require('../utils/logger');

exports.index = (req, res) => {
  logger.debug('Controller index, function index called');
  return res.json({
    message: 'Hello World',
  });
};
