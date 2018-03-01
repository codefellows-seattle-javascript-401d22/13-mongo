'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('weed:list-route');
const List = require('../model/list.js');
const createError = require('http-errors');

const listRouter = module.exports = new Router();


//GET

listRouter.get('/api/list/:listId', function(req, res, next) {
  debug('GET: /api/list/:listId');

  // mongoose method - go to our list collection with this id, grab that list and return it to me
  List.findById(req.params.listId)
    .then( list => res.json(list))
    .catch( err => next(err));
});

listRouter.get('/api/list', function(req, res) {
  debug('GET: /api/list');

  res.status(404).send('not found');
});


//POST

listRouter.post('/api/list', jsonParser, function(req, res, next) {
  debug('POST: /api/list');
  
  if(req.body === {})
    res.status(400).send('bad request');

  req.body.timestamp = new Date();
  new List(req.body).save()
    .then( list => res.json(list))
    .catch( err => next(err));
});

//PUT //check up on this

listRouter.put('/api/list/:listId', jsonParser, function(req, res, next) {
  debug('PUT: /api/list/:listId');

  List.findByIdAndUpdate(req.params.listId, req.body, {new: true})
    .then( list => res.json(list))
    .catch(next);
});


//DELETE

listRouter.delete('/api/list/:listId', function(req, res, next) {
  debug('DELETE: /api/list/:listId');

  List.findByIdAndRemove(req.params.listId)
    .catch(next);
});

