'use strict';

var app = require('../..');
import request from 'supertest';
/* globals beforeEach,afterEach, describe,  it */
var newCategory;

describe('Expense API:', function() {
  describe('GET /api/expense', function() {
    var categorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/expense')
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

  describe('POST /api/expense', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/expense')
        .send({
          name: 'New expense',
          info: 'This is the brand new expense!!!'
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

    it('should respond with the newly created expense', function() {
      newCategory.name.should.equal('New expense');
      newCategory.info.should.equal('This is the brand new expense!!!');
    });
  });

  describe('GET /api/expense/:id', function() {
    var category;

    beforeEach(function(done) {
      request(app)
        .get(`/api/expense/${newCategory._id}`)
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

    it('should respond with the requested expense', function() {
      category.name.should.equal('New expense');
      category.info.should.equal('This is the brand new expense!!!');
    });
  });

  describe('PUT /api/expense/:id', function() {
    var updatedCategory;

    beforeEach(function(done) {
      request(app)
        .put(`/api/expense/${newCategory._id}`)
        .send({
          name: 'Updated expense',
          info: 'This is the updated expense!!!'
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

    it('should respond with the updated expense', function() {
      updatedCategory.name.should.equal('Updated expense');
      updatedCategory.info.should.equal('This is the updated expense!!!');
    });

    it('should respond with the updated category on a subsequent GET', function(done) {
      request(app)
        .get(`/api/expense/${newCategory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let category = res.body;

          category.name.should.equal('Updated expense');
          category.info.should.equal('This is the updated expense!!!');

          done();
        });
    });
  });

  describe('PATCH /api/expense/:id', function() {
    var patchedCategory;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/expense/${newCategory._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched expense' },
          { op: 'replace', path: '/info', value: 'This is the patched expense!!!' }
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

    it('should respond with the patched expense', function() {
      patchedCategory.name.should.equal('Patched expense');
      patchedCategory.info.should.equal('This is the patched expense!!!');
    });
  });

  describe('DELETE /api/expense/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/expense/${newCategory._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when category does not exist', function(done) {
      request(app)
        .delete(`/api/expense/${newCategory._id}`)
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
