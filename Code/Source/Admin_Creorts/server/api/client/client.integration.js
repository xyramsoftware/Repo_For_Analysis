'use strict';

import app from '../..';
import Client from './client.model';
import request from 'supertest';

describe('Client API:', function() {
  var client;

  // Clear users before testing
  before(function() {
    return Client.remove().then(function() {
      client = new Client({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return client.save();
    });
  });

  // Clear users after testing
  after(function() {
    return Client.remove();
  });

  describe('GET /api/clients/me', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/clients/me')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.body._id.toString().should.equal(client._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/clients/me')
        .expect(401)
        .end(done);
    });
  });
});
