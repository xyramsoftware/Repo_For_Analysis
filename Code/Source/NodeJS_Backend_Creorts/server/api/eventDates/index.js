'use strict';

var express = require('express');
var controller = require('./eventDates.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Get All EventDates
router.get('/all', controller.index);

//Get EventDates By ID
router.get('/byId/:id', controller.show);

//Create EventDates(ADMIN AUTH)
router.post('/create',auth.hasRole('admin'), controller.create);

//Update EventDates By ID(ADMIN AUTH)
router.put('/update/:id', auth.hasRole('admin'),controller.upsert);

//Delete EventDates By ID(ADMIN AUTH)
router.delete('/delete/:id',auth.hasRole('admin'), controller.destroy);


module.exports = router;
