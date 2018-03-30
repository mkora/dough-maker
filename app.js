const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const logger = require('./utils/logger');

/**
 * Load environment variables from .env file
 * where API keys and passwords are configured
 */
dotenv.load({
  path: '.env',
});

/**
 * Controllers (route handlers)
 */
const apiController = require('./controllers/api');

/**
 * Create Express server
 */
const app = express();

/**
 * Configure Express
 */
app.set('port', process.env.PORT || 3030);
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cors({
  exposedHeaders: ['Link'],
}));
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/build'));
}

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

/**
 * Test app
 */
app.get('/pulse', (req, res) => {
  logger.debug('It works!');
  res.status(200);
  // send json
  return res.json({
    ok: true,
    data: 'It works!',
  });
});

/**
 * API routes
 */
// 1. Get a sum that was spend/earn on a specified month
app.get('/api/data-groupby', apiController.dataGroupBy);

// 2. Get a list of all transactions that were made on a specified month
app.get('/api/data-details', apiController.dataDetails);

// 3. Get a table of all sums by categories and/or years and/or months
app.get('/api/data-tableby', apiController.dataTableBy);

// 4. Get a full list of categories
app.get('/api/categories', apiController.categories);

/**
 * Error Handler
 */
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler({
  log: (err, str, req, res) => {
    logger.error(str, err, req);
    res.status(err.code || 500);
  },
}));

module.exports = app;
