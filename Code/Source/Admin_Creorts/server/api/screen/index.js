'use strict';

var express = require('express');
var controller = require('./screen.controller');
import * as auth from '../../auth/auth.service';
const authenticate  = require('../../middleware/auth')
var router = express.Router();

router.get('/all/:clientID',  controller.index);

router.get('/:id',  controller.show);

router.post('/:clientID',authenticate , controller.create);

router.put('/:id', authenticate , controller.upsert);

router.delete('/:id',authenticate , controller.destroy);

router.get('/recent/six',  controller.recentlyAdded);

module.exports = router;
