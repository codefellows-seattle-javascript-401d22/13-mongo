'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beerSchema = Schema({
  name: { type: String, required: true},
  style: { type: String, required: true},
  timestamp: { type: Date, required: true},
});

module.exports = mongoose.model('beer', beerSchema);