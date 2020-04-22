'use strict';

import {Router} from 'express';
import * as controller from './client.controller';
import * as auth from '../../auth/auth.service';
var router = new Router();


router.get('/byId/:id',  controller.show);
router.get('/all', controller.index);
router.get('/me/now', auth.isAuthenticated(), controller.me);

router.delete('/:id', auth.hasRole('admin'), controller.destroy);

router.post('/create',   controller.create);
router.put('/:id',  controller.upsert);
router.put('/change/:id', auth.isAuthenticated(), controller.changePassword);

//**********forgetpassword api******
//for forgetpassword
router.put('/password/forget', controller.sendResetEmail);
//for feset password
router.put('/password/reset/', controller.ResetPassword);

module.exports = router;
