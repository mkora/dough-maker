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
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    splat(),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports = logger;
