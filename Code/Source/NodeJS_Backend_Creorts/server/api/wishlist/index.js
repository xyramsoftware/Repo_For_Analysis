'use strict';
var express = require('express');
var controller = require('./wishlist.controller');
var router = express.Router();

//Get all wishlist
router.get('/byuser/:userId', controller.index);

//Get wishlist by ID
router.get('/byId/:id', controller.show);

//Create wishlist
router.post('/create',controller.create);

//Delete wishlist by userId & eventId
router.delete('/delete/:userId/:eventId',controller.destroy);

module.exports = router;
