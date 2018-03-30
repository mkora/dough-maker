const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utils/logger');

/**
 * Load environment variables from .env file
 * where API keys and passwords are configured
 */
dotenv.load({
  path: '.env',
});

/**
 * Controllers
 */
const gen = require('./utils/gen');

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error. Please make sure MongoDB is running');
  logger.debug(err);
  process.exit();
});


gen().then(() => {
  logger.info('Done!');
}).catch((error) => {
  logger.error('Error happened. Check out logs.');
  logger.debug(error);
});
