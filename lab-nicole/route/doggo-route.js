'use strict';

const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const debug = require('debug')('doggo:doggo-route');
const Doggo = require('../model/doggo.js');
const router = new Router();

router.get('/api/doggo/:id', function(req, res, next) {
  debug('GET /api/doggo/:id');

  Doggo.findById(req.params.id)
    .then(doggo => {
      if (!doggo) return res.sendStatus(404);
      res.json(doggo);
    })
    .catch(err => {
      res.sendStatus(400);
      next(err);
    });
});

router.post('/api/doggo', bodyParser, function(req, res, next) {
  debug('POST: /api/doggo/');
  if (req.body.name === undefined || req.body.age === undefined) {
    res.sendStatus(400);
    return;
  }

  new Doggo(req.body).save()
    .then( doggo => res.json(doggo))
    .catch(next);
});

router.put('/api/doggo/:id', bodyParser, function(req, res, next) {
  debug('PUT: /api/doggo/:id');
  if (req.body.name === undefined || req.body.age === undefined) {
    res.sendStatus(400);
    return;
  }
  console.log('request body', req.body);
  Doggo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then( doggo => res.send(doggo))
    .catch( err => {
      res.sendStatus(404);
      next(err);
    });
  
});

router.delete('/api/doggo/:id', function(req, res) {
  debug('DELETE: /api/doggo/:id');
  console.log('delete id', req.params.id);

  Doggo.findByIdAndRemove(req.params.id)
    .then(() => {
      res.sendStatus(204);
    });
});

router.get('/api/:anything', function(req, res) {
  res.sendStatus(404);
});

module.exports = router;