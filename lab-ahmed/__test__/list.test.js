'use strict';

const request = require('superagent');
const List = require('../model/list.js');
const PORT = process.env.PORT || 3000;

require('../server.js');
require('jest');

const url = `http://localhost:${PORT}`;
const exampleList = {
  name: 'test list name',
};

describe('List Routes', function() {
  describe('POST: /api/list', function() {
    describe('with a valid req body', function() {
      afterEach( done => {
        if (this.tempList) {
          List.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should return a list', done => {
        request.post(`${url}/api/list`)
          .send(exampleList)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test list name');
            this.tempList = res.body;
            done();
          });
      });
    });
  });

  describe('GET: /api/list/:listId', function() {
    describe('with a valid body', function() {
      beforeEach( done => {
        exampleList.timestamp = new Date();
        new List(exampleList).save()
          .then( list => {
            this.tempList = list;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        delete exampleList.timestamp;
        if (this.tempList) {
          List.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should return a list', done => {
        request.get(`${url}/api/list/${this.tempList._id}`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test list name');
            done();
          });
      });
    });
  });

  describe('PUT: /api/list/:listId', function() {
    describe('with a valid id & request body', function() {
      beforeEach( done => {
        exampleList.timestamp = new Date();
        new List(exampleList).save()
          .then( list => {
            this.tempList = list;
            done();
          })
          .catch(done);
      });
      it('update a list', done => {
        exampleList.name = 'Updated list';
        request.put(`${url}/api/list/${this.tempList._id}`)
          .send(exampleList)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            done();
          });
      });
    });
    describe('no request body', function() {
      beforeEach( done => {
        exampleList.timestamp = new Date();
        new List(exampleList).save()
          .then( list => {
            this.tempList = list;
            done();
          })
          .catch(done);
      });
      it('return a 400 error', done => {
        request.put(`${url}/api/list/${this.tempList._id}`)
          .send({})
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
      });
    });
    describe('with an invalid id', function() {
      it('return a 404 error', done => {
        request.put(`${url}/api/list/abc`)
          .send(exampleList)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
});