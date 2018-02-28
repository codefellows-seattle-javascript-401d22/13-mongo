'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('weed:list-route');
const List = require('../model/list.js');

const listRouter = module.exports = new Router();

//GET

listRouter.get('/api/list/:listId', function(req, res, next) {
  debug('GET: /api/list/:listId');

  // mongoose method - go to our list collection with this id, grab that list and return it to me
  List.findById(req.params.listId)
  .then( list => res.json(list))
  .catch(next);
});

//POST

listRouter.post('/api/list', jsonParser, function(req, res, next) {
  debug('POST: /api/list');

  req.body.timestamp = new Date();
  new List(req.body).save()
  .then( list => res.json(list))
  .catch(next);
});


