'use strict';

var express = require('express');
var controller = require('./event.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/all/:clientID', controller.index);

router.get('/byId/:clientID/:id', controller.show);

router.post('/create/:clientID', controller.create);

router.put('/update/:clientID/:id', controller.upsert);

router.delete('/delete/:clientID/:id', controller.destroy);

//GET Events by EventDate
router.get('/bydate/:clientID/:EventDate', controller.getByEventDate);

module.exports = router;
