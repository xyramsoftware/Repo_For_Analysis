'use strict';
/* globals sinon, describe,  it */

var proxyquire = require('proxyquire').noPreserveCache();
var carouselCtrlStub = {
  index: 'carouselCtrl.index',
  show: 'carouselCtrl.show',
  create: 'carouselCtrl.create',
  upsert: 'carouselCtrl.upsert',
  patch: 'carouselCtrl.patch',
  destroy: 'carouselCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var carouselIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './carousel.controller': carouselCtrlStub
});

describe('Carousel API Router:', function() {
  it('should return an express router instance', function() {
    carouselIndex.should.equal(routerStub);
  });

  describe('GET /api/carousel', function() {
    it('should route to carousel.controller.index', function() {
      routerStub.get
        .withArgs('/', 'carouselCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/carousel/:id', function() {
    it('should route to carousel.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'carouselCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/carousel', function() {
    it('should route to carousel.controller.create', function() {
      routerStub.post
        .withArgs('/', 'carouselCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/carousel/:id', function() {
    it('should route to carousel.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'carouselCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/carousel/:id', function() {
    it('should route to carousel.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'carouselCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/carousel/:id', function() {
    it('should route to carousel.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'carouselCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
