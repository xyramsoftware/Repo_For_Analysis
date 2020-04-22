'use strict';

var express = require('express');
var controller = require('./QRcode.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

router.get('/all/:clientID', controller.index);

router.get('/byId/:clientID/:id', controller.show);

router.post('/:clientID', controller.create);

router.put('/update/:clientID/:id', controller.upsert);

router.delete('/delete/:clientID/:id', controller.destroy);

router.get('/recent/six', controller.recentlyAdded);

module.exports = router;
