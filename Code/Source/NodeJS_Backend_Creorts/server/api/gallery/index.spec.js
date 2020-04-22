'use strict';
/* globals sinon, describe,  it */
var proxyquire = require('proxyquire').noPreserveCache();

var galleryCtrlStub = {
  index: 'galleryCtrl.index',
  show: 'galleryCtrl.show',
  create: 'galleryCtrl.create',
  upsert: 'galleryCtrl.upsert',
  patch: 'galleryCtrl.patch',
  destroy: 'galleryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var galleryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './gallery.controller': galleryCtrlStub
});

describe('Gallery API Router:', function() {
  it('should return an express router instance', function() {
    galleryIndex.should.equal(routerStub);
  });

  describe('GET /api/gallery', function() {
    it('should route to gallery.controller.index', function() {
      routerStub.get
        .withArgs('/', 'galleryCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/gallery/:id', function() {
    it('should route to gallery.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'galleryCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/gallery', function() {
    it('should route to gallery.controller.create', function() {
      routerStub.post
        .withArgs('/', 'galleryCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/gallery/:id', function() {
    it('should route to gallery.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'galleryCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/gallery/:id', function() {
    it('should route to gallery.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'galleryCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/gallery/:id', function() {
    it('should route to gallery.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'galleryCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
