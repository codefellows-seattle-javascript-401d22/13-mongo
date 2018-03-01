'use strict';

const request = require('superagent');
const Food = require('../model/food.js');
const PORT = process.env.PORT || 3000;
// const mongoose = require('mongoose');

require('../server.js');
require('jest');

const url = `http://localhost:${PORT}`;
const exampleFood = {
  name: 'test name',
  price: 999,
};

describe('Food Routes', function() {
  describe('POST: /api/food', function() {
    describe('with a valid req body', function() {
      afterEach( done => {
        if(this.tempFood) {
          Food.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should return a food', done => {
        request.post(`${url}/api/food`)
          .send(exampleFood)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test name');
            this.tempFood = res.body;
            done();
          });
      });

      it('should return a 400 error', done => {
        request.post(`${url}/api/food`)
          .send()
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
      });
    });
  });

  describe('GET: /api/food/:foodID', function() {
    describe('with a valid body', function() {
      beforeEach( done => {
        exampleFood.timestamp = new Date();
        new Food(exampleFood).save()
          .then( food => {
            this.tempFood = food;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        delete exampleFood.timestamp;
        if(this.tempFood) {
          Food.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should return a food', done => {
        request.get(`${url}/api/food/${this.tempFood._id}`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test name');
            done();
          });
      });

      it('should return a 404 error', done => {
        request.get(`${url}/api/food/a979e472c577c679758e018`)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });

  describe('PUT: /api/food/:foodID', function() {
    describe('with a valid id and request.body', function() {
      beforeEach( done => {
        exampleFood.timestamp = new Date();
        new Food(exampleFood).save()
          .then( food => {
            this.tempFood = food;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        delete exampleFood.timestamp;
        if(this.tempFood) {
          Food.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should update and return a food', done => {
        let updateFood = {name: 'updated name', price: 200};
        updateFood.timestamp = '2018-03-01T09:37:08.000Z';
        request.put(`${url}/api/food/${this.tempFood._id}`)
          .send(updateFood)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body._id).toEqual(this.tempFood._id.toString());
            for(var prop in updateFood) {
              expect(res.body[prop]).toEqual(updateFood[prop]);
            }
            done();
          });
      });

      it('should respond with a 404', done => {
        let updateFood = {name: 'updated name 404', price: 404};
        updateFood.timestamp = new Date();
        request.put(`${url}/api/food/404`)
          .send(updateFood)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });

      it('should respond with a 400', done => {
        request.put(`${url}/api/food/${this.tempFood._id}`)
          .send( )
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
      });

    });
  });

  describe('DELETE: /api/food/:foodID', function() {
    describe('with a valid id', function() {
      beforeEach( done => {
        exampleFood.timestamp = new Date();
        new Food(exampleFood).save()
          .then( food => {
            this.tempFood = food;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        delete exampleFood.timestamp;
        if(this.tempFood) {
          Food.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should delete a food', (done) => {
        request.delete(`${url}/api/food/${this.tempFood._id}`)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(204);
            done();
          });
      });


      it('should not delete and return a 404 error', (done) => {
        request.delete(`${url}/api/food/404`)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });

    });
  });

});