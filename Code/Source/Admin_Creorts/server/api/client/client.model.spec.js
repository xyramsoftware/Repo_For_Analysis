'use strict';

import app from '../..';
import Client from './client.model';
var client;
var genClient = function() {
  client = new Client({
    provider: 'local',
    name: 'Fake User',
    email: 'test@example.com',
    password: 'password'
  });
  return client;
};

describe('Client Model', function() {
  before(function() {
    // Clear users before testing
    return Client.remove();
  });

  beforeEach(function() {
    genClient();
  });

  afterEach(function() {
    return Client.remove();
  });

  it('should begin with no users', function() {
    return Client.find({}).exec().should
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', function() {
    return Client.save()
      .then(function() {
        var userDup = genClient();
        return userDup.save();
      }).should.be.rejected;
  });

  describe('#email', function() {
    it('should fail when saving with a blank email', function() {
      client.email = '';
      return client.save().should.be.rejected;
    });

    it('should fail when saving with a null email', function() {
      client.email = null;
      return client.save().should.be.rejected;
    });

    it('should fail when saving without an email', function() {
      client.email = undefined;
      return client.save().should.be.rejected;
    });

    describe('given user provider is google', function() {
      beforeEach(function() {
        client.provider = 'google';
      });

      it('should succeed when saving without an email', function() {
        client.email = null;
        return client.save().should.be.fulfilled;
      });
    });

    describe('given user provider is facebook', function() {
      beforeEach(function() {
        client.provider = 'facebook';
      });

      it('should succeed when saving without an email', function() {
        client.email = null;
        return client.save().should.be.fulfilled;
      });
    });

    describe('given user provider is twitter', function() {
      beforeEach(function() {
        client.provider = 'twitter';
      });

      it('should succeed when saving without an email', function() {
        client.email = null;
        return client.save().should.be.fulfilled;
      });
    });

    describe('given user provider is github', function() {
      beforeEach(function() {
        client.provider = 'github';
      });

      it('should succeed when saving without an email', function() {
        client.email = null;
        return client.save().should.be.fulfilled;
      });
    });
  });

  describe('#password', function() {
    it('should fail when saving with a blank password', function() {
      client.password = '';
      return client.save().should.be.rejected;
    });

    it('should fail when saving with a null password', function() {
      client.password = null;
      return client.save().should.be.rejected;
    });

    it('should fail when saving without a password', function() {
      client.password = undefined;
      return client.save().should.be.rejected;
    });

    describe('given the user has been previously saved', function() {
      beforeEach(function() {
        return client.save();
      });

      it('should authenticate user if valid', function() {
        client.authenticate('password').should.be.true;
      });

      it('should not authenticate user if invalid', function() {
        client.authenticate('blah').should.not.be.true;
      });

      it('should remain the same hash unless the password is updated', function() {
        client.name = 'Test User';
        return client.save()
          .then(function(u) {
            return u.authenticate('password');
          }).should.eventually.be.true;
      });
    });

    describe('given user provider is google', function() {
      beforeEach(function() {
        client.provider = 'google';
      });

      it('should succeed when saving without a password', function() {
        client.password = null;
        return client.save().should.be.fulfilled;
      });
    });

    describe('given user provider is facebook', function() {
      beforeEach(function() {
        client.provider = 'facebook';
      });

      it('should succeed when saving without a password', function() {
        client.password = null;
        return client.save().should.be.fulfilled;
      });
    });

    describe('given user provider is twitter', function() {
      beforeEach(function() {
        client.provider = 'twitter';
      });

      it('should succeed when saving without a password', function() {
        client.password = null;
        return client.save().should.be.fulfilled;
      });
    });

    describe('given user provider is github', function() {
      beforeEach(function() {
        client.provider = 'github';
      });

      it('should succeed when saving without a password', function() {
        client.password = null;
        return client.save().should.be.fulfilled;
      });
    });
  });
});
