'use strict';

var express = require('express');
var controller = require('./eventType.controller');
var router = express.Router();

//Get all EventType
router.get('/all', controller.index);

//Get EventType By ID
router.get('/byId/:id', controller.show);

//Create EventType
router.post('/create', controller.create);

//Update EventType by ID
router.put('/update/:id',controller.upsert);

//Delete EventType by ID
router.delete('/delete/:id', controller.destroy);


module.exports = router;
