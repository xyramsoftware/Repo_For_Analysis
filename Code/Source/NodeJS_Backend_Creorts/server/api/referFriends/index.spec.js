'use strict';
/* globals sinon, describe,  it */
var proxyquire = require('proxyquire').noPreserveCache();

var categoryCtrlStub = {
  index: 'categoryCtrl.index',
  show: 'categoryCtrl.show',
  create: 'categoryCtrl.create',
  upsert: 'categoryCtrl.upsert',
  patch: 'categoryCtrl.patch',
  destroy: 'categoryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var categoryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './referFriends.controller': categoryCtrlStub
});

describe('ReferFriend API Router:', function() {
  it('should return an express router instance', function() {
    categoryIndex.should.equal(routerStub);
  });

  describe('GET /api/referFriends', function() {
    it('should route to referFriends.controller.index', function() {
      routerStub.get
        .withArgs('/', 'categoryCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/referFriends/:id', function() {
    it('should route to referFriends.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'categoryCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/referFriends', function() {
    it('should route to referFriends.controller.create', function() {
      routerStub.post
        .withArgs('/', 'categoryCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/referFriends/:id', function() {
    it('should route to referFriends.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'categoryCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/referFriends/:id', function() {
    it('should route to referFriends.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'categoryCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/referFriends/:id', function() {
    it('should route to referFriends.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'categoryCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
