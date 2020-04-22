'use strict';

var app = require('../..');
import request from 'supertest';
/* globals beforeEach,afterEach, describe,  it */
var newEventDate;

describe('EventDate API:', function() {
  describe('GET /api/dates', function() {
    var eventDates;

    beforeEach(function(done) {
      request(app)
        .get('/api/dates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          eventDates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      eventDates.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/dates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/dates')
        .send({
          name: 'New eventDates',
          info: 'This is the brand new eventDates!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEventDate = res.body;
          done();
        });
    });

    it('should respond with the newly created eventDates', function() {
      newEventDate.name.should.equal('New eventDates');
      newEventDate.info.should.equal('This is the brand new eventDates!!!');
    });
  });

  describe('GET /api/dates/:id', function() {
    var EventDate;

    beforeEach(function(done) {
      request(app)
        .get(`/api/dates/${newEventDate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          EventDate = res.body;
          done();
        });
    });

    afterEach(function() {
      EventDate = {};
    });

    it('should respond with the requested EventDate', function() {
      EventDate.name.should.equal('New EventDate');
      EventDate.info.should.equal('This is the brand new EventDate!!!');
    });
  });

  describe('PUT /api/dates/:id', function() {
    var updatedEventDate;

    beforeEach(function(done) {
      request(app)
        .put(`/api/dates/${newEventDate._id}`)
        .send({
          name: 'Updated Category',
          info: 'This is the updated EventDate!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEventDate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEventDate = {};
    });

    it('should respond with the updated EventDate', function() {
      updatedEventDate.name.should.equal('Updated EventDate');
      updatedEventDate.info.should.equal('This is the updated EventDate!!!');
    });

    it('should respond with the updated EventDate on a subsequent GET', function(done) {
      request(app)
        .get(`/api/dates/${newEventDate._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let EventDate = res.body;

          EventDate.name.should.equal('Updated EventDate');
          EventDate.info.should.equal('This is the updated EventDate!!!');

          done();
        });
    });
  });

  describe('PATCH /api/dates/:id', function() {
    var patchedEventDate;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/dates/${newEventDate._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched EventDate' },
          { op: 'replace', path: '/info', value: 'This is the patched EventDate!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEventDate = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEventDate = {};
    });

    it('should respond with the patched EventDate', function() {
      patchedEventDate.name.should.equal('Patched EventDate');
      patchedEventDate.info.should.equal('This is the patched EventDate!!!');
    });
  });

  describe('DELETE /api/dates/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/dates/${newEventDate._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when EventDate does not exist', function(done) {
      request(app)
        .delete(`/api/dates/${newEventDate._id}`)
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
