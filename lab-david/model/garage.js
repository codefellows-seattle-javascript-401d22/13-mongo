'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const garageSchema = Schema({
  name: { type: String, required: true },
  datecreated: { type: Date, required: true},
  lastmodified: Date,
});

module.exports = mongoose.model('garage', garageSchema);