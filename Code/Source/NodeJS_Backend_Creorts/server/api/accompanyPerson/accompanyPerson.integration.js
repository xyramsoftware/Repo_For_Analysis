'use strict';

var app = require('../..');
import request from 'supertest';
/* globals beforeEach,afterEach, describe,  it */
var newAccompanyPerson;

describe('AccompanyPerson API:', function() {
  describe('GET /api/accompanies', function() {
    var accompany;

    beforeEach(function(done) {
      request(app)
        .get('/api/accompanies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          accompany = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      accompany.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/accompanies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/accompanies')
        .send({
          name: 'New accompany',
          info: 'This is the brand new accompany!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAccompanyPerson = res.body;
          done();
        });
    });

    it('should respond with the newly created accompany', function() {
      newAccompanyPerson.name.should.equal('New accompany');
      newAccompanyPerson.info.should.equal('This is the brand new accompany!!!');
    });
  });

  describe('GET /api/accompanies/:id', function() {
    var accompany;

    beforeEach(function(done) {
      request(app)
        .get(`/api/accompanies/${newAccompanyPerson._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          accompany = res.body;
          done();
        });
    });

    afterEach(function() {
      accompany = {};
    });

    it('should respond with the requested accompany', function() {
      accompany.name.should.equal('New event');
      accompany.info.should.equal('This is the brand new accompany!!!');
    });
  });

  describe('PUT /api/accompanies/:id', function() {
    var updatedAccompanyPerson;

    beforeEach(function(done) {
      request(app)
        .put(`/api/accompanies/${newAccompanyPerson._id}`)
        .send({
          name: 'Updated accompany',
          info: 'This is the updated accompany!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAccompanyPerson = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAccompanyPerson = {};
    });

    it('should respond with the updated accompany', function() {
      updatedAccompanyPerson.name.should.equal('Updated accompany');
      updatedAccompanyPerson.info.should.equal('This is the updated accompany!!!');
    });

    it('should respond with the updated accompany on a subsequent GET', function(done) {
      request(app)
        .get(`/api/accompanies/${newAccompanyPerson._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let accompany = res.body;

          accompany.name.should.equal('Updated accompany');
          accompany.info.should.equal('This is the updated accompany!!!');

          done();
        });
    });
  });

  describe('PATCH /api/accompanies/:id', function() {
    var patchedAccompanyPerson;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/accompanies/${newAccompanyPerson._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched accompany' },
          { op: 'replace', path: '/info', value: 'This is the patched accompany!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAccompanyPerson = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAccompanyPerson = {};
    });

    it('should respond with the patched accompany', function() {
      patchedAccompanyPerson.name.should.equal('Patched accompany');
      patchedAccompanyPerson.info.should.equal('This is the patched accompany!!!');
    });
  });

  describe('DELETE /api/accompanies/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/accompanies/${newAccompanyPerson._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when accompany does not exist', function(done) {
      request(app)
        .delete(`/api/accompanies/${newAccompanyPerson._id}`)
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
