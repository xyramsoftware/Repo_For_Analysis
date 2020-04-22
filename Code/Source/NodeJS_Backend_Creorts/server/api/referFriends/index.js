'use strict';

var express = require('express');
var controller = require('./referFriends.controller');
const authenticate = require('../../middleware/auths');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Get all ReferFriends
router.get('/all', controller.index);

//Get all ReferFriends(Admin Auth)
router.get('/bycount', auth.hasRole('admin'), controller.getReferCount);

//Get ReferFriend by ID
router.get('/byId/:id', controller.show);

//Create ReferFriends
router.post('/create/:userID', authenticate, controller.create);

//GET ReferFriends by user id
router.get('/byuser/:userID', authenticate, controller.getByUser);

//Update ReferFriends by ID
router.put('/update/:id', controller.upsert);

//Delete ReferFriend by ID
router.delete('/delete/:id', controller.destroy);


module.exports = router;
