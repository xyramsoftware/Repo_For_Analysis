'use strict';

//import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';
const Client        = require('../../api/client/client.model')
const {ObjectID}  = require('mongodb')
const authenticate  = require('../../middleware/auth')
const express     = require('express');
const router      =  new express.Router()

//var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(200).json(error);
    }
    if(!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);
    res.json({ token });
  })(req, res, next);
});



/*router.post('/clients/reg', async (req,res) => {
  const user = new Client(req.body);
  try{
     const token = await user.newAuthToken()
      res.status(201).send({user,token})
  }catch(e){
      res.status(400).send(e)
  }
})*/



router.post('/clients/login', async (req, res) => {
  try {
      const user  = await Client.checkValidCredentials(req.body.email, req.body.password)
      const token = await user.newAuthToken()
      res.send({ user, token})
  } catch (error) {
      res.status(400).send()        
  }
})

router.get('/clients/me', authenticate ,async (req,res)=> {
  res.send(req.user)
})

/*router.get('/clients/:id' ,async (req,res)=> {
  return Client.findById(req.params.id).populate('image', 'PublicID').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
})*/

/*export function show(req, res, next) {
  var clientId = req.params.id;
  return Client.findById(clientId,'name email image phone').exec()
    .then(client => {
      if(!client) {
        return res.status(404).end();
      }
      res.json(client.profile);
    })
    .catch(err => next(err));
}*/

router.put('/clients/me',authenticate ,async (req,res) => {
  const updates  = Object.keys(req.body)
  const allowedUpdates = ["clientFirstName","clientFirstName", "email", "password"]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  const _id =  req.user._id

  if(!isValidOperation){
      res.status(400).send({error:'Invalid request'})
  }

  if (!ObjectID.isValid(_id)) {
      return res.status(404).send();
  }

  try {        
      updates.forEach((update) => req.user[update] = req.body[update]) 
      await req.user.save()
      res.send(req.user);
  } catch (error) {
      res.status(400).send()
  }

})

export default router;
