'use strict';

var app = require('../..');
import request from 'supertest';

var newRegForm;

describe('RegistrationForm API:', function() {
  describe('GET /api/regforms', function() {
    var regforms;

    beforeEach(function(done) {
      request(app)
        .get('/api/regforms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          regforms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      regforms.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/regforms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/regforms')
        .send({
          name: 'New Registrationforms',
          info: 'This is the brand new Registrationforms!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRegForm = res.body;
          done();
        });
    });

    it('should respond with the newly created Registrationforms', function() {
      newRegForm.name.should.equal('New Registrationforms');
      newRegForm.info.should.equal('This is the brand new Registrationforms!!!');
    });
  });

  describe('GET /api/regforms/:id', function() {
    var regform;

    beforeEach(function(done) {
      request(app)
        .get(`/api/regforms/${newRegForm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          regform = res.body;
          done();
        });
    });

    afterEach(function() {
      regform = {};
    });

    it('should respond with the requested Registrationforms', function() {
      regform.name.should.equal('New Registrationforms');
      regform.info.should.equal('This is the brand new Registrationforms!!!');
    });
  });

  describe('PUT /api/regforms/:id', function() {
    var updatedRegForm;

    beforeEach(function(done) {
      request(app)
        .put(`/api/regforms/${newRegForm._id}`)
        .send({
          name: 'Updated Registrationforms',
          info: 'This is the updated Registrationforms!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRegForm = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRegForm = {};
    });

    it('should respond with the updated Registrationforms', function() {
      updatedRegForm.name.should.equal('Updated Registrationforms');
      updatedRegForm.info.should.equal('This is the updated Registrationforms!!!');
    });

    it('should respond with the updated Registrationforms on a subsequent GET', function(done) {
      request(app)
        .get(`/api/regforms/${newRegForm._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let regform = res.body;

          regform.name.should.equal('Updated Registrationforms');
          regform.info.should.equal('This is the updated Registrationforms!!!');

          done();
        });
    });
  });

  describe('PATCH /api/regforms/:id', function() {
    var patchedregform;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/regforms/${newRegForm._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Registrationforms' },
          { op: 'replace', path: '/info', value: 'This is the patched Registrationforms!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedregform = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedregform = {};
    });

    it('should respond with the patched Registrationforms', function() {
      patchedregform.name.should.equal('Patched Registrationforms');
      patchedregform.info.should.equal('This is the patched Registrationforms!!!');
    });
  });

  describe('DELETE /api/regforms/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/regforms/${newRegForm._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Registrationforms does not exist', function(done) {
      request(app)
        .delete(`/api/regforms/${newRegForm._id}`)
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
