'use strict';

const request = require('superagent');
const Beer = require('../model/beer.js');
const PORT = process.env.PORT || 3000;


require('../server.js');
require('jest');

const url = `http://localhost:${PORT}`;
const exampleBeer = {
  name: 'test beer name',
  style: 'test style',
};

const exampleUpdate = {
  name: 'new test beer',
  style: 'new test style',
};

describe('Beer Routes', function() {
  describe('POST: /api/beer', function() {
    describe('with a valid body', function () {
      afterEach( done => {
        if(this.tempBeer) {
          Beer.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should return a beer', done => {
        request.post(`${url}/api/beer`)
          .send(exampleBeer)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test beer name');
            this.tempBeer = res.body;
            done();
          });
      });
    });
    describe('with an invalid body', function () {
      it('should return a 400 status', function(done){
        request.post(`${url}/api/beer`)
          .send({})
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });

      });
    });

  });
  describe('GET: /api/beer/:beerId', function () {
    describe('with a valid body', function() {
      beforeEach( done => {
        exampleBeer.timestamp = new Date();
        new Beer(exampleBeer).save()
          .then( beer => {
            this.tempBeer = beer;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        delete exampleBeer.timestamp;
        if(this.tempBeer) {
          Beer.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should return a beer', done => {
        request.get(`${url}/api/beer/${this.tempBeer._id}`)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test beer name');
            done();
          });
      });
    });
    describe('with an invalid _id', function () {
      it('should return a 404 status', function(done) {
        request.get(`${url}/api/beer/1234`)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
  describe('PUT: /api/beer/beerId', function() {
    describe('with a valid id and body', function() {
      beforeEach( done => {
        exampleBeer.timestamp = new Date();
        new Beer(exampleBeer).save()
          .then( beer => {
            this.tempBeer = beer;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        delete exampleBeer.timestamp;
        if(this.tempBeer) {
          Beer.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should update a beer', done => {
        request.put(`${url}/api/beer/${this.tempBeer._id}`)
          .send(exampleUpdate)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            done();
          });
      });
    });
    describe('with an invalid body', function() {
      beforeEach( done => {
        exampleBeer.timestamp = new Date();
        new Beer(exampleBeer).save()
          .then( beer => {
            this.tempBeer = beer;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        delete exampleBeer.timestamp;
        if(this.tempBeer) {
          Beer.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should return a 400 error', done => {
        request.put(`${url}/api/beer/${this.tempBeer._id}`)
          .send({})
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
      });
    });
    describe('with an invalid id', function() {
      beforeEach( done => {
        exampleBeer.timestamp = new Date();
        new Beer(exampleBeer).save()
          .then( beer => {
            this.tempBeer = beer;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        delete exampleBeer.timestamp;
        if(this.tempBeer) {
          Beer.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should return a 404 status', done => {
        request.put(`${url}/api/beer/1234`)
          .send(exampleUpdate)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
});
            
            