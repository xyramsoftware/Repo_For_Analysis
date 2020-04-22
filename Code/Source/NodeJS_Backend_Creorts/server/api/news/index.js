'use strict';

var express = require('express');
var controller = require('./news.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Create Latest News(Admin Auth)
router.post('/create', auth.hasRole('admin'), controller.create);

//Update Latest News by ID(Admin Auth)
router.put('/update/:id', auth.hasRole('admin'), controller.upsert);

//Delete Latest News by ID(Admin Auth)
router.delete('/delete/:id',auth.hasRole('admin'),  controller.destroy);

//Get all Latest News
router.get('/all', controller.index);

//Get Latest News by ID
router.get('/byId/:id', controller.show);

//Get Latest News by Title
router.post('/by/title',controller.customTitle);

module.exports = router;
