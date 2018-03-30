const logger = require('./logger');

exports = async () => {
  logger.info('Data was generated');

  logger.info('Data was saved to db');
  return true;
};
