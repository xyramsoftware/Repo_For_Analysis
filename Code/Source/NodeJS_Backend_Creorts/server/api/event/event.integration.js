'use strict';

var app = require('../..');
import request from 'supertest';
/* globals beforeEach,afterEach, describe,  it */
var newEvents;

describe('Events API:', function() {
  describe('GET /api/event', function() {
    var event;

    beforeEach(function(done) {
      request(app)
        .get('/api/event')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          event = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      event.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/event', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/event')
        .send({
          name: 'New Events',
          info: 'This is the brand new Events!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEvents = res.body;
          done();
        });
    });

    it('should respond with the newly created Events', function() {
      newEvents.name.should.equal('New Events');
      newEvents.info.should.equal('This is the brand new Events!!!');
    });
  });

  describe('GET /api/event/:id', function() {
    var event;

    beforeEach(function(done) {
      request(app)
        .get(`/api/event/${newEvents._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          event = res.body;
          done();
        });
    });

    afterEach(function() {
      event = {};
    });

    it('should respond with the requested events', function() {
      event.name.should.equal('New event');
      event.info.should.equal('This is the brand new events!!!');
    });
  });

  describe('PUT /api/event/:id', function() {
    var updatedEvent;

    beforeEach(function(done) {
      request(app)
        .put(`/api/event/${newEvents._id}`)
        .send({
          name: 'Updated Events',
          info: 'This is the updated Events!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEvent = {};
    });

    it('should respond with the updated Events', function() {
      updatedEvent.name.should.equal('Updated Events');
      updatedEvent.info.should.equal('This is the updated Events!!!');
    });

    it('should respond with the updated Events on a subsequent GET', function(done) {
      request(app)
        .get(`/api/event/${newEvents._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let event = res.body;

          event.name.should.equal('Updated Events');
          event.info.should.equal('This is the updated Events!!!');

          done();
        });
    });
  });

  describe('PATCH /api/event/:id', function() {
    var patchedEvent;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/event/${newEvents._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Events' },
          { op: 'replace', path: '/info', value: 'This is the patched Events!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEvent = {};
    });

    it('should respond with the patched Events', function() {
      patchedEvent.name.should.equal('Patched Events');
      patchedEvent.info.should.equal('This is the patched Events!!!');
    });
  });

  describe('DELETE /api/event/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/event/${newEvents._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when events does not exist', function(done) {
      request(app)
        .delete(`/api/event/${newEvents._id}`)
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
