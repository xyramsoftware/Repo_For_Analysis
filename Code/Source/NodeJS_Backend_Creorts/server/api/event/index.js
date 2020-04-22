'use strict';

var express = require('express');
var controller = require('./event.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Get all Events
router.get('/all',  controller.index);

//Get Event By ID
router.get('/byId/:id', controller.show);

//Update Events By ID(ADMIN AUTH)
router.put('/update/:id',auth.hasRole('admin'), controller.upsert);

//Delete Events By ID(ADMIN AUTH)
router.delete('/delete/:id',auth.hasRole('admin'), controller.destroy);

//Create Event(ADMIN AUTH)
router.post('/create',auth.hasRole('admin'), controller.create);

//Update Events Count For QR Scan by Id
router.put('/scan/count/:id', controller.UpdateScanCount);


/***********IMAGES**********/
//Download EventsPDF
router.get('/download/:id',  controller.downloadEventsPDF);
//Download Events Image
router.get('/downloadImage/:id',  controller.downloadEventImage);
//Update EventsPDF file
router.put('/upload/:id',auth.hasRole('admin'),  controller.uploadEventsPDF);
//Update Events Image 
router.put('/uploadImage/:id',auth.hasRole('admin'),  controller.uploadEventImage);


/*******SEARCH APIS ***********************/
//GET Events by EventDateID & CategoryID(Dates//Sports/Cultural)
router.get('/bycat/:EventDateID/:CategoryID', controller.getByEvendatecategory);

//GET Events by EventDateID(Dates)
router.get('/bydates/:EventDateID', controller.getByEventDates);

//GET Events by CategoryID(Sports/Cultural)
router.get('/bycategory/:CategoryID', controller.getByCategoryName);

//GET Events by EventTypeID(Individual/SportsTeam/Cultural)
router.get('/byeventType/:EventTypeID', controller.getByEventTypeName);

//GET Events by CategoryID & EventTypeID(Sports/Cultural//Individual/SportsTeam/Cultural)
router.get('/bytype/:CategoryID/:EventTypeID', controller.getByEventType);


module.exports = router;
