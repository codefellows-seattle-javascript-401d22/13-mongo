'use strict';

const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const debug = require('debug')('doggo:doggo-route');
const Doggo = require('../model/doggo.js');
const router = new Router();

router.get('/api/doggo/:id', function(req, res, next) {
  debug('GET /api/doggo/:id');

  Doggo.findById(req.params.id)
    .then(doggo => res.json(doggo))
    .catch(err => {
      res.writeHead(404);
      res.write('not found');
      res.end();
      next(err);
    });
});

router.post('/api/doggo', bodyParser, function(req, res, next) {
  debug('POST: /api/doggo/');
  if (req.body.name === undefined || req.body.age === undefined) {
    res.status(400);
    res.write('bad request');
    res.end();
    return;
  }

  new Doggo(req.body).save()
    .then( doggo => res.json(doggo))
    .catch(next);
});

router.put('/api/doggo/:id', bodyParser, function(req, res, next) {
  debug('PUT: /api/doggo/:id');
  if (req.body.name === undefined || req.body.age === undefined) {
    res.status(400);
    res.send('bad request');
    res.end();
    return;
  }
  Doggo.findById(req.params.id)
    .then( () => {
      Doggo.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, doggo) => {
        console.log(doggo);
        return res.send(doggo);
      });
    })
    .catch( err => {
      res.status(404);
      res.write('not found');
      res.end();
      next(err);
    });
  
});

router.delete('/api/doggo/:id', function(req, res) {
  debug('DELETE: /api/doggo/:id');
  console.log('delete id', req.params.id);

  Doggo.remove((err) => {
    if (err) throw new Error(err);
    Doggo.findById(req.params.id, (err, doggo) => {
      console.log('doggo', doggo);
    });
  })
    .then(() => {
      res.status(204);
      res.end();
      // ??? won't let me res.send an 'item deleted' and receive as res.text, however on line 63 i do the exact same process and it works. is this a .delete thing?
    });
});

router.get('/api/:anything', function(req, res) {
  res.status(404).send('route not found').end();
});

module.exports = router;