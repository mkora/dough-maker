const {
  createLogger,
  format,
  transports,
} = require('winston');

const {
  splat,
  combine,
  prettyPrint,
} = format;

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'error',
  format: combine(
    splat(),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
