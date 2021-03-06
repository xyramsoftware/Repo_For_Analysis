'use strict';
/* globals beforeEach,afterEach, describe,  it */
var app = require('../..');
import request from 'supertest';

var newWishlist;

describe('Wishlist API:', function() {
  describe('GET /api/wishlists', function() {
    var wishlists;

    beforeEach(function(done) {
      request(app)
        .get('/api/wishlists')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          wishlists = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      wishlists.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/wishlists', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/wishlists')
        .send({
          name: 'New Wishlist',
          info: 'This is the brand new wishlist!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newWishlist = res.body;
          done();
        });
    });

    it('should respond with the newly created wishlist', function() {
      newWishlist.name.should.equal('New Wishlist');
      newWishlist.info.should.equal('This is the brand new wishlist!!!');
    });
  });

  describe('GET /api/wishlists/:id', function() {
    var wishlist;

    beforeEach(function(done) {
      request(app)
        .get(`/api/wishlists/${newWishlist._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          wishlist = res.body;
          done();
        });
    });

    afterEach(function() {
      wishlist = {};
    });

    it('should respond with the requested wishlist', function() {
      wishlist.name.should.equal('New Wishlist');
      wishlist.info.should.equal('This is the brand new wishlist!!!');
    });
  });

  describe('PUT /api/wishlists/:id', function() {
    var updatedWishlist;

    beforeEach(function(done) {
      request(app)
        .put(`/api/wishlists/${newWishlist._id}`)
        .send({
          name: 'Updated Wishlist',
          info: 'This is the updated wishlist!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedWishlist = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWishlist = {};
    });

    it('should respond with the updated wishlist', function() {
      updatedWishlist.name.should.equal('Updated Wishlist');
      updatedWishlist.info.should.equal('This is the updated wishlist!!!');
    });

    it('should respond with the updated wishlist on a subsequent GET', function(done) {
      request(app)
        .get(`/api/wishlists/${newWishlist._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let wishlist = res.body;

          wishlist.name.should.equal('Updated Wishlist');
          wishlist.info.should.equal('This is the updated wishlist!!!');

          done();
        });
    });
  });

  describe('PATCH /api/wishlists/:id', function() {
    var patchedWishlist;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/wishlists/${newWishlist._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Wishlist' },
          { op: 'replace', path: '/info', value: 'This is the patched wishlist!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedWishlist = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedWishlist = {};
    });

    it('should respond with the patched wishlist', function() {
      patchedWishlist.name.should.equal('Patched Wishlist');
      patchedWishlist.info.should.equal('This is the patched wishlist!!!');
    });
  });

  describe('DELETE /api/wishlists/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/wishlists/${newWishlist._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when wishlist does not exist', function(done) {
      request(app)
        .delete(`/api/wishlists/${newWishlist._id}`)
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
