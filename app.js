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
  path: '.env.example',
});

/**
 * Controllers (route handlers)
 */
const indexController = require('./controllers/index');

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
 * API examples routes
 */
app.get('/api/index', indexController.index);

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
