'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var qrcodeCtrlStub = {
  index: 'qrcodeCtrl.index',
  show: 'qrcodeCtrl.show',
  create: 'qrcodeCtrl.create',
  upsert: 'qrcodeCtrl.upsert',
  patch: 'qrcodeCtrl.patch',
  destroy: 'qrcodeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var QRcodeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './QRcode.controller': qrcodeCtrlStub
});

describe('QRcode API Router:', function() {
  it('should return an express router instance', function() {
    QRcodeIndex.should.equal(routerStub);
  });

  describe('GET /api/qrcode', function() {
    it('should route to QRcode.controller.index', function() {
      routerStub.get
        .withArgs('/', 'qrcodeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/qrcode/:id', function() {
    it('should route to QRcode.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'qrcodeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/qrcode', function() {
    it('should route to QRcode.controller.create', function() {
      routerStub.post
        .withArgs('/', 'qrcodeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/qrcode/:id', function() {
    it('should route to QRcode.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'qrcodeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/qrcode/:id', function() {
    it('should route to QRcode.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'qrcodeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/qrcode/:id', function() {
    it('should route to QRcode.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'qrcodeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
