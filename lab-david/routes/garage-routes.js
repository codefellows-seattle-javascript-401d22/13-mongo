'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('car:garage-routes');
const Garage = require('../model/garage.js');
const createError = require('http-errors');
const garageRouter = module.exports = new Router();

garageRouter.get('/api/garage/:garageId', (req,res,next) => {
  debug('GET: /api/garage/:garageId');

  Garage.findById(req.params.garageId)
    .then( garage => res.json(garage))
    .catch(err => {
      err = createError(404, 'Not Found');
      next(err);
    });
});

garageRouter.post('/api/garage', jsonParser, (req,res,next) => {
  debug('POST: /api/garage');
  if(!req.body.name) next(createError(400, 'bad request'));
  if(!req.body.datecreated) next(createError(400, 'bad request'));

  req.body.lastmodified = new Date();
  new Garage(req.body).save()
    .then( garage => res.json(garage))
    .catch(next);
});

garageRouter.put('/api/garage', jsonParser, (req,res,next) => {
  debug('PUT: /api/garage');
  if(!req.body._id || !req.body.name || !req.body.datecreated) next(createError(400, 'bad request'));

  req.body.lastmodified = new Date();
  Garage.findByIdAndUpdate(req.body._id, req.body, { new: true })
    .then(garage => {
      res.json(garage);
    })
    .catch(err => {
      err = createError(404, err.message);
      next(err);
    });
});

garageRouter.delete('/api/garage/:garageId', (req,res,next) => {
  debug('DELETE: /api/garage/:garageId');

  Garage.findByIdAndRemove(req.params.garageId)
    .then( () => res.status(204))
    .catch(next);
});