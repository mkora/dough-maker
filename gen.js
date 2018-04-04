const dotenv = require('dotenv');
const logger = require('./utils/logger');
const program = require('commander');
const fs = require('fs');
const util = require('util');
const mock = require('./utils/mockData');
const connect = require('./utils/connect2DB');

/**
 * Promisify writing files
 */
const writeFile = util.promisify(fs.writeFile);
const write2File = async (filename, data) => {
  try {
    await writeFile(filename, data);
    logger.info('Data was written to file');
  } catch (err) {
    logger.error('Error happend while writing a file');
    logger.debug(err);
  }
};

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

/**
 * Get mock data
 */
mock()
  .then((data) => {
    logger.info('Mock data was generated', data);
    /**
     * Output the data
     */
    if (program.save) {
      connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);

      // TODO save to db in here
      // before adding clear collection

      logger.info('Mock data was saved to db');
    } else if (program.output) {
      const filename = program.output;
      if (typeof filename !== 'string') {
        throw new Error('Filename wasn\'t specified');
      }

      // TODO Flatten array

      write2File(filename, data);
    } else {
      throw new Error('Output resource wasn\'t specified');
    }

    logger.debug('Success');
    process.exit();
  })
  .catch((err) => {
    logger.error('An error occured. Check out logs');
    logger.debug(err);
    process.exit();
  });
