'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newAppSetting;

describe('AppSetting API:', function() {
  describe('GET /api/appsettings', function() {
    var appsettings;

    beforeEach(function(done) {
      request(app)
        .get('/api/appsettings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          appsettings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      appsettings.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/appsettings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/appsettings')
        .send({
          name: 'New appsettings',
          info: 'This is the brand new appsettings!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAppSetting = res.body;
          done();
        });
    });

    it('should respond with the newly created appsettings', function() {
      newAppSetting.name.should.equal('New appsettings');
      newAppSetting.info.should.equal('This is the brand new appsettings!!!');
    });
  });

  describe('GET /api/appsettings/:id', function() {
    var appsettings;

    beforeEach(function(done) {
      request(app)
        .get(`/api/appsettings/${newAppSetting._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          appsettings = res.body;
          done();
        });
    });

    afterEach(function() {
      appsettings = {};
    });

    it('should respond with the requested appsettings', function() {
      appsettings.name.should.equal('New appsettings');
      appsettings.info.should.equal('This is the brand new appsettings!!!');
    });
  });

  describe('PUT /api/appsettings/:id', function() {
    var updatedAppSetting;

    beforeEach(function(done) {
      request(app)
        .put(`/api/appsettings/${newAppSetting._id}`)
        .send({
          name: 'Updated appsettings',
          info: 'This is the updated appsettings!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAppSetting = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAppSetting = {};
    });

    it('should respond with the updated appsettings', function() {
      updatedAppSetting.name.should.equal('Updated appsettings');
      updatedAppSetting.info.should.equal('This is the updated appsettings!!!');
    });

    it('should respond with the updated appsettings on a subsequent GET', function(done) {
      request(app)
        .get(`/api/appsettings/${newAppSetting._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let appsettings = res.body;

          appsettings.name.should.equal('Updated appsettings');
          appsettings.info.should.equal('This is the updated appsettings!!!');

          done();
        });
    });
  });

  describe('PATCH /api/appsettings/:id', function() {
    var patchedAppSetting;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/appsettings/${newAppSetting._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched appsettings' },
          { op: 'replace', path: '/info', value: 'This is the patched appsettings!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAppSetting = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAppSetting = {};
    });

    it('should respond with the patched appsettings', function() {
      patchedAppSetting.name.should.equal('Patched appsettings');
      patchedAppSetting.info.should.equal('This is the patched appsettings!!!');
    });
  });

  describe('DELETE /api/appsettings/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/appsettings/${newAppSetting._id}`)
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
        .delete(`/api/appsettings/${newAppSetting._id}`)
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
