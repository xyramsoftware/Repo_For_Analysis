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
var eventfeedbackIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './eventFeedback.controller': feedbackCtrlStub
});

describe('EventFeedback API Router:', function() {
  it('should return an express router instance', function() {
    eventfeedbackIndex.should.equal(routerStub);
  });

  describe('GET /api/eventfeedback', function() {
    it('should route to eventFeedback.controller.index', function() {
      routerStub.get
        .withArgs('/', 'feedback.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/eventfeedback/:id', function() {
    it('should route to eventFeedback.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'feedback.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/eventfeedback', function() {
    it('should route to eventFeedback.controller.create', function() {
      routerStub.post
        .withArgs('/', 'feedback.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/eventfeedback/:id', function() {
    it('should route to eventFeedback.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'feedback.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/eventfeedback/:id', function() {
    it('should route to eventFeedback.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'feedback.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/eventfeedback/:id', function() {
    it('should route to eventFeedback.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'feedback.destroy')
        .should.have.been.calledOnce;
    });
  });
});
