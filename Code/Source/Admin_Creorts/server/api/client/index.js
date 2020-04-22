'use strict';

import {Router} from 'express';
import * as controller from './client.controller';
import * as auth from '../../auth/auth.service';
const authenticate  = require('../../middleware/auth')
var router = new Router();

router.get('/', controller.index);

router.delete('/:id', controller.destroy);

router.get('/me', auth.isAuthenticated(), controller.me);

router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
//written below route not fetching appropriate data
router.get('/:id', controller.show);

router.post('/', controller.create);
router.post('/guest', controller.createGuest);
router.post('/byadmin/', auth.hasRole('admin'), controller.createByAdmin);


//get a store info
router.get('/store/info',  controller.storeDetails);

router.put('/:id',authenticate, controller.upsert);


//get (working)
router.post('/stripe/card/info', auth.isAuthenticated(),controller.accCreateAndTrans);
//get (working)
router.post('/stripe/payment', auth.isAuthenticated(),controller.stripePayment);
// <<<<<<< HEAD

// // Email Sending && Reset Password
// router.post('/mail/password', controller.sendEmail);
// router.put('/reset/password/', controller.resetPassword);
// //for demo,remove it later
// router.get('/pdf/invoice', controller.demohtmlpdf);
// =======
//**********forgetpassword api******
//for forgetpassword
router.put('/password/forget/', controller.sendResetEmail);
//for feset password
router.put('/password/reset/', controller.ResetPassword);
///>>>>>>> 051819669c48f87ceba558fcd95047eae97ad4d5
module.exports = router;
