'use strict';

var app = require('../..');
import request from 'supertest';
/* globals beforeEach,afterEach, describe,  it */
var newNews;

describe('News API:', function() {
  describe('GET /api/news', function() {
    var newss;

    beforeEach(function(done) {
      request(app)
        .get('/api/news')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      newss.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/news', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/news')
        .send({
          name: 'New News',
          info: 'This is the brand new news!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newNews = res.body;
          done();
        });
    });

    it('should respond with the newly created news', function() {
      newNews.name.should.equal('New News');
      newNews.info.should.equal('This is the brand new news!!!');
    });
  });

  describe('GET /api/news/:id', function() {
    var news;

    beforeEach(function(done) {
      request(app)
        .get(`/api/news/${newNews._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          news = res.body;
          done();
        });
    });

    afterEach(function() {
      news = {};
    });

    it('should respond with the requested news', function() {
      news.name.should.equal('New News');
      news.info.should.equal('This is the brand new news!!!');
    });
  });

  describe('PUT /api/news/:id', function() {
    var updatedNews;

    beforeEach(function(done) {
      request(app)
        .put(`/api/news/${newNews._id}`)
        .send({
          name: 'Updated News',
          info: 'This is the updated news!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedNews = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNews = {};
    });

    it('should respond with the updated news', function() {
      updatedNews.name.should.equal('Updated News');
      updatedNews.info.should.equal('This is the updated news!!!');
    });

    it('should respond with the updated news on a subsequent GET', function(done) {
      request(app)
        .get(`/api/news/${newNews._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let news = res.body;

          news.name.should.equal('Updated News');
          news.info.should.equal('This is the updated news!!!');

          done();
        });
    });
  });

  describe('PATCH /api/news/:id', function() {
    var patchedNews;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/news/${newNews._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched News' },
          { op: 'replace', path: '/info', value: 'This is the patched news!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedNews = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedNews = {};
    });

    it('should respond with the patched news', function() {
      patchedNews.name.should.equal('Patched News');
      patchedNews.info.should.equal('This is the patched news!!!');
    });
  });

  describe('DELETE /api/news/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/news/${newNews._id}`)
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
        .delete(`/api/news/${newNews._id}`)
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
