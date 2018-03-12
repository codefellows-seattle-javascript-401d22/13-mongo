'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('beer:list-route');
const createError = require('http-errors');
const Beer = require('../model/beer.js');
const beerRouter = module.exports = new Router();

beerRouter.get('/api/beer/:beerId', function(req, res, next) {
  debug('GET: /api/beer/beerId');

  Beer.findById(req.params.beerId)
    .then( beer => res.json(beer))
    .catch(err => next(createError(404, err.message)));
});

beerRouter.post('/api/beer', jsonParser, function(req, res, next) {
  debug('POST: /api/beer');
  if(!req.body.name || !req.body.style) {
    return next(createError(400, 'Bad Request'));
  }

  req.body.timestamp = new Date();
  new Beer(req.body).save()
    .then( beer => res.json(beer))
    .catch(err => next(createError(404, err.message)));
});

beerRouter.put('/api/beer/:beerId', jsonParser, function(req, res, next) {
  debug('PUT: /api/beer/beerId');
  if(!req.body.name || !req.body.style) {
    return next(createError(400, 'Bad Request'));
  }
  
  
  req.body.timestamp = new Date();
  Beer.findByIdAndUpdate(req.params.beerId, req.body, {new: true})
    .then( beer => res.json(beer))
    .catch(err => next(createError(404, err.message)));
});

beerRouter.delete('/api/beer/:beerId', function(req, res, next) {
  debug('DELETE: /api/beer/beerId');

  Beer.findByIdAndRemove(req.params.beerId)
    .then( beer => res.json(beer))
    .catch(err => next(createError(404, err.message)));
});