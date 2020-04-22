'use strict';

var app = require('../..');
import request from 'supertest';

var newQRcode;

describe('QRcode API:', function() {
  describe('GET /api/qrcode', function() {
    var QRcodes;

    beforeEach(function(done) {
      request(app)
        .get('/api/qrcode')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          QRcodes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      QRcodes.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/qrcode', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/qrcode')
        .send({
          name: 'New QRcode',
          info: 'This is the brand new QRcode!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQRcode = res.body;
          done();
        });
    });

    it('should respond with the newly created QRcode', function() {
      newQRcode.name.should.equal('New QRcode');
      newQRcode.info.should.equal('This is the brand new QRcode!!!');
    });
  });

  describe('GET /api/qrcode/:id', function() {
    var QRcode;

    beforeEach(function(done) {
      request(app)
        .get(`/api/qrcode/${newQRcode._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          QRcode = res.body;
          done();
        });
    });

    afterEach(function() {
      QRcode = {};
    });

    it('should respond with the requested QRcode', function() {
      QRcode.name.should.equal('New QRcode');
      QRcode.info.should.equal('This is the brand new QRcode!!!');
    });
  });

  describe('PUT /api/qrcode/:id', function() {
    var updatedQRcode;

    beforeEach(function(done) {
      request(app)
        .put(`/api/qrcode/${newQRcode._id}`)
        .send({
          name: 'Updated QRcode',
          info: 'This is the updated QRcode!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQRcode = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQRcode = {};
    });

    it('should respond with the updated QRcode', function() {
      updatedQRcode.name.should.equal('Updated QRcode');
      updatedQRcode.info.should.equal('This is the updated QRcode!!!');
    });

    it('should respond with the updated QRcode on a subsequent GET', function(done) {
      request(app)
        .get(`/api/qrcode/${newQRcode._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let QRcode = res.body;

          QRcode.name.should.equal('Updated QRcode');
          QRcode.info.should.equal('This is the updated QRcode!!!');

          done();
        });
    });
  });

  describe('PATCH /api/qrcode/:id', function() {
    var patchedQRcode;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/qrcode/${newQRcode._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched QRcode' },
          { op: 'replace', path: '/info', value: 'This is the patched QRcode!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQRcode = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQRcode = {};
    });

    it('should respond with the patched QRcode', function() {
      patchedQRcode.name.should.equal('Patched QRcode');
      patchedQRcode.info.should.equal('This is the patched QRcode!!!');
    });
  });

  describe('DELETE /api/qrcode/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/qrcode/${newQRcode._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when QRcode does not exist', function(done) {
      request(app)
        .delete(`/api/qrcode/${newQRcode._id}`)
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
