'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var regFormCtrlStub = {
  index: 'regFormCtrl.index',
  show: 'regFormCtrl.show',
  create: 'regFormCtrl.create',
  upsert: 'regFormCtrl.upsert',
  patch: 'regFormCtrl.patch',
  destroy: 'regFormCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var regFormIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './registrationForm.controller': regFormCtrlStub
});

describe('RegistrationForm API Router:', function() {
  it('should return an express router instance', function() {
    regFormIndex.should.equal(routerStub);
  });

  describe('GET /api/regforms', function() {
    it('should route to registrationForm.controller.index', function() {
      routerStub.get
        .withArgs('/', 'regFormCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/regforms/:id', function() {
    it('should route to registrationForm.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'regFormCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/regforms', function() {
    it('should route to registrationForm.controller.create', function() {
      routerStub.post
        .withArgs('/', 'regFormCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/regforms/:id', function() {
    it('should route to registrationForm.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'regFormCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/regforms/:id', function() {
    it('should route to registrationForm.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'regFormCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/regforms/:id', function() {
    it('should route to registrationForm.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'regFormCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
