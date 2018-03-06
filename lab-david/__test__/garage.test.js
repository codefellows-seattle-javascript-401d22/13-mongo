'use strict';

const request = require('superagent');
const Garage = require('../model/garage.js');
const PORT = process.env.PORT || 3000;
// const mongoose = require('mongoose');

require('../server.js');
require('jest');

const url = `http://localhost:${PORT}`;
const exampleGarage = {
  name: 'test garage',
  datecreated: new Date(),
};

const updatedGarage = {
  name: 'updated garage',
  datecreated: new Date(),
};

describe('Garage Routes', function(){
  describe('POST: /api/garage', function(){
    describe('with a valid req body', function(){
      afterEach( done => {
        if(this.tempGarage){
          Garage.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should return a garage', done => {
        request.post(`${url}/api/garage`)
          .send(exampleGarage)
          .end((err,res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test garage');
            // expect(res.body.datecreated).toEqual(exampleGarage.datecreated);
            this.tempGarage = res.body;
            done();
          });
      });
    });

    describe('with invalid req body', function(){
      it('should return a 400 bad request error', done => {
        request.post(`${url}/api/garage`)
          .send({})
          .end((err,res) => {
            expect(res.status).toEqual(400);
            expect(err.message).toEqual('Bad Request');
            done();
          });
      });
    });
  });

  describe('GET: /api/garage/:garageId', function(){
    describe('with a valid path', function(){
      beforeEach( done => {
        exampleGarage.lastmodified = new Date();
        new Garage(exampleGarage).save()
          .then( garage => {
            this.tempGarage = garage;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        delete exampleGarage.lastmodified;
        if(this.tempGarage){
          Garage.remove({})
            .then( () => done())
            .catch(done);
          return;
        }
        done();
      });

      it('should return a garage', done => {
        request.get(`${url}/api/garage/${this.tempGarage._id}`)
          .end((err,res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('test garage');
            done();
          });
      });
    });

    describe('with invalid id', function(){
      it('should return a 404 not found error', done => {
        request.get(`${url}/api/garage/1`)
          .end((err,res) => {
            expect(res.status).toEqual(404);
            expect(err.message).toEqual('Not Found');
            done();
          });
      });
    });
  });

  describe('PUT: /api/garage', function(){
    describe('with a valid id and body', function(){
      beforeEach( done => {
        exampleGarage.lastmodified = new Date();
        new Garage(exampleGarage).save()
          .then( garage => {
            this.tempGarage = garage;
            done();
          })
          .catch(done);
      });

      it('should return updated garage', done => {
        updatedGarage._id = this.tempGarage._id;
        request.put(`${url}/api/garage`)
          .send(updatedGarage)
          .end((err,res) => {
            expect(res.status).toEqual(200);
            expect(res.body._id).toEqual(this.tempGarage._id.toString());
            expect(res.body.name).toEqual(updatedGarage.name);
            done();
          });
      });
    });

    describe('with an invalid id or body', function(){
      it('should return a 400 error', done => {
        request.put(`${url}/api/garage`)
          .send()
          .end((err,res) => {
            expect(err.status).toEqual(400);
            expect(res.status).toEqual(400);
            done();
          });
      });

      it('should return a 404 error', done => {
        exampleGarage._id = 1234;
        request.put(`${url}/api/garage`)
          .send(exampleGarage)
          .end((err,res) => {
            expect(err.status).toEqual(404);
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
});