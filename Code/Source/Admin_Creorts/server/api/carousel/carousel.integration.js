'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCarousel;

describe('Carousel API:', function() {
  describe('GET /api/carousel', function() {
    var coupons;

    beforeEach(function(done) {
      request(app)
        .get('/api/carousel')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          coupons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      coupons.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/carousel', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/carousel')
        .send({
          name: 'New Coupon',
          info: 'This is the brand new coupon!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCarousel = res.body;
          done();
        });
    });

    it('should respond with the newly created coupon', function() {
      newCoupon.name.should.equal('New Coupon');
      newCoupon.info.should.equal('This is the brand new coupon!!!');
    });
  });

  describe('GET /api/carousel/:id', function() {
    var coupon;

    beforeEach(function(done) {
      request(app)
        .get(`/api/carousel/${newCoupon._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          coupon = res.body;
          done();
        });
    });

    afterEach(function() {
      coupon = {};
    });

    it('should respond with the requested coupon', function() {
      coupon.name.should.equal('New Coupon');
      coupon.info.should.equal('This is the brand new coupon!!!');
    });
  });

  describe('PUT /api/carousel/:id', function() {
    var updatedCarousel;

    beforeEach(function(done) {
      request(app)
        .put(`/api/carousel/${newCarousel._id}`)
        .send({
          name: 'Updated Coupon',
          info: 'This is the updated coupon!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCarousel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCarousel = {};
    });

    it('should respond with the updated coupon', function() {
      updatedCoupon.name.should.equal('Updated Coupon');
      updatedCoupon.info.should.equal('This is the updated coupon!!!');
    });

    it('should respond with the updated coupon on a subsequent GET', function(done) {
      request(app)
        .get(`/api/carousel/${newCarousel._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let coupon = res.body;

          coupon.name.should.equal('Updated Coupon');
          coupon.info.should.equal('This is the updated coupon!!!');

          done();
        });
    });
  });

  describe('PATCH /api/coupons/:id', function() {
    var patchedCoupon;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/coupons/${newCoupon._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Coupon' },
          { op: 'replace', path: '/info', value: 'This is the patched coupon!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCoupon = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCoupon = {};
    });

    it('should respond with the patched coupon', function() {
      patchedCoupon.name.should.equal('Patched Coupon');
      patchedCoupon.info.should.equal('This is the patched coupon!!!');
    });
  });

  describe('DELETE /api/carousel/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/carousel/${newCarousel._id}`)
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
        .delete(`/api/carousel/${newCarousel._id}`)
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
