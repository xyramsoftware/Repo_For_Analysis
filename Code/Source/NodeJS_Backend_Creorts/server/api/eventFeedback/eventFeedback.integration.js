'use strict';

var app = require('../..');
import request from 'supertest';
/* globals beforeEach,afterEach, describe,  it */
var newFeedback;

describe('EventFeedback API:', function() {
  describe('GET /api/eventfeedback', function() {
    var feedback;

    beforeEach(function(done) {
      request(app)
        .get('/api/eventfeedback')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          feedback = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      feedback.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/eventfeedback', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/eventfeedback')
        .send({
          name: 'New eventfeedback',
          info: 'This is the brand new eventfeedback!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newFeedback = res.body;
          done();
        });
    });

    it('should respond with the newly created eventfeedback', function() {
      newFeedback.name.should.equal('New eventfeedback');
      newFeedback.info.should.equal('This is the brand new eventfeedback!!!');
    });
  });

  describe('GET /api/eventfeedback/:id', function() {
    var feedback;

    beforeEach(function(done) {
      request(app)
        .get(`/api/eventfeedback/${newFeedback._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          feedback = res.body;
          done();
        });
    });

    afterEach(function() {
      feedback = {};
    });

    it('should respond with the requested eventfeedback', function() {
      feedback.name.should.equal('New eventfeedback');
      feedback.info.should.equal('This is the brand new eventfeedback!!!');
    });
  });

  describe('PUT /api/eventfeedback/:id', function() {
    var updatedfeedback;

    beforeEach(function(done) {
      request(app)
        .put(`/api/eventfeedback/${newFeedback._id}`)
        .send({
          name: 'Updated eventfeedback',
          info: 'This is the updated eventfeedback!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedfeedback = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedfeedback = {};
    });

    it('should respond with the updated eventfeedback', function() {
      updatedfeedback.name.should.equal('Updated eventfeedback');
      updatedfeedback.info.should.equal('This is the updated eventfeedback!!!');
    });

    it('should respond with the updated pickups on a subsequent GET', function(done) {
      request(app)
        .get(`/api/eventfeedback/${newFeedback._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let feedback = res.body;

          feedback.name.should.equal('Updated eventfeedback');
          feedback.info.should.equal('This is the updated eventfeedback!!!');

          done();
        });
    });
  });

  describe('PATCH /api/eventfeedback/:id', function() {
    var patchedfeedback;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/eventfeedback/${newFeedback._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched eventfeedback' },
          { op: 'replace', path: '/info', value: 'This is the patched eventfeedback!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedfeedback = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedfeedback = {};
    });

    it('should respond with the patched eventfeedback', function() {
      patchedfeedback.name.should.equal('Patched eventfeedback');
      patchedfeedback.info.should.equal('This is the patched eventfeedback!!!');
    });
  });

  describe('DELETE /api/eventfeedback/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/eventfeedback/${newFeedback._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when eventfeedback does not exist', function(done) {
      request(app)
        .delete(`/api/eventfeedback/${newFeedback._id}`)
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
