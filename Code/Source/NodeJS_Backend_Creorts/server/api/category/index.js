'use strict';

var express = require('express');
var controller = require('./category.controller');
var router = express.Router();

//Get all categories
router.get('/all', controller.index);

//Get category by ID
router.get('/byId/:id', controller.show);

//Create category
router.post('/create', controller.create);

//Update category by ID
router.put('/update/:id',controller.upsert);

//Delete category by ID
router.delete('/delete/:id', controller.destroy);


module.exports = router;
