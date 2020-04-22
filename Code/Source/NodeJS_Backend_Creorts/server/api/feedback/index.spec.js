'use strict';
/* globals sinon, describe,  it */
var proxyquire = require('proxyquire').noPreserveCache();

var feedbackCtrlStub = {
  index: 'feedbackCtrl.index',
  show: 'feedbackCtrl.show',
  create: 'feedbackCtrl.create',
  upsert: 'feedbackCtrl.upsert',
  patch: 'feedbackCtrl.patch',
  destroy: 'feedbackCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var feedbackIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './feedback.controller': feedbackCtrlStub
});

describe('Feedback API Router:', function() {
  it('should return an express router instance', function() {
    feedbackIndex.should.equal(routerStub);
  });

  describe('GET /api/feedback', function() {
    it('should route to feedback.controller.index', function() {
      routerStub.get
        .withArgs('/', 'feedback.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/feedback/:id', function() {
    it('should route to feedback.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'feedback.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/feedback', function() {
    it('should route to feedback.controller.create', function() {
      routerStub.post
        .withArgs('/', 'feedback.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/feedback/:id', function() {
    it('should route to feedback.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'feedback.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/feedback/:id', function() {
    it('should route to feedback.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'feedback.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/feedback/:id', function() {
    it('should route to feedback.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'feedback.destroy')
        .should.have.been.calledOnce;
    });
  });
});
