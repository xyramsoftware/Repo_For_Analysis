'use strict';
/* globals sinon, describe,  it */
var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  index: 'userCtrl.index',
  destroy: 'userCtrl.destroy',
  me: 'userCtrl.me',
  changePassword: 'userCtrl.changePassword',
  show: 'userCtrl.show',
  create: 'userCtrl.create'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var clientIndex = proxyquire('./index', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './client.controller': userCtrlStub,
  '../../auth/authclient.service': authServiceStub
});

describe('User API Router:', function() {
  it('should return an express router instance', function() {
    clientIndex.should.equal(routerStub);
  });

  describe('GET /api/clients', function() {
    it('should verify admin role and route to client.controller.index', function() {
      routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'userCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/clients/:id', function() {
    it('should verify admin role and route to client.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/clients/me', function() {
    it('should be authenticated and route to client.controller.me', function() {
      routerStub.get
        .withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/clients/:id/password', function() {
    it('should be authenticated and route to client.controller.changePassword', function() {
      routerStub.put
        .withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/clients/:id', function() {
    it('should be authenticated and route to client.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/clients', function() {
    it('should route to client.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userCtrl.create')
        .should.have.been.calledOnce;
    });
  });
});
