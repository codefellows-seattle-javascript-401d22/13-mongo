'use strict';

const request = require('superagent');
const List = require('../model/list.js');
const PORT = process.env.PORT || 3000;
// const mongoose = require('mongoose');

require('../server.js');
require('jest');

const url = `http://localhost:${PORT}`;
const exampleList = {
  name: 'test list name',
};

describe('List Routes', function () {
  describe('GET: /api/list/:listId', function () {
    describe('with a valid body', function () {
      beforeEach(done => {
        exampleList.timestamp = new Date();
        new List(exampleList).save()
          .then(list => {
            this.tempList = list;
            done();
          })
          .catch(done);
      });
      afterEach(done => {
        delete exampleList.timestamp;
        if (this.tempList) {
          List.remove({})
            .then(() => done())
            .catch(done);
          return;
        }
        done();
      });
      it('should get a list', done => {
        // GET test 200
        request.get(`${url}/api/list/${this.tempList._id}`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test list name');
            done();
          });
      });
    });
    describe('without a valid id', function () {
      it('should give a 404 error', done => {
        // GET test 404
        request.get(`${url}/api/list/1234556`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });

  describe('POST: /api/list', function () {
    describe('with a valid req body', function () {
      afterEach(done => {
        if (this.tempList) {
          List.remove({})
            .then(() => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should return a list', done => {
        // POST test 200
        request.post(`${url}/api/list`)
          .send(exampleList)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(exampleList.name);
            this.tempList = res.body;
            done();
          });
      });
    });

    describe('with no body', function () {
      it('should return a 400 error', done => {
        // POST test 400
        request.post(`${url}/api/list`)
          .send({})
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
      });
    });
  });

  describe('PUT: /api/list/:listId', function () {
    beforeEach(done => {
      exampleList.timestamp = new Date();
      new List(exampleList).save()
        .then(list => {
          this.tempList = list;
          done();
        })
        .catch(done);
    });
    afterEach(done => {
      delete exampleList.timestamp;
      if (this.tempList) {
        List.remove({})
          .then(() => done())
          .catch(done);
        return;
      }
      done();
    });
    describe('with a valid body', () =>{
      it('should return a list', done => {
        // PUT test 200
        request.put(`${url}/api/list/${this.tempList._id}`)
          .send(exampleList)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(exampleList.name);
            this.tempList = res.body;
            done();
          });
      });
    });

    describe('with no body', () => {
      it('should give a 400 error', done => {
        // PUT test 400
        request.put(`${url}/api/list/${this.tempList._id}`)
          .send([])
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(400);
            done();
          });
      });
    });

    describe('with invalid id', function () {
      it('should return a 404 error', done => {
        // PUT test 404
        request.put(`${url}/api/list/123456`)
          .send(exampleList)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });

  describe('routes that haven\'t been registered', function () {
    it('should give a 404 error', done => {
      request.get(`${url}/api/cats`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
});