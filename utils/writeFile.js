const fs = require('fs');
const util = require('util');
const logger = require('./logger');

const writeFile = util.promisify(fs.writeFile);

module.exports = async (filename, data) => {
  try {
    await writeFile(filename, data);
    logger.info('Data was written to file');
  } catch (err) {
    logger.error('Error happend while writing a file');
    logger.debug(err);
  }
};
