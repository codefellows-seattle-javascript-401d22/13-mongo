'use strict';
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('food:food-route');
const createError = require('http-errors');
const Food = require('../model/food.js');
const foodRouter = module.exports = new Router();

// http :3000/api/food/5a979e472c577c679758e018
foodRouter.get('/api/food/:foodID', function(req, res, next) {
  debug('GET: /api/food/:foodID');
  if (!req.params.foodID) return next(createError(400, 'expected foodID'));

  Food.findById(req.params.foodID)
    .then( food => res.json(food))
    .catch( err => {
      err = createError(404, 'Not Found');
      next(err);
    });
});

// http :3000/api/food
foodRouter.get('/api/food', function(req, res, next) {
  debug('GET: /api/food');

  Food.find()
    .then( foods => res.json(foods))
    .catch( err => next(err));
});

// http POST :3000/api/food name=pizza price=20
foodRouter.post('/api/food', jsonParser, function(req, res, next) {
  debug('POST: /api/food');
  if (!req.body.name) return next(createError(400, 'expected food name'));
  if (!req.body.price) return next(createError(400, 'expected food price'));

  req.body.timestamp = new Date();
  new Food(req.body).save()
    .then(food => res.json(food))
    .catch( err => next(err));
});



// http PUT :3000/api/food/5a979e472c577c679758e018 name=new food price=100
foodRouter.put('/api/food/:foodID', jsonParser, function(req, res, next) {
  debug('PUT: /api/food/:foodID');
  if (!req.body.name) return next(createError(400, 'expected a request body name'));
  if (!req.body.price) return next(createError(400, 'expected a request body price'));

  Food.findByIdAndUpdate(req.params.foodID, req.body, {new: true})
    .then( food => res.json(food))
    .catch( err => {
      err = createError(404, 'Not Found');
      next(err);
    });
});

// http PUT :3000/api/food name=new food price=100
foodRouter.put('/api/food', function(req, res, next) {
  debug('PUT: /api/food');
  return next(createError(400, 'expected foodID'));
});

// http DELETE :3000/api/food/5a979e472c577c679758e018
foodRouter.delete('/api/food/:foodID', function(req, res, next) {
  debug('DELETE: /api/food/:foodID');

  Food.findByIdAndRemove(req.params.foodID)
    .then( () => {
      res.writeHead(204, {
        'Content-Type': 'application/json',
      });
      res.end();
    })
    .catch( err => {
      err = createError(404, 'Not Found');
      next(err);
    });
});

// http DELETE :3000/api/food
foodRouter.delete('/api/food', function(req, res, next) {
  debug('DELETE: /api/food');
  return next(createError(400, 'expected foodID'));
});

