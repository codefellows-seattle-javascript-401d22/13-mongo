'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = Schema({
  title: { type: String, required: true },
  starring: { type: String, required: true },
  genre: { type: String, required: true },
  listID: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('movie', movieSchema);