'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var appsettingCtrlStub = {
  index: 'appsettingCtrl.index',
  show: 'appsettingCtrl.show',
  create: 'appsettingCtrl.create',
  upsert: 'appsettingCtrl.upsert',
  patch: 'appsettingCtrl.patch',
  destroy: 'appsettingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var  appsettingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './appsetting.controller': appsettingCtrlStub
});

describe('Appsetting API Router:', function() {
  it('should return an express router instance', function() {
    appsettingIndex.should.equal(routerStub);
  });

  describe('GET /api/appsettings', function() {
    it('should route to appsetting.controller.index', function() {
      routerStub.get
        .withArgs('/', 'appsettingCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/appsettings/:id', function() {
    it('should route to appsetting.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'carouselCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/appsettings', function() {
    it('should route to appsetting.controller.create', function() {
      routerStub.post
        .withArgs('/', 'appsettingCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/appsettings/:id', function() {
    it('should route to appsetting.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'appsettingCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/appsettings/:id', function() {
    it('should route to appsetting.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'appsettingCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/appsettings/:id', function() {
    it('should route to appsetting.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'appsettingCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
