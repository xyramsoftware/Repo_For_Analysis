'use strict';

var app = require('../..');
import request from 'supertest';
/* globals beforeEach,afterEach, describe,  it */
var newCategory;

describe('EventType API:', function() {
  describe('GET /api/type', function() {
    var categorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/type')
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

  describe('POST /api/type', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/type')
        .send({
          name: 'New type',
          info: 'This is the brand new type!!!'
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

    it('should respond with the newly created type', function() {
      newCategory.name.should.equal('New type');
      newCategory.info.should.equal('This is the brand new type!!!');
    });
  });

  describe('GET /api/type/:id', function() {
    var category;

    beforeEach(function(done) {
      request(app)
        .get(`/api/type/${newCategory._id}`)
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

    it('should respond with the requested type', function() {
      category.name.should.equal('New type');
      category.info.should.equal('This is the brand new type!!!');
    });
  });

  describe('PUT /api/type/:id', function() {
    var updatedCategory;

    beforeEach(function(done) {
      request(app)
        .put(`/api/type/${newCategory._id}`)
        .send({
          name: 'Updated type',
          info: 'This is the updated type!!!'
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

    it('should respond with the updated type', function() {
      updatedCategory.name.should.equal('Updated type');
      updatedCategory.info.should.equal('This is the updated type!!!');
    });

    it('should respond with the updated type on a subsequent GET', function(done) {
      request(app)
        .get(`/api/type/${newCategory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let category = res.body;

          category.name.should.equal('Updated type');
          category.info.should.equal('This is the updated type!!!');

          done();
        });
    });
  });

  describe('PATCH /api/type/:id', function() {
    var patchedCategory;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/type/${newCategory._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched type' },
          { op: 'replace', path: '/info', value: 'This is the patched type!!!' }
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

    it('should respond with the patched type', function() {
      patchedCategory.name.should.equal('Patched type');
      patchedCategory.info.should.equal('This is the patched type!!!');
    });
  });

  describe('DELETE /api/type/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/type/${newCategory._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when type does not exist', function(done) {
      request(app)
        .delete(`/api/type/${newCategory._id}`)
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
