'use strict';
import {Router} from 'express';
import * as controller from './user.controller';
const authenticate = require('../../middleware/auths');
import * as auth from '../../auth/auth.service';
var router = new Router();

//Get all Users(Admin Auth)
router.get('/all', auth.hasRole('admin'),controller.index);

//Get User by ID
router.get('/byId/:id', controller.show);

//Create User : Registration
router.post('/create', controller.create);

//Update User by ID
router.put('/eventupdate/:id', authenticate, controller.eventUpdate);

//Delete User by ID
router.delete('/:id', controller.destroy);


/*****DATA MATRIX COUNTS(Admin Auth)********************/
//Get Count : Sports Individual Events list count
router.get('/sportsIndividual',  controller.noOfsportsIndividual);
//Get Count : Sports Team Events list count
router.get('/team', auth.hasRole('admin'), controller.noOfsportsTeam);
//Get Count : Cultural  Events list count
router.get('/cultural', auth.hasRole('admin'), controller.noOfcultural);
//Get count : GENDER
router.get('/gender', auth.hasRole('admin'), controller.gendercount);
//Get Count : OCCUPATION
router.get('/occupation', auth.hasRole('admin'), controller.Occupation);
//Get Count : TEAM MEMBERS
router.get('/teammembers/count', auth.hasRole('admin'), controller.noOfTeamMembers);
//Get Count : USERS
router.get('/usercount', auth.hasRole('admin'), controller.getByUserCount);


/******CUSTOM SEARCHS*****************************/
router.post('/byall', controller.customSearch);/**by  User name,RegisterID,phone **/
router.post('/by/:phone', controller.customPhone);
router.get('/byemail/:email', controller.customEmail);



/*********FOR QR CODE SCAN ***************************/
//Get By user RegisterID
router.get('/byuser/:RegisterId', controller.getByUserRegID);
//update user by RegisterID
router.put('/update/:RegisterId', controller.upsertUsers);

//Get By Team Members by  TeamMemberId
router.get('/byteam/:TeamMemberId', controller.getByTeamRegID);
//update Team members by RegisterID
router.put('/updateTM/:TeamMemberId', controller.upsertTeamMembers);


/************DOWNLOAD QR CODE IMAGES **************/
//USER QRImg
router.get('/QRImg', controller.downloadQRImg);
//TEAM MEMBER QRImg
router.get('/TeamImg', controller.downloadTeamImg);

/*******QR SCAN REPORTS******************/
router.get('/QRindividual/:EventId/:gender',  controller.getQRIndividualEventsReport);
router.get('/QRcultural/:EventId/:gender',  controller.getQRCulturalEventsReport);
router.get('/QRteam/:EventId/:gender', controller.getQRTeamEventsReport);


/******GENERATE REPORTS(ADMIN AUTH) ********************/
//Get OverAll Reports
router.get('/allreports',  controller.getReports);
//Get Individual Events Reports
router.get('/individual/:EventId/:gender',  controller.getIndividualEventsReport);
//Get Team Events Reports
router.get('/team/:EventId/:gender',  controller.getTeamEventsReport);
//Get Cultural Events Reports
router.get('/cultural/:EventId/:gender', controller.getCulturalEventsReport);


module.exports = router;
