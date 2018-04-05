const dotenv = require('dotenv');
const logger = require('./utils/logger');
const program = require('commander');

const mock = require('./utils/mockData');
const connect = require('./utils/connect2DB');
const writeFile = require('./utils/writeFile');

const Item = require('./models/Item');
/**
 * Load environment variables from .env file
 * where API keys and passwords are configured
 */
dotenv.load({
  path: '.env',
});

const cmdOutput = (filename) => {
  mock()
    .then((data) => {
      if (typeof filename !== 'string') {
        throw new Error('Filename wasn\'t specified');
      }

      // TODO Flatten array

      writeFile(filename, data);
    })
    .catch((err) => {
      logger.error('An error occured. Check out logs');
      logger.debug(err);
      process.exit();
    });
};

/**
 * Save mock data to db
 */
const cmdSave = () => {
  connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
  mock()
    .then((data) => {
      logger.info('Mock data was generated', data);
      return Item.truncate()
        .then(() => {
          logger.info('Collection was emptied');
          return Promise.all(data.map(d => Item.create(d)));
        });
    })
    .then((res) => {
      logger.info('Mock data was saved, %d items', res.length);
    })
    .catch((err) => {
      logger.error('An error occured. Check out logs');
      logger.debug(err);
      process.exit();
    });
};

/**
 * Init interactive CLI tools
 */
program
  .version('1.0.0')
  .description('Generate moke data');

program
  .command('output <filename>')
  .alias('o')
  .description('Save jsoned mosk data to a dump file')
  .action(filename => cmdOutput(filename));

program
  .command('save')
  .alias('s')
  .description('Save mock data to db')
  .action(() => cmdSave());

program.parse(process.argv);

