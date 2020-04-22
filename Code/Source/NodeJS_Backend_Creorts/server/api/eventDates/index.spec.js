'use strict';
/* globals sinon, describe,  it */
var proxyquire = require('proxyquire').noPreserveCache();

var eventDateCtrlStub = {
  index: 'eventDateCtrl.index',
  show: 'eventDateCtrl.show',
  create: 'eventDateCtrl.create',
  upsert: 'eventDateCtrl.upsert',
  patch: 'eventDateCtrl.patch',
  destroy: 'eventDateCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var eventDateIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './eventDate.controller': eventDateCtrlStub
});

describe('EventDate API Router:', function() {
  it('should return an express router instance', function() {
    eventDateIndex.should.equal(routerStub);
  });

  describe('GET /api/dates', function() {
    it('should route to eventDate.controller.index', function() {
      routerStub.get
        .withArgs('/', 'eventDateCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/dates/:id', function() {
    it('should route to eventDate.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'eventDateCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/dates', function() {
    it('should route to eventDate.controller.create', function() {
      routerStub.post
        .withArgs('/', 'eventDateCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/dates/:id', function() {
    it('should route to eventDate.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'eventDateCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/dates/:id', function() {
    it('should route to eventDate.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'eventDateCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/dates/:id', function() {
    it('should route to eventDate.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'eventDateCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
