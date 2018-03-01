'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = Schema({
  name: {type: String, required: true},
  timestamp: {type: Date, required: true},
  price: Number,
});

module.exports = mongoose.model('food', foodSchema);