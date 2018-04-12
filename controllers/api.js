const logger = require('../utils/logger');
const Item = require('../models/Item');
const Category = require('../models/Category');

const validateYear = (year) => {
  if (year > 2000
    && year <= (new Date()).getFullYear()) {
    return parseInt(year, 10);
  }
  throw new Error('Invalid year');
};

const validateMonth = (month) => {
  if (month > 0 && month <= 13) {
    return parseInt(month, 10);
  }
  throw new Error('Invalid month');
};

const validateCategory = async (label) => {
  if (label === undefined) {
    return label;
  }
  const categories = await Category.find();
  if (categories[label] !== undefined) {
    return label;
  }
  throw new Error('Invalid category');
};

// 1. /api/data-groupby?m=1&y=2017&cg=rent
exports.dataGroupBy = async (req, res, next) => {
  logger.info('Call data-groupby function');
  try {
    const month = validateMonth(req.query.m);
    const year = validateYear(req.query.y);
    const category = await validateCategory(req.query.cg);

    let query = {
      month,
      year,
    };
    if (category !== undefined) {
      query = {
        ...query,
        category,
      };
    }

    const data = {
      success: true,
      data: {
        ...query,
        result: await Item.aggregate([
          {
            $match: query,
          },
          {
            $group: {
              _id: null,
              sum: { $sum: { $multiply: ['$sum', '$type'] } },
            },
          },
        ]),
      },
    };
    logger.debug('Returned data', data);
    return res.json(data);
  } catch (err) {
    return next(err);
  }
};

// 2. /api/data-details?m=1&y=2017
exports.dataDetails = async (req, res, next) => {
  logger.info('Call data-detail function');
  try {
    const month = validateMonth(req.query.m);
    const year = validateYear(req.query.y);
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
exports.categories = async (req, res) => {
  logger.info('Call categories function');
  const data = {
    success: true,
    data: await Category.find(),
  };
  logger.debug('Returned data', data);
  return res.json(data);
};
