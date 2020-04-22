'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/all/:clientID',  controller.index);

router.get('/byId/:clientID/:id', controller.show);

router.delete('/:id', auth.hasRole('admin'), controller.destroy);

router.get('/me/:clientID', auth.isAuthenticated(), controller.me);

//for forgetpassword
router.put('/password/forget/', controller.sendResetEmail);

//Update password
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);

router.post('/create/:clientID', controller.create);

//get a store info
router.get('/store/info',  controller.storeDetails);

router.put('/:id', auth.isAuthenticated(), controller.upsert);


module.exports = router;
