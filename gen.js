#!/usr/bin/env node

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

/**
 * Save mock data to dump MongoDB file
 */
const cmdOutput = async (filename) => {
  try {
    if (typeof filename !== 'string') {
      throw new Error('Filename wasn\'t specified');
    }

    const data = await mock();
    logger.debug('Mock data was generated', data);

    const strs = data.map(d => JSON.stringify(d)).join('\n');
    await writeFile(filename, strs, 'utf-8');
    logger.info('Done!');
  } catch (err) {
    logger.error('An error occured. Check out logs');
    logger.debug(err);
  }
};

/**
 * Save mock data to db
 */
const cmdSave = async () => {
  connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
  try {
    const data = await mock();
    logger.debug('Mock data was generated', data);

    await Item.truncate();
    logger.info('Collection was emptied');

    const items = await Promise.all(data.map(d => Item.create(d)));
    logger.info('Mock data was saved, %d items', items.length);
    logger.info('Done!');
  } catch (err) {
    logger.error('An error occured. Check out logs');
    logger.debug(err);
  }
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

