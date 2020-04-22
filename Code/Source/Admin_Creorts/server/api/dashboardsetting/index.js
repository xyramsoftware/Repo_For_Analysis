'use strict';

var express = require('express');
var controller = require('./dashboardsetting.controller');
var auth 		= require('../../auth/auth.service');
var router = express.Router();

router.get('/all/:clientID', controller.index);

router.get('/byId/:clientID/:id', controller.show);

router.put('/:clientID/:id',controller.upsert);

router.patch('/:id',auth.hasRole('admin'), controller.patch);

router.delete('/:clientID/:id', controller.destroy);

router.post('/color/:clientID',controller.createHeadercolor);

//Upload DASH ICON
router.put('/update/:clientID/:id',controller.uploaddashImgs);

//Upload DASH ICON
//router.put('/update/:clientID/:id',controller.updatedashImgs);

//Download DASH ICON
router.get('/dashicon/:id',  controller.downloaddashIcon);

//Download DASH Header Img
//router.get('/dashheaderImg/:id/',  controller.downloaddashheaderImg);

module.exports = router;
