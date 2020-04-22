'use strict';

var express = require('express');
var controller = require('./feedback.controller');
const authenticate  = require('../../middleware/auths');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Get all FeedbackForms
router.get('/all', controller.index);

//Get FeedbackForm By Id
router.get('/byId/:id', controller.show);

//Create FeedbackForm
router.post('/create/:userID', authenticate ,controller.create);

//Update FeedbackForm by ID
router.put('/update:id',controller.upsert);

//Delete FeedbackForm by ID
router.delete('/delete/:id', controller.destroy);

//GET Feedback by user id
router.get('/byuser/:userID', controller.getByUser);

//GET Feedback count(ADMIN AUTH)
router.get('/count', auth.hasRole('admin'), controller.getByCount);

//GET Feedback count for Question(RateOrganization)(ADMIN AUTH)
router.get('/question/one', auth.hasRole('admin'), controller.getRateOrganizationReview);

//GET Feedback count for Question(RateEvent)(ADMIN AUTH)
router.get('/question/two', auth.hasRole('admin'), controller.getRateEventReview);

module.exports = router;
