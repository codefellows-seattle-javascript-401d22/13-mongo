'use strict';

const request = require('superagent');
const List = require('../model/list');
const Movie = require('../model/movie');
const serverToggle = require('../lib/server-toggle');
const server = require('../server');
const PORT = process.env.PORT || 3000;

require('jest');

const url = `http://localhost:${PORT}`;

const exampleMovie = {
  title: 'test movie',
  starring: 'test actors',
  genre: 'test genre',
};

const exampleList = {
  name: 'test list',
  timestamp: new Date(),
};

describe('Movie Routes', () => {

  beforeAll( done => {
    serverToggle.serverOn(server, done);
  });

  afterAll( done => {
    serverToggle.serverOff(server, done);
  });

  describe('POST: /api/list/:listId/movie', () => {
    describe('with a valid listId and movie body', () => {
      beforeEach( done => {
        new List(exampleList).save()
          .then( list => {
            this.tempList = list;
            done();
          })
          .catch(done);
      });

      afterEach( done => {
        Promise.all([
          List.remove({}),
          Movie.remove({}),
        ])
          .then( () => done())
          .catch(done);
      });

      it('should return a movie', done => {
        request.post(`${url}/api/list/${this.tempList._id}/movie`)
          .send(exampleMovie)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.title).toEqual(exampleMovie.title);
            console.log(res.body);
            expect(res.body.starring).toEqual(exampleMovie.starring);
            expect(res.body.genre).toEqual(exampleMovie.genre);
            expect(res.body.listID).toEqual(this.tempList._id.toString());
            done();
          });
      });
    });
  });
});