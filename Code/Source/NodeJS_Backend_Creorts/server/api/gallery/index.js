'use strict';
var express = require('express');
var controller = require('./gallery.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Create Gallery(Admin Auth)
router.post('/create', auth.hasRole('admin'),  controller.create);

//Delete Gallery by ID(Admin Auth)
router.delete('/delete/:id', auth.hasRole('admin'), controller.destroy);

//Get all Gallery
router.get('/all', controller.index);

//Get Gallery images based on Pagination
router.get('/bypage', controller.getbypage);

//Get Gallery by ID
router.get('/byId/:id', controller.show);

//Download Gallery images
router.get('/download', controller.downloadGalleryImg);

//Update Gallery by ID
router.put('/update/:id', controller.upsert);

module.exports = router;
