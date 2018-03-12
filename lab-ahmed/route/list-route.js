'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:list-route');
const List = require('../model/list.js');
const listRouter = module.exports = new Router();

listRouter.get('/api/list/:listId', function(req, res, next) {
  debug('GET: /api/list/:listId');

  List.findById(req.params.listId)
    .then( list => res.json(list))
    .catch(next);
});

listRouter.post('/api/list', jsonParser, function(req, res, next) {
  debug('POST: /api/list');

  req.body.timestamp = new Date();
  new List(req.body).save()
    .then( list => res.json(list))
    .catch(next);
});

listRouter.put('/api/list/:listId', jsonParser, function(req, res, next) {
  debug('PUT: /api/list/:listId');

  if (!req.body.name) next(createError(400, 'Bad request'));

  List.findByIdAndUpdate(req.params.listId, req.body, {new: true})
    .then( list => res.json(list))
    .catch( err => {
      createError(404, err.message);
      next();
    });
});