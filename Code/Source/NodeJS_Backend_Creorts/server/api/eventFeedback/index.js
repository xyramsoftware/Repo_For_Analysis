'use strict';

var express = require('express');
var controller = require('./eventFeedback.controller');
const authenticate  = require('../../middleware/auths')
var router = express.Router();

//GET ALL EventFeedback 
router.get('/all', controller.index);

//GET EventFeedback by ID
router.get('/byId/:id', controller.show);

//Create EventFeedback by UserID&EventID
router.post('/create/:userID/:EventID',authenticate, controller.create);

//GET EventFeedback by user id
router.get('/byuser/:userID/:EventID', controller.getByUser);

//GET EventFeedback Review(rateEvent )(ADMIN AUTH)
router.get('/event/question/one',  controller.getRateEventReview);

//GET EventFeedback Review(rateOrganization )(ADMIN AUTH)
router.get('/event/question/two',  controller.getRateOrganizationReview);

//GET EventFeedback count(ADMIN AUTH)
router.get('/count', controller.getByCount);



module.exports = router;
