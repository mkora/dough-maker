const mongoose = require('mongoose');

// Define schema
const { Schema } = mongoose;

const ItemSchema = new Schema({
  month: {
    type: Number,
    min: 1,
    max: 12,
    required: true,
  },
  year: {
    type: Number,
    min: 2000,
    max: 2030,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    enum: [-1, 1],
    required: true,
  },
  category: String,
  title: {
    type: String,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
});

// Compile model from schema
const Item = mongoose.model('Items', ItemSchema);
module.exports = Item;

/**
 * @function [truncate]
 * @returns Promise
 */
module.exports.truncate = () =>
  Item.remove({}).exec();

