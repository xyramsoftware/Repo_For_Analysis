'use strict';
import passport from 'passport';
import {signToken} from '../auth.service';

const User = require('../../api/user/user.model');
const authenticates = require('../../middleware/auths');
const logger = require('../../middleware/logger');
const express = require('express');
const router = new express.Router();

//Client Login
router.post('/clients', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(200).json(error);
    }
    if(!user) {
      logger.info(" Client Login  API : status : 404 ");
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);
    res.json({ token });
  })(req, res, next);
});


//User Login
router.post('/users/login', async(req, res) => {
  try {
    if(req.body.phone){
    const user = await User.checkValidCredentials(req.body.phone);
    const token = await user.newAuthToken();
    logger.info(" User Login  API : status : 200 ");
    res.send({ token});
    }
  } catch(error) {
    logger.info(" User Login  API : status : 400 ");
    res.status(400).send();
  }
});

//User Login with SocialMedia
router.post('/users/socialmedia/login', async(req, res) => {
  try {
    if(req.body.email){
    const user = await User.checkValidCredential(req.body.email);
    const token = await user.newAuthToken();
    logger.info(" User Login with Social Media API : status : 200 ");
    res.send({ token});
    }
  } catch(error) {
    logger.info(" User Login with Social Media API : status : 400 ");
    res.status(400).send();
  }
});

//User Profile Info
router.get('/users/by/me', authenticates ,async(req,res)=>{
  var userId = req.user._id;
  return User.findOne({ _id: userId }).exec()
   .then(user => { // don't ever give out the password or salt
     if(!user) {
      logger.info(" User Me API : status : 401 ");
       return res.status(401).send({message: 'Not a valid user!!'});
     }
     logger.info(" User Me API : status : 200 ");
     res.json(user);
   })
   .catch(err => next(err));
});


export default router;
