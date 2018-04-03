const dotenv = require('dotenv');
const logger = require('./utils/logger');
const program = require('commander');
const mongoose = require('mongoose');
const fs = require('fs');
const util = require('util');

/**
 * Load environment variables from .env file
 * where API keys and passwords are configured
 */
dotenv.load({
  path: '.env',
});


/**
 * Init interactive CLI tools
 */
program
  .version('1.0.0')
  .option('-o, --output [file.json]', 'Save jsoned mosk data to a dump file')
  .option('-s, --save', 'Save mock data to db')
  .parse(process.argv);

if (program.save) {
  /**
   * Connect to MongoDB
   */
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error. Please make sure MongoDB is running');
    logger.debug(err);
    process.exit();
  });

  // save to db in here

  logger.info('Mock data was saved to db');
}


if (program.output) {
  /**
   * Promisify writing files
   */
  const writeFile = util.promisify(fs.writeFile);
  const writeMockData = async (filename, data) => {
    try {
      await writeFile(filename, data);
      logger.info('Mock data was written to file');
    } catch (err) {
      logger.error('Error happend while writing a file');
      logger.debug(err);
    }
  };

  const filename = program.output;
  writeMockData(filename, data);
}

process.exit();
