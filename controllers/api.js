const logger = require('../utils/logger');

// 1. /api/data-groupby?m=1&y=2017&cg=rent
exports.dataGroupBy = (req, res) => {
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
exports.dataDetails = (req, res) => {
  logger.info('Call data-detail function');
  const data = {
    success: true,
    data: {
      month: 1,
      year: 2017,
      result: [
        {
          month: 1,
          year: 2017,
          date: 1485216000,
          type: -1,
          category: 'groceries',
          title: 'Groceries title #1',
          sum: 79,
        },
      ],
    },
  };
  logger.debug('Returned data', data);
  return res.json(data);
};

// 3. /api/data-tableby?y=2017
exports.dataTableBy = (req, res) => {
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
