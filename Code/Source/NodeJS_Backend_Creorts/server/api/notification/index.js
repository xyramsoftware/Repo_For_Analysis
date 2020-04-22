'use strict';

var express = require('express');
var controller = require('./notification.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Get all notifications
router.get('/', controller.index);

//Get notification by ID
router.get('/:id', controller.show);

//Gcreate notification
router.post('/', controller.create);

//Update notification by ID
router.put('/:id', controller.upsert);

//Delete notification by ID
router.delete('/:id', controller.destroy);

//get all unread notifications
router.get('/unread/all', auth.isAuthenticated(),controller.unreadNotification);

//update all unread notifications as read
router.get('/all/read', auth.isAuthenticated(),controller.updateNotification);

module.exports = router;
