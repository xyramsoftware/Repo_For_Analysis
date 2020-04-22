'use strict';

var app = require('../..');
import request from 'supertest';
/* globals beforeEach,afterEach, describe,  it */
var newGallery;

describe('News API:', function() {
  describe('GET /api/gallery', function() {
    var gallery;

    beforeEach(function(done) {
      request(app)
        .get('/api/gallery')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          gallery = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      gallery.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/gallery', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/gallery')
        .send({
          name: 'New gallery',
          info: 'This is the brand new gallery!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newGallery = res.body;
          done();
        });
    });

    it('should respond with the newly created gallery', function() {
      newGallery.name.should.equal('New News');
      newGallery.info.should.equal('This is the brand new gallery!!!');
    });
  });

  describe('GET /api/gallery/:id', function() {
    var gallery;

    beforeEach(function(done) {
      request(app)
        .get(`/api/gallery/${newGallery._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          gallery = res.body;
          done();
        });
    });

    afterEach(function() {
      gallery = {};
    });

    it('should respond with the requested gallery', function() {
      gallery.name.should.equal('New gallery');
      gallery.info.should.equal('This is the brand new gallery!!!');
    });
  });

  describe('PUT /api/gallery/:id', function() {
    var updatedGallery;

    beforeEach(function(done) {
      request(app)
        .put(`/api/gallery/${newGallery._id}`)
        .send({
          name: 'Updated gallery',
          info: 'This is the updated gallery!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedGallery = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGallery = {};
    });

    it('should respond with the updated gallery', function() {
      updatedGallery.name.should.equal('Updated gallery');
      updatedGallery.info.should.equal('This is the updated gallery!!!');
    });

    it('should respond with the updated news on a subsequent GET', function(done) {
      request(app)
        .get(`/api/gallery/${newGallery._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let gallery = res.body;

          gallery.name.should.equal('Updated gallery');
          gallery.info.should.equal('This is the updated gallery!!!');

          done();
        });
    });
  });

  describe('PATCH /api/gallery/:id', function() {
    var patchedGallery;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/gallery/${newGallery._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched gallery' },
          { op: 'replace', path: '/info', value: 'This is the patched gallery!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedGallery = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedGallery = {};
    });

    it('should respond with the patched gallery', function() {
      patchedGallery.name.should.equal('Patched gallery');
      patchedGallery.info.should.equal('This is the patched gallery!!!');
    });
  });

  describe('DELETE /api/gallery/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/gallery/${newGallery._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when news does not exist', function(done) {
      request(app)
        .delete(`/api/gallery/${newGallery._id}`)
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
