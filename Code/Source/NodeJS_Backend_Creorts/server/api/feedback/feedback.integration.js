'use strict';

var app = require('../..');
import request from 'supertest';
/* globals beforeEach,afterEach, describe,  it */
var newFeedback;

describe('Feedback API:', function() {
  describe('GET /api/feedback', function() {
    var feedback;

    beforeEach(function(done) {
      request(app)
        .get('/api/feedback')
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

  describe('POST /api/feedback', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/feedback')
        .send({
          name: 'New feedback',
          info: 'This is the brand new feedback!!!'
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

    it('should respond with the newly created feedback', function() {
      newFeedback.name.should.equal('New feedback');
      newFeedback.info.should.equal('This is the brand new feedback!!!');
    });
  });

  describe('GET /api/feedback/:id', function() {
    var feedback;

    beforeEach(function(done) {
      request(app)
        .get(`/api/feedback/${newFeedback._id}`)
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

    it('should respond with the requested feedback', function() {
      feedback.name.should.equal('New feedback');
      feedback.info.should.equal('This is the brand new feedback!!!');
    });
  });

  describe('PUT /api/feedback/:id', function() {
    var updatedfeedback;

    beforeEach(function(done) {
      request(app)
        .put(`/api/feedback/${newFeedback._id}`)
        .send({
          name: 'Updated feedback',
          info: 'This is the updated feedback!!!'
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

    it('should respond with the updated feedback', function() {
      updatedfeedback.name.should.equal('Updated feedback');
      updatedfeedback.info.should.equal('This is the updated feedback!!!');
    });

    it('should respond with the updated pickups on a subsequent GET', function(done) {
      request(app)
        .get(`/api/feedback/${newFeedback._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let feedback = res.body;

          feedback.name.should.equal('Updated feedback');
          feedback.info.should.equal('This is the updated feedback!!!');

          done();
        });
    });
  });

  describe('PATCH /api/feedback/:id', function() {
    var patchedfeedback;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/feedback/${newFeedback._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched feedback' },
          { op: 'replace', path: '/info', value: 'This is the patched feedback!!!' }
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

    it('should respond with the patched feedback', function() {
      patchedfeedback.name.should.equal('Patched feedback');
      patchedfeedback.info.should.equal('This is the patched feedback!!!');
    });
  });

  describe('DELETE /api/feedback/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/feedback/${newFeedback._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when feedback does not exist', function(done) {
      request(app)
        .delete(`/api/pickups/${newFeedback._id}`)
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
