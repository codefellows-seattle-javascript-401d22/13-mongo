'use strict';

const request = require('superagent');
const List = require('../model/list.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

require('../server.js');
require('jest');

const url = `http://localhost:${PORT}`;
const exampleList = {
  name: 'test list name',
}

//POST TEST

describe('List Routes', function() {
  describe('POST: /api/list', function() {
    describe('with a valid request body', function() {
      afterEach( done => {
        if(this.tempList) {
          List.remove({}) //removes EVERYTHING. this is fine for today but  NOT if you're actually working with a filled database
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
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('test list name');
          this.tempList = res.body;
          done();
        });
      });
    });
  });

//GET TEST

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
});