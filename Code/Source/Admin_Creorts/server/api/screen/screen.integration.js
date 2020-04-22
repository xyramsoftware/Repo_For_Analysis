'use strict';

var app = require('../..');
import request from 'supertest';

var newScreen;

describe('Screen API:', function() {
  describe('GET /api/screens', function() {
    var screens;

    beforeEach(function(done) {
      request(app)
        .get('/api/screens')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          categorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      screens.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/screens', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/screens')
        .send({
          name: 'New Screens',
          info: 'This is the brand new screen!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newScreen = res.body;
          done();
        });
    });

    it('should respond with the newly created screens', function() {
      newScreen.name.should.equal('New screens');
      newScreen.info.should.equal('This is the brand new screens!!!');
    });
  });

  describe('GET /api/screens/:id', function() {
    var screen;

    beforeEach(function(done) {
      request(app)
        .get(`/api/screens/${newScreen._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          screen = res.body;
          done();
        });
    });

    afterEach(function() {
      screen = {};
    });

    it('should respond with the requested screen', function() {
      screen.name.should.equal('New screen');
      screen.info.should.equal('This is the brand new screen!!!');
    });
  });

  describe('PUT /api/screens/:id', function() {
    var updatedScreen;

    beforeEach(function(done) {
      request(app)
        .put(`/api/screens/${newScreen._id}`)
        .send({
          name: 'Updated screens',
          info: 'This is the updated screens!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedScreen= res.body;
          done();
        });
    });

    afterEach(function() {
      updatedScreen = {};
    });

    it('should respond with the updated Screen', function() {
      updatedScreen.name.should.equal('Updated Screen');
      updatedScreen.info.should.equal('This is the updated Screen!!!');
    });

    it('should respond with the updated Screen on a subsequent GET', function(done) {
      request(app)
        .get(`/api/screens/${newScreen._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let screen = res.body;

          screen.name.should.equal('Updated screen');
          screen.info.should.equal('This is the updated screen!!!');

          done();
        });
    });
  });

  describe('PATCH /api/screens/:id', function() {
    var patchedCategory;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/screens/${newScreen._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched screens' },
          { op: 'replace', path: '/info', value: 'This is the patched screens!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedScreen = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedScreen = {};
    });

    it('should respond with the patched Screen', function() {
      patchedScreen.name.should.equal('Patched Screen');
      patchedScreen.info.should.equal('This is the patched Screen!!!');
    });
  });

  describe('DELETE /api/screens/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/screens/${newScreen._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when screen does not exist', function(done) {
      request(app)
        .delete(`/api/screens/${newScreen._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
