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

//POST TESTS

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

      //POST 400 test not passing
      describe('with no request body', function() {
        it('should respond with bad request', done => {
          request.post(`${url}/api/list`)
            .send({})
            .end((err, res) => {
              // console.log(res.body);
              expect(res.status).toEqual(400);
              done();
            });
        });
      });
    });
  });

  //GET TESTS

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

      //GET 404 test not passing
      describe('with id not found', function() {
        it('should return 404', done => {
          request.get(`${url}/api/list/`)
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });
    });
  });


  // PUT TESTS

  describe('PUT :/api/list/:listId', function() {
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
        if(this.tempList) {
          List.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should return an updated list', done => {
        let updateList = { name: 'test updated list name' };
        console.log('TEST UPDATE:', this.tempList._id);

        request.put(`${url}/api/list/${this.tempList._id}`)
          .send(updateList)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            console.log('RES BODY', res.body);
            expect(res.body._id).toEqual(this.tempList._id.toString());
            expect(res.body.name).toEqual(updateList.name);
            done();
          });
      });
    });
  });
});