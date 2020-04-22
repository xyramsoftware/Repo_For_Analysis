'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAboutUs;

describe('AboutUs API:', function() {
  describe('GET /api/aboutus', function() {
    var aboutus;

    beforeEach(function(done) {
      request(app)
        .get('/api/aboutus')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          aboutus = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      aboutus.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/aboutus', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/aboutus')
        .send({
          name: 'New aboutus',
          info: 'This is the brand new aboutus!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAboutUs = res.body;
          done();
        });
    });

    it('should respond with the newly created aboutus', function() {
      newAboutUs.name.should.equal('New aboutus');
      newAboutUs.info.should.equal('This is the brand new aboutus!!!');
    });
  });

  describe('GET /api/aboutus/:id', function() {
    var aboutus;

    beforeEach(function(done) {
      request(app)
        .get(`/api/aboutus/${newAboutUs._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          aboutus = res.body;
          done();
        });
    });

    afterEach(function() {
      aboutus = {};
    });

    it('should respond with the requested aboutus', function() {
      aboutus.name.should.equal('New aboutus');
      aboutus.info.should.equal('This is the brand new aboutus!!!');
    });
  });

  describe('PUT /api/aboutus/:id', function() {
    var updatedaboutus;

    beforeEach(function(done) {
      request(app)
        .put(`/api/aboutus/${newAboutUs._id}`)
        .send({
          name: 'Updated aboutus',
          info: 'This is the updated aboutus!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedaboutus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedaboutus = {};
    });

    it('should respond with the updated aboutus', function() {
      updatedaboutus.name.should.equal('Updated aboutus');
      updatedaboutus.info.should.equal('This is the updated aboutus!!!');
    });

    it('should respond with the updated aboutus on a subsequent GET', function(done) {
      request(app)
        .get(`/api/aboutus/${newAboutUs._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let aboutus = res.body;

          aboutus.name.should.equal('Updated aboutus');
          aboutus.info.should.equal('This is the updated aboutus!!!');

          done();
        });
    });
  });

  describe('PATCH /api/aboutus/:id', function() {
    var patchedaboutus;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/aboutus/${newAboutUs._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched aboutus' },
          { op: 'replace', path: '/info', value: 'This is the patched aboutus!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedaboutus = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedaboutus = {};
    });

    it('should respond with the patched aboutus', function() {
      patchedaboutus.name.should.equal('Patched aboutus');
      patchedaboutus.info.should.equal('This is the patched aboutus!!!');
    });
  });

  describe('DELETE /api/aboutus/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/aboutus/${newAboutUs._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when coupon does not exist', function(done) {
      request(app)
        .delete(`/api/aboutus/${newAboutUs._id}`)
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
