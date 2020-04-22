'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var aboutuslCtrlStub = {
  index: 'aboutCtrl.index',
  show: 'aboutCtrl.show',
  create: 'aboutCtrl.create',
  upsert: 'aboutCtrl.upsert',
  patch: 'aboutCtrl.patch',
  destroy: 'aboutCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var  aboutusIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './aboutus.controller': aboutuslCtrlStub
});

describe('AboutUs API Router:', function() {
  it('should return an express router instance', function() {
    aboutusIndex.should.equal(routerStub);
  });

  describe('GET /api/aboutus', function() {
    it('should route to aboutus.controller.index', function() {
      routerStub.get
        .withArgs('/', 'aboutCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/aboutus/:id', function() {
    it('should route to aboutus.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'aboutCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/aboutus', function() {
    it('should route to aboutus.controller.create', function() {
      routerStub.post
        .withArgs('/', 'aboutCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/aboutus/:id', function() {
    it('should route to aboutus.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'aboutCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/aboutus/:id', function() {
    it('should route to aboutus.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'aboutCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/aboutus/:id', function() {
    it('should route to aboutus.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'aboutCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
