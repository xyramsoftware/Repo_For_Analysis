'use strict';

var express = require('express');
var controller = require('./accompanyPerson.controller');
const authenticate = require('../../middleware/auths');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Get All Accompany(Admin Auth) 
router.get('/all', auth.hasRole('admin'), controller.index);

//GET accompanies by user id(Admin Auth)
router.get('/fordash/:userID',auth.hasRole('admin'), controller.getfordash);

//Get accompanies Count(Admin Auth)
router.get('/accompanycount',auth.hasRole('admin'), controller.getByAccompanyCount);

//GET accompanies by user id
router.get('/byuser/:userID', authenticate, controller.getByUser);

//Create Accompany
router.post('/create/:userID', authenticate, controller.create);

//Get Accompany By Id
router.get('/byId/:id', controller.show);

//Download QRImg
router.get('/QRImg', controller.downloadQRImg);

//Update Accompany By Id
router.put('/update/:id', controller.upsert);

//Delete Accompany By Id
router.delete('/delete/:id', controller.destroy);

/*******REPORTS GENERATION */
router.get('/allreports',  controller.getReports);
router.get('/checkedIn',  controller.getCheckedInReports);

/************QR SCAN*********************/
//Get Accompany By RegisterId
router.get('/byreg/:RegisterId', controller.getByRegisterID);
//Update Accompany By RegisterId
router.put('/updatereg/:RegisterId', controller.updateByRegisterId);

module.exports = router;
