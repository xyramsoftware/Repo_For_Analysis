'use strict';
var express = require('express');
var controller = require('./socialMedia.controller');
var router = express.Router();

//Get all socialMedia
router.get('/all', controller.index);

//Get socialMedia by Id
router.get('/byId/:id', controller.show);

//Create socialMedia
router.post('/create', controller.create);

//Update socialMedia by Id
router.put('/update/media/:id', controller.upsert);

//Delete socialMedia by Id
router.delete('/delete/:id', controller.destroy);


module.exports = router;
