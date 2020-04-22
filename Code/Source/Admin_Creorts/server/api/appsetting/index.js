'use strict';

var express = require('express');
var controller = require('./appsetting.controller');
var auth 		= require('../../auth/auth.service');
var router = express.Router();

router.get('/all/:clientID', controller.index);

router.get('/byId/:clientID/:id', controller.show);

router.put('/:clientID/:id',controller.upsert);

router.patch('/:id',auth.hasRole('admin'), controller.patch);

router.delete('/:clientID/:id', controller.destroy);

//Create Header color
router.post('/color/:clientID',controller.createHeadercolor);

//Upload APP ICON
router.put('/update/:clientID/:id',controller.uploadAppImgs);

//Download APP ICON
router.get('/appicon/:id',  controller.downloadAppIcon);

//Download APP Header Img
//router.get('/headerImg/:id/',  controller.downloadheaderImg);

//Download APP LOgin Img
//router.get('/loginImg/:id/',  controller.downloadloginImg);


module.exports = router;
