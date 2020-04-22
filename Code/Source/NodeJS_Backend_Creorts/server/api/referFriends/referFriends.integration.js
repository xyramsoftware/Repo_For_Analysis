'use strict';
/* globals beforeEach,afterEach, describe,  it */
var app = require('../..');
import request from 'supertest';

var newCategory;

describe('ReferFriend API:', function() {
  describe('GET /api/referFriends', function() {
    var categorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/referFriends')
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

  describe('POST /api/referFriends', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/referFriends')
        .send({
          name: 'New referFriends',
          info: 'This is the brand new referFriends!!!'
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

    it('should respond with the newly created referFriends', function() {
      newCategory.name.should.equal('New referFriends');
      newCategory.info.should.equal('This is the brand new referFriends!!!');
    });
  });

  describe('GET /api/referFriends/:id', function() {
    var category;

    beforeEach(function(done) {
      request(app)
        .get(`/api/referFriends/${newCategory._id}`)
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

    it('should respond with the requested referFriends', function() {
      category.name.should.equal('New referFriends');
      category.info.should.equal('This is the brand new referFriends!!!');
    });
  });

  describe('PUT /api/referFriends/:id', function() {
    var updatedCategory;

    beforeEach(function(done) {
      request(app)
        .put(`/api/referFriends/${newCategory._id}`)
        .send({
          name: 'Updated referFriends',
          info: 'This is the updated referFriends!!!'
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

    it('should respond with the updated referFriends', function() {
      updatedCategory.name.should.equal('Updated referFriends');
      updatedCategory.info.should.equal('This is the updated referFriends!!!');
    });

    it('should respond with the updated referFriends on a subsequent GET', function(done) {
      request(app)
        .get(`/api/referFriends/${newCategory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let category = res.body;

          category.name.should.equal('Updated referFriends');
          category.info.should.equal('This is the updated referFriends!!!');

          done();
        });
    });
  });

  describe('PATCH /api/referFriends/:id', function() {
    var patchedCategory;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/referFriends/${newCategory._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched referFriends' },
          { op: 'replace', path: '/info', value: 'This is the patched referFriends!!!' }
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

    it('should respond with the patched referFriends', function() {
      patchedCategory.name.should.equal('Patched referFriends');
      patchedCategory.info.should.equal('This is the patched referFriends!!!');
    });
  });

  describe('DELETE /api/referFriends/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/referFriends/${newCategory._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when referFriends does not exist', function(done) {
      request(app)
        .delete(`/api/referFriends/${newCategory._id}`)
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
