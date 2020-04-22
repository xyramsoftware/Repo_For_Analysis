'use strict';

var express = require('express');
var controller = require('./wishlist.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/byuser/:clientID/:userId', auth.isAuthenticated(),controller.index);

router.get('/byId/:clientID/:id', auth.isAuthenticated(),controller.show);

router.post('/create/:clientID',auth.isAuthenticated(),controller.create);

router.delete('/delete/:clientID/:userId/:eventId',auth.isAuthenticated(),controller.destroy);

module.exports = router;
