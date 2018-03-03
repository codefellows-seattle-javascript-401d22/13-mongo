'use strict';

const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const debug = require('debug')('doggo:doggo-route');
const Doggo = require('../model/doggo.js');
const router = new Router();

router.get('/api/test', function(req, res) {
  debug('GET /api/test');

  res.send('this test worked');
  res.end();
});

router.get('/api/doggo/:id', function(req, res, next) {
  debug('GET /api/doggo/:id');

  Doggo.findById(req.params.id)
    .then(doggo => {
      console.log('doggo', res.send(doggo), 'res.json(doggo)', res.json(doggo));
      return res.json(doggo);
    })
    .catch(() => {
      res.send('not found').status(404).end();
    });
});

router.post('/api/doggo', bodyParser, function(req, res, next) {
  debug('POST: /api/doggo/');

  new Doggo(req.body).save()
    .then( doggo => res.json(doggo))
    .catch(next);
});

router.put('/api/doggo/:id', bodyParser, function(req, res) {
  debug('PUT: /api/doggo/:id');
  console.log(req.body);

  Doggo.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, doggo) => {
    if (err) throw new Error;
    console.log(doggo);
    return res.send(doggo);
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
      res.status(204).end();
      // ??? won't let me res.send an 'item deleted' and receive as res.text, however on line 63 i do the exact same process and it works. is this a .delete thing?
    });
});

router.get('/api/:anything', function(req, res) {
  res.status(404).send('route not found').end();
});

module.exports = router;