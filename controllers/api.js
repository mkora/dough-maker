const logger = require('../utils/logger');
const Item = require('../models/Item');

// 1. /api/data-groupby?m=1&y=2017&cg=rent
exports.dataGroupBy = (req, res, next) => {
  logger.info('Call data-groupby function');
  const data = {
    success: true,
    data: {
      month: 1,
      year: 2017,
      category: 'rent',
      result: [
        {
          month: 1,
          year: 2017,
          category: 'rent',
          sum: -1200,
        },
      ],
    },
  };
  logger.debug('Returned data', data);
  return res.json(data);
};

// 2. /api/data-details?m=1&y=2017
exports.dataDetails = async (req, res, next) => {
  logger.info('Call data-detail function');
  try {
    const month = req.query.m;
    const year = req.query.y;
    const data = {
      success: true,
      data: {
        month,
        year,
        result: await Item.find({ month, year }),
      },
    };
    logger.debug('Returned data', data);
    return res.json(data);
  } catch (err) {
    return next(err);
  }
};

// 3. /api/data-tableby?y=2017
exports.dataTableBy = (req, res, next) => {
  logger.info('Call data-tableby function');
  const data = {
    success: true,
    data: {
      year: 2017,
      result: [
        {
          _id: {
            category: 'income',
            month: 9,
          },
          sum: 2534,
        },
        {
          _id: {
            category: 'unexpected',
            month: 9,
          },
          sum: 0,
        },
      ],
    },
  };
  logger.debug('Returned data', data);
  return res.json(data);
};

// 4. /api/categories
exports.categories = (req, res) => {
  logger.info('Call categories function');
  const data = {
    success: true,
    data: {
      rent: 'Rent',
      utilities: 'Utilities',
      groceries: 'Groceries',
      stuff: 'Shopping',
      unexpected: 'Unexpected',
      income: 'Income',
    },
  };
  logger.debug('Returned data', data);
  return res.json(data);
};
