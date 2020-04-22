'use strict';

var express = require('express');
var controller = require('./registrationForm.controller');
import * as auth from '../../auth/auth.service';
const authenticate  = require('../../middleware/auth')
var router = express.Router();

router.get('/all/:clientID/:screenID' , controller.index);

router.get('/client/:clientID' , authenticate, controller.GetbyClients);

router.get('/:id', controller.show);

router.post('/', authenticate ,controller.create);

router.put('/:id',authenticate , controller.upsert);

router.delete('/:id',authenticate , controller.destroy);

router.get('/recent/six',  controller.recentlyAdded);

module.exports = router;
