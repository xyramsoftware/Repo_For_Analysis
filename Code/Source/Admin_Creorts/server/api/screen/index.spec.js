'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var screenCtrlStub = {
  index: 'screenCtrl.index',
  show: 'screenCtrl.show',
  create: 'screenCtrl.create',
  upsert: 'screenCtrl.upsert',
  patch: 'screenCtrl.patch',
  destroy: 'screenCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var screenIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './screen.controller': screenCtrlStub
});

describe('Screen API Router:', function() {
  it('should return an express router instance', function() {
    screenIndex.should.equal(routerStub);
  });

  describe('GET /api/screens', function() {
    it('should route to screen.controller.index', function() {
      routerStub.get
        .withArgs('/', 'screenCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/screens/:id', function() {
    it('should route to screen.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'screenCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/screens', function() {
    it('should route to screen.controller.create', function() {
      routerStub.post
        .withArgs('/', 'screenCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/screens/:id', function() {
    it('should route to screen.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'screenCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/screens/:id', function() {
    it('should route to screen.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'screenCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/screens/:id', function() {
    it('should route to screen.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'screenCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
