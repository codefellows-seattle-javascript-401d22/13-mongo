'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('movie:movie-route');
const List = require('../model/list');
const Movie = require('../model/movie');
const createError = require('http-errors');

const movieRouter = module.exports = new Router();

movieRouter.post('/api/list/:listId/movie', jsonParser, function(req, res, next) {
  debug('POST: /api/list/:listId/movie');

  if(!req.params.listId) return next(createError(400, 'bad request'));

  List.findByIdAndAddMovie(req.params.listId, req.body)
    .then( movie => res.json(movie))
    .catch(next);
});

movieRouter.get('/api/movie/:movieId', function(req, res, next) {
  debug('GET: /api/movie/:movieId');

  if(!req.params.movieId) return next(createError(400, 'bad request'));

  Movie.findById(req.params.movieId)
    .populate('movies')
    .then( movie => res.json(movie))
    .catch(next);
});

movieRouter.put('/api/movie/:movieId', jsonParser, function(req, res, next) {
  debug('PUT: /api/movie/:movieId');

  if(!req.params.movieId) return next(createError(400, 'bad request'));

  Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true } )
    .then( movie => res.json(movie))
    .catch( err => {
      if (err.name === 'ValidationError') return next(err);
      next(createError(404, err.message));
    });
});

movieRouter.delete('/api/movie/:movieId', function(req, res, next) {
  debug('DELETE: /api/movie/:movieId');

  Movie.findByIdAndRemove(req.params.movieId)
    .populate('movies')
    .then( () => res.status(204).send())
    .catch( err => {
      return next(createError(404, err.message));
    });
});