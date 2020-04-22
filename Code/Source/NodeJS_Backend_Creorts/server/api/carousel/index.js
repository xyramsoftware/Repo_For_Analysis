'use strict';

var express = require('express');
var controller = require('./carousel.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Create carousels(Admin Auth)
router.post('/create', auth.hasRole('admin'), controller.create);

//Upload carousels img(Admin Auth)
router.put('/upload/:id', auth.hasRole('admin'), controller.uploadAppImgs);

//Update carousels by ID(Admin Auth)
router.put('/update/:id', auth.hasRole('admin'), controller.upsert);

//Delete carousels by ID(Admin Auth)
router.delete('/delete/:id', auth.hasRole('admin'), controller.destroy);

//Get all carousels
router.get('/all',  controller.index);

//Get By carousels ID 
router.get('/byId/:id',  controller.show);

//Download carousels img by ID
router.get('/download/:id', controller.downloadCarouselImg);

module.exports = router;
