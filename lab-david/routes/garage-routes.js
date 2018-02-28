'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('car:garage-routes');
const Garage = require('../model/garage.js');
const garageRouter = module.exports = new Router();

garageRouter.get('/api/garage/:garageId', (req,res,next) => {
  debug('GET: /api/garage/:garageId');

  Garage.findById(req.params.garageId)
    .then( garage => res.json(garage))
    .catch(next);
});

garageRouter.post('/api/garage', jsonParser, (req,res,next) => {
  debug('POST: /api/garage');

  req.body.lastmodified = new Date();
  new Garage(req.body).save()
    .then( garage => res.json(garage))
    .catch(next);
});

garageRouter.put('/api/garage/', jsonParser, (req,res,next) => {
  debug('PUT: /api/garage');

  req.body.lastmodified = new Date();
  Garage.findByIdAndUpdate(req.body._id, req.body)
    .then(garage => res.json(garage))
    .catch(next);
});

garageRouter.delete('/api/garage/:garageId', (req,res,next) => {
  debug('DELETE: /api/garage/:garageId');

  Garage.findByIdAndRemove(req.params.garageId)
    .then( () => res.status(204))
    .catch(next);
});