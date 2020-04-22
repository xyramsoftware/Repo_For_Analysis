'use strict';

var express = require('express');
var controller = require('./aboutus.controller');
var auth 		= require('../../auth/auth.service');
var router = express.Router();

router.get('/all/:clientID', controller.index);

router.get('/byId/:clientID/:id', controller.show);

router.put('/upload/:clientID/:id',controller.UploadImgs);

router.post('/create/:clientID',controller.create);

router.put('/update/:clientID/:id',controller.upsert);

router.patch('/:id', controller.patch);

router.delete('/delete/:clientID/:id', controller.destroy);

router.get('/download/:id',  controller.downloadImg);

module.exports = router;
