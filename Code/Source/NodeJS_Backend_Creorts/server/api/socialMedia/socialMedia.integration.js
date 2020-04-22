'use strict';
/* globals beforeEach,afterEach, describe,  it */
var app = require('../..');
import request from 'supertest';

var newCategory;

describe('SocialMedia API:', function() {
  describe('GET /api/socialMedia', function() {
    var categorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/socialMedia')
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
      categorys.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/socialMedia', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/socialMedia')
        .send({
          name: 'New socialMedia',
          info: 'This is the brand new socialMedia!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCategory = res.body;
          done();
        });
    });

    it('should respond with the newly created socialMedia', function() {
      newCategory.name.should.equal('New socialMedia');
      newCategory.info.should.equal('This is the brand new socialMedia!!!');
    });
  });

  describe('GET /api/socialMedia/:id', function() {
    var category;

    beforeEach(function(done) {
      request(app)
        .get(`/api/socialMedia/${newCategory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          category = res.body;
          done();
        });
    });

    afterEach(function() {
      category = {};
    });

    it('should respond with the requested socialMedia', function() {
      category.name.should.equal('New socialMedia');
      category.info.should.equal('This is the brand new socialMedia!!!');
    });
  });

  describe('PUT /api/socialMedia/:id', function() {
    var updatedCategory;

    beforeEach(function(done) {
      request(app)
        .put(`/api/socialMedia/${newCategory._id}`)
        .send({
          name: 'Updated socialMedia',
          info: 'This is the updated socialMedia!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCategory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCategory = {};
    });

    it('should respond with the updated socialMedia', function() {
      updatedCategory.name.should.equal('Updated socialMedia');
      updatedCategory.info.should.equal('This is the updated socialMedia!!!');
    });

    it('should respond with the updated category on a subsequent GET', function(done) {
      request(app)
        .get(`/api/socialMedia/${newCategory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let category = res.body;

          category.name.should.equal('Updated socialMedia');
          category.info.should.equal('This is the updated socialMedia!!!');

          done();
        });
    });
  });

  describe('PATCH /api/socialMedia/:id', function() {
    var patchedCategory;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/socialMedia/${newCategory._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Category' },
          { op: 'replace', path: '/info', value: 'This is the patched category!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCategory = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCategory = {};
    });

    it('should respond with the patched socialMedia', function() {
      patchedCategory.name.should.equal('Patched socialMedia');
      patchedCategory.info.should.equal('This is the patched socialMedia!!!');
    });
  });

  describe('DELETE /api/socialMedia/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/socialMedia/${newCategory._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when socialMedia does not exist', function(done) {
      request(app)
        .delete(`/api/socialMedia/${newCategory._id}`)
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
