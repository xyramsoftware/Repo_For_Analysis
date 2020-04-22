'use strict';

var express = require('express');
var controller = require('./carousel.controller');
var auth 		= require('../../auth/auth.service');
var router = express.Router();

router.get('/all/:clientID', controller.index);

router.get('/byId/:clientID/:id', controller.show);

router.post('/create/:clientID',controller.create);

//Upload APP ICON
router.put('/upload/:clientID/:id',controller.uploadAppImgs);

router.put('/update/:clientID/:id',controller.upsert);

router.patch('/:id', controller.patch);

router.delete('/delete/:clientID/:id', controller.destroy);

router.get('/download/:id',  controller.downloadCarouselImg);

module.exports = router;
