'use strict';

const mongoose = require('mongoose');
const debug = require('debug')('movie:list');
const createError = require('http-errors');
const Schema = mongoose.Schema;
const Movie = require('./movie');

const listSchema = Schema({
  name: { type: String, required: true },
  timestamp: { type: Date },
  movies: [{ type:Schema.Types.ObjectId, ref: 'movie' }],
});

const List = module.exports = mongoose.model('list', listSchema);

List.findByIdAndAddMovie = function(id, movie) {
  debug('Find by ID and add Movie');

  return List.findById(id)
    .then( list => {
      movie.listID = list._id;
      this.tempList = list;
      return new Movie(movie).save();
    })
    .then( movie => {
      this.tempList.movies.push(movie._id);
      this.tempMovie = movie;
      return this.tempList.save();
    })
    .then( () => {
      return this.tempMovie;
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

