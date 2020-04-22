'use strict';

var express = require('express');
var controller = require('./expense.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

//Get all Expense(Admin Auth)
router.get('/all',auth.hasRole('admin'), controller.index);

//Get Expense by ID(Admin Auth)
router.get('/byId/:id', auth.hasRole('admin'), controller.show);

//Create Expense by ID(Admin Auth)
router.post('/create', auth.hasRole('admin'), controller.create);

//Upload Expense img(Admin Auth)
router.put('/upload/:id', auth.hasRole('admin'), controller.uploadImgs);

//Download  Expense img
router.get('/download', controller.downloadImg);

//Update Expense By ID(Admin Auth)
router.put('/update/:id', auth.hasRole('admin'), controller.upsert);

//Delete Expense by ID(Admin Auth)
router.delete('/delete/:id', auth.hasRole('admin'), controller.destroy);

//Get OverAll Expense Reports(Admin Auth)
router.get('/allreports',  controller.getReports);



module.exports = router;
