const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = (uri) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(uri, { useNewUrlParser: true });
  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error. Please make sure MongoDB is running');
    logger.debug(err);
    process.exit();
  });
};
