'use strict';

const superagent = require('superagent');
const Doggo = require('../model/doggo.js');
const PORT = process.env.PORT || 3000;

require('../server.js');
require('jest');

const url = `http://localhost:${PORT}`;

describe('Doggo Routes', function() {
  this.doggoId = undefined;

  afterAll( done => {
    Doggo.remove({})
      .then( () => done())
      .catch(done);
    return;
  });

  describe('POST /api/doggo', () => {
    it('should return a doggo', done => {
      superagent.post(`${url}/api/doggo`)
        .send({ name: 'Chloe', age: 4 })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Chloe');
          expect(res.body.age).toEqual(4);
          this.doggoId = res.body._id;
          done();
        });
    });

    it('should respond with a 400 if a valid body is not provided', done => {
      superagent.post(`${url}/api/doggo`)
        .send({ name: 'Chlo' })
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
  });

  describe(`GET /api/doggo/:id`, () => {
    it('should get a doggo', done => {
      superagent.get(`${url}/api/doggo/${this.doggoId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Chloe');
          expect(res.body.age).toEqual(4);
          done();
        });
    });

    it('should respond with a 404 for an id that does not exist', done => {
      superagent.get(`${url}/api/doggo/1234567890`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('not found');
          done();
        });
    });
  });

  describe(`PUT /api/doggo/:id`, () => {
    it('should update a doggo', done => {
      superagent.put(`${url}/api/doggo/${this.doggoId}`)
        .send({ name: 'New Chloe', age: 3})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('New Chloe');
          expect(res.body.age).toEqual(3);
          done();
        });
    });

    it('should respond with a 400 if no body is provided', done => {
      superagent.put(`${url}/api/doggo/${this.doggoId}`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });

    it('should respond with a 404 if the id was not found', done => {
      superagent.put(`${url}/api/doggo/12345678`)
        .send({name: 'Chlo', age: 99})
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('not found');
          done();
        });
    });
  });

  describe(`DELETE /api/doggo/:id`, () => {
    it('should delete a doggo', done => {
      superagent.delete(`${url}/api/doggo/${this.doggoId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(204);
          done();
        });
    });
  });

  describe('GET /:anything', () => {
    it('should respond with a 404 for an invalid route', done => {
      superagent.get(`${url}/api/not-a-thing`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('route not found');
          done();
        });
    });
  });
});