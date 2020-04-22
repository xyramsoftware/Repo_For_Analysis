'use strict';
/* globals sinon, describe,  it */
var proxyquire = require('proxyquire').noPreserveCache();

var AccompanyPersonCtrlStub = {
  index: 'accompanyCtrl.index',
  show: 'accompanyCtrl.show',
  create: 'accompanyCtrl.create',
  upsert: 'accompanyCtrl.upsert',
  patch: 'accompanyCtrl.patch',
  destroy: 'accompanyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var AccompanyPersonIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './accompanyPerson.controller': AccompanyPersonCtrlStub
});

describe('AccompanyPerson API Router:', function() {
  it('should return an express router instance', function() {
    AccompanyPersonIndex.should.equal(routerStub);
  });

  describe('GET /api/accompanies', function() {
    it('should route to accompanyPerson.controller.index', function() {
      routerStub.get
        .withArgs('/', 'accompanyCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/accompanies/:id', function() {
    it('should route to accompanyPerson.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'accompanyCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/accompanies', function() {
    it('should route to accompanyPerson.controller.create', function() {
      routerStub.post
        .withArgs('/', 'accompanyCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/accompanies/:id', function() {
    it('should route to accompanyPerson.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'accompanyCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/accompanies/:id', function() {
    it('should route to accompanyPerson.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'accompanyCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/accompanies/:id', function() {
    it('should route to accompanyPerson.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'accompanyCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
