'use strict';
/* globals beforeEach,afterEach, describe,before  it */
import app from '../..';
import User from './user.model';
var user;
var genUser = function() {
  user = new User({
    provider: 'local',
    name: 'Fake User',
    phone: '123456789',

  });
  return user;
};

describe('User Model', function() {
  before(function() {
    // Clear users before testing
    return User.remove();
  });

  beforeEach(function() {
    genUser();
  });

  afterEach(function() {
    return User.remove();
  });

  it('should begin with no users', function() {
    return User.find({}).exec().should
      .eventually.have.length(0);
  });

  it('should fail when saving a duplicate user', function() {
    return user.save()
      .then(function() {
        var userDup = genUser();
        return userDup.save();
      }).should.be.rejected;
  });

  describe('#phone', function() {
    it('should fail when saving with a blank phone', function() {
      user.phone = '';
      return user.save().should.be.rejected;
    });

    it('should fail when saving with a null phone', function() {
      user.phone = null;
      return user.save().should.be.rejected;
    });

    it('should fail when saving without an phone', function() {
      user.phone = undefined;
      return user.save().should.be.rejected;
    });

  });
});
